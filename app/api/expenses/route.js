import Expense from "../../models/expenses";
import dbConnect from "../../config/dbConnect";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const token = await getToken({ req });
  try {
    dbConnect();
    const body = await req.json();
    const { expense, date, category, amount } = body;
    if (!token) {
      return new NextResponse("Need access token to use post method", {
        status: 401,
      });
    }

    const expenses = await Expense.create({ expense, date, category, amount });

    return new NextResponse("Expense added successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req) {
  const token = await getToken({ req });
  try {
    dbConnect();
    const expenses = await Expense.find({});

    if (!expenses) {
      return new NextResponse("No expenses found", { status: 404 });
    }

    if (!token) {
      return new NextResponse("Need access token to fetch expenses", {
        status: 401,
      });
    }

    return NextResponse.json(
      { error: "Expenses fetched successfully", expenses: expenses },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
