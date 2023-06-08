import User from "../../models/user";
import dbConnect from "../../config/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    dbConnect();

    const body = await request.json();

    const { email, password } = body;

    const user = await User.findOne({ email: email });

    if (user) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const resetPassword = await User.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );
      return new NextResponse("Password reset successfully", { status: 200 });
    }
    return new NextResponse("Invalid email", { status: 422 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
