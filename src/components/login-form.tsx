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
import { LoginButon, RegisterButon } from "./register-button"
import { signInCredentials } from "@/actions/auth"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState(signInCredentials, null);
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
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-sm text-red-500">{state?.error?.email}</span>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" type="password" />
                <div aria-live="polite" aria-atomic="true">
                  <span className="text-sm text-red-500">{state?.error?.password}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <LoginButon />
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
