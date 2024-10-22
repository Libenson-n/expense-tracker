import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionForm from "./transaction-form";
import { validateUserCookie } from "@/lib/getUser";
import { getTransactions } from "../server/actions/transactionControllers";

const Dashboard = async () => {
  return (
    <main>
      <Card className="w-1/3 mx-auto mt-10">
        <CardHeader>
          <CardTitle>Add a transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default Dashboard;
