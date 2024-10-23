import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionForm from "./_components/transaction-form";
import { getTransactions } from "../server/actions/transactionControllers";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Transaction } from "@/types";
import Balance from "./_components/balance";

const Dashboard = async () => {
  const transactions: any = await getTransactions();

  const convertToPlainObject = transactions.map(
    (transaction: Transaction) =>
      (transaction = {
        _id: transaction._id.toString(),
        userId: transaction.userId,
        title: transaction.title,
        amount: Number(transaction.amount),
        date: transaction.date.toString(),
        category: transaction.category,
      })
  );

  return (
    <main>
      <div className="m-6 ">
        <Balance transactions={convertToPlainObject} />
        <Card className="flex flex-col sm:flex-row gap-2 p-4 ">
          <Card className="">
            <CardHeader>
              <CardTitle>Add a transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions && (
                <DataTable columns={columns} data={convertToPlainObject} />
              )}
            </CardContent>
          </Card>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
