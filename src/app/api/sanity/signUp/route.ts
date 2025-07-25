import sanityClient from "@/libs/sanity";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();
        if (!email || !password || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        // Check if user already exists
        const existingUser = await sanityClient.fetch(
            "*[_type == 'user' && email == $email][0]",
            { email }
        );
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the user
        const newUser = {
            _type: "user",
            name,
            email,
            password: hashedPassword,
            image: "",
            isAdmin: false,
        };
        const createdUser = await sanityClient.create(newUser);
        return NextResponse.json({ success: true, userId: createdUser._id });
    } catch (error) {
        return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
    }
}
