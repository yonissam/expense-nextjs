import dbConnect from "../../config/dbConnect";
import nodemailer from "nodemailer";
import User from "../../models/user";
import Password from "../../models/otp";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    dbConnect();

    const body = await request.json();

    const { email } = body;

    const user = await User.findOne({ email: email });

    // Send email logic
    // Generate random OTP
    const otp = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    ).toString();
    const saveEmail = user.email;

    //Calculate the expiration time
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5); // Set OTP expiration to 5 minutes from now

    const savedOtp = await Password.create({
      otp: otp,
      email: saveEmail,
      expiresAt: expirationTime,
    });

    const transporter = nodemailer.createTransport({
      // Configure your email service provider here
      host: "192.168.0.105",
      port: 2525,
    });

    const mailOptions = {
      from: "notifications@gmail.com",
      to: email,
      subject: "OTP",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
