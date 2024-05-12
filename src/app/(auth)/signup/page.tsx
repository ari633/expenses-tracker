"use client";
import React, { useState } from "react";
import { z } from "zod";
import TextField from "@/lib/ui/components/Input/TextField";
import { NewFetcher } from "@/lib/ui/helpers/fetcher";
import Button from "@/lib/ui/components/Button";
import { useRouter } from 'next/navigation'

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


  interface UserFormStateError {
    username: string | string[] | undefined;
    password: string | string[] | undefined;
    password_confirm: string | string[] | undefined;
  }
  
  interface UserFormStateValues {
    username: string;
    password: string;
    password_confirm: string;
  }

export default function Page() {
  const router = useRouter()

  const [formValues, setFormValues] = useState<UserFormStateValues>({
    username: "",
    password: "",
    password_confirm: "",
  });

  const [formErrors, setFormErrors] = useState<UserFormStateError>({
    username: "",
    password: "",
    password_confirm: "",
  });

  const [loading, setLoading] = useState(false);

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
      username: formValues.username,
      password: formValues.password,
      password_confirm: formValues.password_confirm,
    });
    if (validatedFields.success) {
      setLoading(true);
      NewFetcher('/api/signup', 'POST', {
        username: formValues.username,
        password: formValues.password
      }).then((resp: any) => {
        if (resp.error) {
          setFormErrors((prevProps) => ({
            ...prevProps,
            ["username"]: resp.error,
          }));
        } else {
          router.push('/dashboard')
        }
        setLoading(false);
      })
    }
    if (!validatedFields.success) {
      setFormErrors({
        username: validatedFields.error.flatten().fieldErrors.username,
        password: validatedFields.error.flatten().fieldErrors.password,
        password_confirm: validatedFields.error.flatten().fieldErrors.password_confirm
      });
    } else {
      setFormErrors({
        username: "",
        password: "",
        password_confirm: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">      
      <TextField
        label="Username"
        placeholder="Username"
        name="username"
        onChange={handleInputChange}
        value={formValues.username}
        errMessage={formErrors.username ? formErrors.username : ""}
      />
      <TextField
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        onChange={handleInputChange}
        value={formValues.password}
        errMessage={formErrors.password ? formErrors.password : ""}
        />
      <TextField
        type="password"
        label="Password Confirm"
        placeholder="Password Confirm"
        name="password_confirm"
        onChange={handleInputChange}
        value={formValues.password_confirm}
        errMessage={
          formErrors.password_confirm ? formErrors.password_confirm : ""
        }
      />
      <Button variant="primary" onClick={(e) => handleSubmit(e)} isLoading={loading}>
        Sign In
      </Button>
    </form>
  );
}
