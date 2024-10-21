"use server";

import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

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

  const usersCollection = await getCollection("users");
  const existingUser = await usersCollection.findOne({
    username: user.username,
  });

  if (existingUser) {
    return { error: "Username already in use!" };
  }

  const newUser = await usersCollection.insertOne(user);

  const userId = newUser.insertedId;

  const token = jwt.sign(
    { userId: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWT_SECRET as string
  );

  cookies().set("expense-tracker", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  redirect("/");
};

export const logout = async () => {
  cookies().delete("expense-tracker");
  redirect("/");
};

export const login = async (data: User) => {
  const failObj = {
    success: false,
    message: "Incorrect username or password",
  };

  const user = {
    email: data.email,
    password: data.password,
  };

  const collection = await getCollection("users");
  const foundUser = await collection.findOne({ email: user.email });

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
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  redirect("/");
};
