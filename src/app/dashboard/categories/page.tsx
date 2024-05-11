"use client";

import React, { useEffect, useState } from "react";
import TextField from "@/lib/ui/components/Input/TextField";
import Button from "@/lib/ui/components/Button";
import { NewFetcher } from "@/lib/ui/helpers/fetcher";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Table from "@/lib/ui/components/Table";

interface FormStateError {
  name: string | string[] | undefined;
}

interface FormStateValues {
  name: string;
}

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export default function Page() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormStateValues>({
    name: "",
  });
  const [formErrors, setFormErrors] = useState<FormStateError>({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    NewFetcher("/api/category", "GET").then((resp: any) => {
      if (resp?.categories) {
        setData(resp?.categories);
      }
    });
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validatedFields = schema.safeParse({
      name: formValues.name,
    });

    if (validatedFields.success) {
      setLoading(true);
      NewFetcher("/api/category", "POST", {
        name: formValues.name,
      }).then((resp: any) => {
        if (resp.error) {
          setFormErrors((prevProps) => ({
            ...prevProps,
            ["name"]: resp.error,
          }));
        } else {
          setData([{ name: formValues.name }, ...data]);
        }
        setLoading(false);
        setFormValues({
          name: "",
        });
      });
    }

    if (!validatedFields.success) {
      setFormErrors({
        name: validatedFields.error.flatten().fieldErrors.name,
      });
    } else {
      setFormErrors({
        name: "",
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-8">Categories</h1>
      <div className="max-w-xl mx-auto">
        <form className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <TextField
              placeholder="Input Category Name"
              name="name"
              onChange={handleInputChange}
              value={formValues.name}
              errMessage={formErrors.name ? formErrors.name : ""}
            />
          </div>
          <div className="mt-1">
            <Button
              variant="primary"
              onClick={(e) => handleSubmit(e)}
              isLoading={loading}
            >
              Add New
            </Button>
          </div>
        </form>
        {data.length > 0 ? <Table data={data} /> : "No Data"}
      </div>
    </>
  );
}
