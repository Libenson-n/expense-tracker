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
  const total = transactions?.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  const expenses = transactions
    ?.filter((transaction) => transaction.amount < 0)
    .map((t) => t.amount)
    .reduce((total, t) => {
      return total + t;
    }, 0);

  const income = transactions
    ?.filter((transaction) => transaction.amount > 0)
    .map((t) => t.amount)
    .reduce((total, t) => {
      return total + t;
    }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        {total ? (
          <CardTitle className={total > 0 ? "text-green-600" : "text-red-600"}>
            {total}
          </CardTitle>
        ) : (
          <CardTitle>No transactions</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex gap-3">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Income</CardTitle>
            <CardDescription>{income}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>{expenses}</CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Balance;
