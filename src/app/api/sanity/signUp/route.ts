import { authSanityClient } from "@/libs/sanity";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        console.log("Signup request received");
        const { email, password, name } = await req.json();

        console.log("Signup data:", { email, name, hasPassword: !!password });

        if (!email || !password || !name) {
            console.log("Missing required fields");
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists
        console.log("Checking for existing user...");
        const existingUser = await authSanityClient.fetch(
            "*[_type == 'user' && email == $email][0]",
            { email }
        );

        if (existingUser) {
            console.log("User already exists");
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash the password
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        console.log("Creating user...");
        const newUser = {
            _type: "user",
            name,
            email,
            password: hashedPassword,
            image: "",
            isAdmin: false,
        };

        const createdUser = await authSanityClient.create(newUser);
        console.log("User created successfully:", createdUser._id);

        return NextResponse.json({ success: true, userId: createdUser._id });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({
            error: "Failed to sign up",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
