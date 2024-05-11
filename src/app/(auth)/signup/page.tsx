"use client";
import React, { useState } from "react";
import { z } from "zod";
import TextField from "@/lib/ui/components/Input/TextField";
import Alert from "@/lib/ui/components/Alert";

const schema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    password_confirm: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: " Passwords don't match",
    path: ["password_confirm"], // path of error
  });

export default function Page() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    password_confirm: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event: React.FormEvent) => {
    const { name, value } = event.target;
    setFormValues((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validatedFields = schema.safeParse({
      username: formValues.username,
      password: formValues.password,
      password_confirm: formValues.password_confirm,
    });
    if (!validatedFields.success) {
      setFormErrors(validatedFields.error.flatten().fieldErrors);
    } else {
      setFormErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <label className="block mb-2">
        Username:
        <TextField
          name="username"
          onChange={handleInputChange}
          value={formValues.username}
          errMessage={formErrors.username ? formErrors.username : ""}
        />
      </label>
      <label className="block mb-2">
        Password:
        <TextField
          name="password"
          onChange={handleInputChange}
          value={formValues.password}
          errMessage={formErrors.password ? formErrors.password : ""}
        />
      </label>
      <label className="block mb-2">
        Password Confirm:
        <TextField
          name="password_confirm"
          onChange={handleInputChange}
          value={formValues.password_confirm}
          errMessage={
            formErrors.password_confirm ? formErrors.password_confirm : ""
          }
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Sign In
      </button>
    </form>
  );
}
