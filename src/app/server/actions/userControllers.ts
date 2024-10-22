"use server";

import connectDB from "@/config/db";
import { UserModel } from "@/models";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const TOKEN_EXPIRATION = 60 * 60 * 24; // 24 hours

type User = {
  username?: string;
  email: string;
  password: string;
};

export const register = async (data: User) => {
  const user = {
    username: data.username,
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
  };

  try {
    await connectDB();
    const existingUser = await UserModel.findOne({
      email: user.email,
    });
    if (existingUser) {
      return { error: "Email already registered!" };
    }
    const newUser = await UserModel.create(user);

    const userId = newUser.insertedId;

    const token = jwt.sign(
      { userId: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
      process.env.JWT_SECRET as string
    );

    cookies().set("expense-tracker", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: TOKEN_EXPIRATION,
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const logout = async () => {
  cookies().delete("expense-tracker");
  redirect("/");
};

export const login = async (data: User) => {
  const failObj = {
    success: false,
    message: "Incorrect email or password",
  };

  const user = {
    email: data.email,
    password: data.password,
  };

  try {
    await connectDB();
    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      return failObj;
    }
    const matchOrNot = bcrypt.compareSync(user.password, foundUser.password);

    if (!matchOrNot) {
      return failObj;
    }

    const token = jwt.sign(
      {
        userId: foundUser._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      process.env.JWT_SECRET as string
    );

    cookies().set("expense-tracker", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: TOKEN_EXPIRATION,
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    return {
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
};
