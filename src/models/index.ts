import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    transactions: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const UserModel = models.user || model("user", userSchema);

const transactionSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const TransactionModel =
  models.transaction || model("transaction", transactionSchema);
