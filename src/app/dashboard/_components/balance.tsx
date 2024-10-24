import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "@/types";

type BalanceProps = {
  transactions?: Transaction[];
};

const Balance = ({ transactions }: BalanceProps) => {
  const expenses =
    transactions
      ?.filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0) || 0;

  const income =
    transactions
      ?.filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

  const total = income - expenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <Card className="">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
            {total !== 0 ? (
              <CardTitle
                className={total > 0 ? "text-green-600" : "text-red-600"}
              >
                {formatCurrency(total)}
              </CardTitle>
            ) : (
              <CardDescription>No transactions</CardDescription>
            )}
          </CardHeader>
        </Card>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Income</CardTitle>
            <CardDescription className="text-green-600">
              {formatCurrency(income)}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription className="text-red-600">
              {formatCurrency(expenses)}
            </CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Balance;
