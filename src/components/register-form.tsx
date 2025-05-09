"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpCredentials } from "@/actions/auth"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { RegisterButon } from "./register-button"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState(signUpCredentials, null);
  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state?.message]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  type="name"
                  placeholder="Username"
                />
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-sm text-red-500">{state?.error?.name}</span>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                />
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-sm text-red-500">{state?.error?.email}</span>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" />
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-sm text-red-500">{state?.error?.password}</span>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                <Input name="ConfirmPassword" type="password" />
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-sm text-red-500">{state?.error?.ConfirmPassword}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <RegisterButon />
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
