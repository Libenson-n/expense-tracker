import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionForm from "./transaction-form";

const Dashboard = async () => {
  return (
    <main>
      <Card className="w-3/4 mx-auto mt-10">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <TransactionForm />
        </CardHeader>
      </Card>
    </main>
  );
};

export default Dashboard;
