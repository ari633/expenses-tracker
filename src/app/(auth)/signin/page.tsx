"use client";
import React, { useState } from "react";
import { z } from "zod";
import TextField from "@/lib/ui/components/Input/TextField";
import { NewFetcher } from "@/lib/ui/helpers/fetcher";
import Button from "@/lib/ui/components/Button";
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

interface UserFormStateError {
  username: string | string[] | undefined;
  password: string | string[] | undefined;
}

interface UserFormStateValues {
  username: string;
  password: string;
}

export default function Page() {
  const router = useRouter()
  const [formValues, setFormValues] = useState<UserFormStateValues>({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<UserFormStateError>({
    username: "",
    password: "",
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
    });

    if (validatedFields.success) {
      setLoading(true);
      NewFetcher('/api/signin', 'POST', {
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
      });
    } else {
      setFormErrors({
        username: "",
        password: ""
      });
    }
  };

  return (
    <form className="max-w-sm mx-auto">
      <TextField
        label="Username"
        placeholder="Username"
        name="username"
        onChange={handleInputChange}
        value={formValues.username}
        errMessage={formErrors.username ? formErrors.username : ""}
      />
      <TextField
        label="Password"
        placeholder="Password"
        name="password"
        onChange={handleInputChange}
        value={formValues.password}
        errMessage={formErrors.password ? formErrors.password : ""}
      />
      <Button variant="primary" onClick={(e) => handleSubmit(e)} isLoading={loading}>
        Sign In
      </Button>
    </form>
  );
}
