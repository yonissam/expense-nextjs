import Password from "../../models/otp";
import dbConnect from "../../config/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  dbConnect();

  const body = await request.json();

  const { email, otp } = body;
  const storedOtp = await Password.find({ email: email });

  if (!storedOtp) {
    return new NextResponse("OTP not found", { status: 404 });
  }

  if (storedOtp[0].otp != otp) {
    return new NextResponse("Invalid OTP", { status: 400 });
  }

  const currentTime = new Date();
  if (currentTime > storedOtp.expiresAt) {
    // OTP has expired, delete it from the database
    await Password.findByIdAndDelete(storedOtp._id);
    return new NextResponse("OTP has expired", { status: 400 });
  }

  return new NextResponse("OTP verified", { status: 200 });
}
