"use client"
import ExpenseChart from "@/lib/ui/components/ExpenseChart";
import { NewFetcher } from "@/lib/ui/helpers/fetcher";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    NewFetcher("/api/expenses", "GET").then((resp: any) => {
      if (resp?.expenses) {
        const d = resp?.expenses.map((item: any) => {
          return {
            amount: item.amount,
            date: item.date,
            category: item.category_name
          };
        });
        setData(d);
      }
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl text-center font-bold">Dashboard</h1>
      <div className="max-w-xl mx-auto">
      {data.length > 0 ? <ExpenseChart data={data} /> : 'No Expenses' }   
      </div>   
    </>
  );
}

