import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      // For now, just log the subscription and return success
      console.log(`Newsletter subscription received: ${email}`);

      return NextResponse.json(
        {
          success: true,
          message:
            "Successfully subscribed to newsletter! We'll keep you updated with the latest offers and news.",
        },
        { status: 200 },
      );
    }

    // Create transporter for confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send confirmation email to subscriber
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to HotelMT Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to HotelMT!</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Thank You for Subscribing!</h2>
            <p style="color: #555; line-height: 1.6; font-size: 16px;">
              You've successfully subscribed to our newsletter. We're excited to keep you updated with:
            </p>
            
            <ul style="color: #555; line-height: 1.6; font-size: 16px;">
              <li>🎉 Exclusive offers and promotions</li>
              <li>🏨 Latest room updates and amenities</li>
              <li>🌟 Special events and packages</li>
              <li>💎 Insider tips for the best experience</li>
            </ul>
            
            <p style="color: #555; line-height: 1.6; font-size: 16px;">
              Stay tuned for amazing deals and updates from HotelMT!
            </p>
          </div>
          
          <div style="background: #333; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
            <p style="color: #999; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} HotelMT. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Source:</strong> Website Newsletter Form</p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(confirmationMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message:
          "Successfully subscribed to newsletter! Check your email for confirmation.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json(
          {
            error:
              "Email service temporarily unavailable. Please try again later.",
          },
          { status: 500 },
        );
      } else if (error.message.includes("ENOTFOUND")) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 },
    );
  }
}
