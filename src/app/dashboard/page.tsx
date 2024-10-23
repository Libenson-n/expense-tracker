import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionForm from "./transaction-form";
import { getTransactions } from "../server/actions/transactionControllers";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Transaction } from "@/types";

const Dashboard = async () => {
  const transactions: any = await getTransactions();

  const convertToPlainObject = transactions.map(
    (transaction: Transaction) =>
      (transaction = {
        _id: transaction._id.toString(),
        userId: transaction.userId,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date.toString(),
        category: transaction.category,
      })
  );

  console.log(convertToPlainObject);

  return (
    <main>
      <Card className="m-6 flex gap-2 p-4">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Add a transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm />
          </CardContent>
        </Card>
        <Card className="w-2/3">
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
    </main>
  );
};

export default Dashboard;
