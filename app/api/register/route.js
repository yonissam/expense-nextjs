import User from "../../models/user";
import dbConnect from "../../config/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    dbConnect();

    const body = await request.json();

    const { name, email, password } = body;

    const user = await User.create({ name, email, password });

    return new NextResponse("User Created Successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
