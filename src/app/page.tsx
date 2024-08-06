"use client"
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { addDays } from "date-fns";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const link = `/ventas/dashboard/${formatDate(addDays(new Date(), -7))}-${formatDate(addDays(new Date(), -1))}`
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginLink postLoginRedirectURL={link}>Sign in</LoginLink>
    </main>
  )
}
