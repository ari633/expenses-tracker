"use client";
import { Expense } from "@/lib/server/repositories/expenses";
import Button from "@/lib/ui/components/Button";
import Options, { TypeOption } from "@/lib/ui/components/Input/Option";
import TextField from "@/lib/ui/components/Input/TextField";
import Table from "@/lib/ui/components/Table";
import { NewFetcher } from "@/lib/ui/helpers/fetcher";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const schema = z.object({
  amount: z.number().min(1, { message: "Amount is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});

interface FormStateError {
  amount: string | string[] | undefined;
  date: string | string[] | undefined;
  category: string | string[] | undefined;
}

interface FormStateValues {
  amount: number;
  date: string;
  category: string;
}

export default function UI() {
  useEffect(() => {
    console.log("TODO");
  }, []);

  const [formValues, setFormValues] = useState<FormStateValues>({
    amount: 0,
    date: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState<FormStateError>({
    amount: "",
    date: "",
    category: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<TypeOption[]>([]);
  const [data, setData] = useState<any>([]);

  
  useEffect(() => {
    NewFetcher("/api/category", "GET").then((resp: any) => {
      if (resp?.categories) {
        const d = resp?.categories.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
        setCategories(d);
      }
    });
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    NewFetcher("/api/expenses", "GET").then((resp: any) => {
      if (resp?.expenses) {
        const d = resp?.expenses.map((item: any) => {
          return {
            id: item.id,
            amount: item.amount,
            date: item.date,
            category: item.category_name
          };
        });
        setData(d);
      }
    });
  }

  const handleDelete = (id: number) => {
    NewFetcher(`/api/expenses?id=${id}`, "DELETE").then((resp: any) => {
      if (resp?.expenses) {
        fetchExpenses();
      }
    });
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleOnSelect = (event: TypeOption) => {
    const {label, value} = event
    setFormValues((prevProps) => ({
      ...prevProps,
      [label]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validatedFields = schema.safeParse({
      amount: Number(formValues.amount),
      category: formValues.category,
      date: formValues.date,
    });

    if (validatedFields.success) {
      setLoading(true);
      NewFetcher('/api/expenses', 'POST', {
        amount: formValues.amount,
        category_id: formValues.category,
        date: formValues.date
      }).then((resp: any) => {
        if (resp.error) {
          setFormErrors((prevProps) => ({
            ...prevProps,
            ["username"]: resp.error,
          }));
        } else {
          fetchExpenses();
        }
        setLoading(false);
      })
    }

    if (!validatedFields.success) {
      setFormErrors({
        amount: validatedFields.error.flatten().fieldErrors.amount,
        date: validatedFields.error.flatten().fieldErrors.date,
        category: validatedFields.error.flatten().fieldErrors.category,
      });
    } else {
      setFormErrors({
        amount: "",
        date: "",
        category: "",
      });
    }
  };
  const actionTable = [
    {
      label: 'Delete',
      callback: (row: Expense) => {
        handleDelete(row.id!)
      }
    }
  ]
  return (
    <div className="mx-auto mt-4">
      <form className="grid grid-cols-4 gap-4">
        <TextField
          label="Amount"
          type="number"
          placeholder={"Amount"}
          value={formValues.amount}
          name={"amount"}
          errMessage={formErrors.amount}
          onChange={handleInputChange}
        />
        <TextField
          label="Date"
          type="date"
          placeholder={"Date"}
          value={formValues.date}
          name={"date"}
          errMessage={formErrors.date}
          onChange={handleInputChange}
        />
        <Options
          name="category"
          onSelect={handleOnSelect}
          options={categories}
          label="Category"
          errMessage={formErrors.category}
        />
        <div className="mt-7">
          <Button
            variant="primary"
            onClick={(e) => handleSubmit(e)}
            isLoading={loading}
          >
            Add New
          </Button>
        </div>
      </form>
      <a href="/api/export" className="bg-gray-500 p-2">Export</a><br/><br/>
      {data.length > 0 ? <Table data={data} actions={actionTable}/> : "No Data"}
    </div>
  );
}
