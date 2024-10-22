"use client";

import CardWrapper from "@/app/_components/CardWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../server/actions/userControllers";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [validEmailPassword, setValidEmailPassword] = useState<boolean | null>(
    null
  );

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      setValidEmailPassword(true);
      const res = await login(data);
      if (!res.success) {
        setValidEmailPassword(false);
        console.log("Incorrect email or password!");
      }
      if (res.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWrapper
      label={"Log in to your account"}
      title={"Log In"}
      backButtonHref={"/register"}
      backButtonLabel={"Don't have an account yet? Register here."}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="janedoe@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage>
            {validEmailPassword === false && "Incorrect email or password!"}
          </FormMessage>
          <Button
            type="submit"
            className="w-full bg-indigo-700  hover:bg-indigo-600"
          >
            Log In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
