"use server";

import connectDB from "@/config/db";
import { validateUserCookie } from "@/lib/getUser";
import { UserModel, TransactionModel } from "@/models";
import { JwtPayload } from "jsonwebtoken";

export const getTransactions = async (userId: string) => {
  try {
    await connectDB();
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return { error: "You need to be logged in to view transactions" };
    }
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
    date: data.date,
    category: data.category,
  };

  console.log(newTransaction);
  try {
    await connectDB();
    const res = await TransactionModel.create(newTransaction);
  } catch (error) {
    console.log(error);
  }
};
