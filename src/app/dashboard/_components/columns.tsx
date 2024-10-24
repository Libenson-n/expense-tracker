"use client";

import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  deleteTransaction,
  getTransactionById,
} from "@/app/server/actions/transactionControllers";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EditTransaction from "./edit-transaction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("title")}</div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("category")}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div
          className={
            amount > 0
              ? "text-green-600 text-right font-medium"
              : "text-red-600 text-right font-medium"
          }
        >
          {formatted}
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      const formatted = date.slice(0, 10);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Edit / Delete</div>,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="text-right">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <Pencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <EditTransaction transaction={transaction} />
            </PopoverContent>
          </Popover>
          <Button
            className="text-red-600"
            variant="ghost"
            onClick={() => {
              deleteTransaction(transaction._id);
              toast("Transaction Deleted");
            }}
          >
            <X />
          </Button>
        </div>
      );
    },
  },
];
