"use server";

import connectDB from "@/config/db";
import { validateUserCookie } from "@/lib/getUser";
import { UserModel, TransactionModel } from "@/models";
import { JwtPayload } from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export const getTransactions = async () => {
  const { userId }: JwtPayload = (await validateUserCookie()) || {};
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  try {
    await connectDB();
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return { error: "You need to be logged in to view transactions" };
    }
    const transactions = await TransactionModel.find({ userId: userId });
    return transactions;
  } catch (error) {
    console.log(error);
  }
};

type AddTransactionProps = {
  date: Date;
  title: string;
  amount: number;
  category: string;
};

export const addTransaction = async (data: AddTransactionProps) => {
  const { userId }: JwtPayload = (await validateUserCookie()) || {};

  if (!userId) {
    console.error("User not authenticated");
    return;
  }
  console.log(userId);
  const newTransaction = {
    userId: userId,
    title: data.title,
    amount: data.amount,
    date: data.amount,
    category: data.category,
  };

  try {
    await connectDB();
    const res = await TransactionModel.create(newTransaction);

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error saving transaction:", error);
    if (error instanceof Error) {
      return { "Error saving transaction": error.message };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const deleteTransaction = async (_id: string) => {
  try {
    await connectDB();
    const res = await TransactionModel.deleteOne({ _id });
    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      return { "Error deleting transaction": error.message };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};
