import Expense from "../../../models/expenses";
import dbConnect from "../../../config/dbConnect";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PUT(req, { params }) {
  const token = await getToken({ req });
  try {
    const body = await req.json();
    const { itemId } = await params;
    const { expense, date, category, amount } = body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      itemId,
      { expense, date, category, amount },
      { new: true }
    );
    if (!token) {
      return new NextResponse("Need access token to use put method", {
        status: 401,
      });
    }

    if (!updatedExpense) {
      return new NextResponse("Expense not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Expense updated successfully", updatedExpense },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  const token = await getToken({ req });
  dbConnect();

  const { itemId } = await params;

  try {
    const expense = await Expense.findById(itemId);

    if (!expense) {
      return new NextResponse("Expense not found", { status: 404 });
    }
    if (!token) {
      return new NextResponse("Need access token to fetch expenses", {
        status: 401,
      });
    }

    return NextResponse.json(
      { message: "Expense fetched successfully", expense: expense },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req });
  try {
    dbConnect();
    const { itemId } = await params;

    // Find the expense item by ID and remove it
    const deletedExpense = await Expense.findByIdAndRemove(itemId);

    if (!token) {
      return new NextResponse("Need access token to use delete method", {
        status: 401,
      });
    }

    if (!deletedExpense) {
      return new NextResponse("Expense not found", { status: 404 });
    }

    return new NextResponse("Expense deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
