"use client"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { MemberLoginForm } from "@/components/member/member-login-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currentMember } from "@/lib/data/members"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const handleLogin = () => {
    router.push("/member")
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>Member Login</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Enter your Member ID and PIN to access your account.
            </p>
            <MemberLoginForm onLogin={handleLogin} />
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            <Link href="/libinfo" className="underline">
              Library Information
            </Link>{" "}
            |{" "}
            <Link href="/help" className="underline">
              Help
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          Demo account: Member ID: {currentMember.memberId}
        </div>
      </div>
    </MainLayout>
  )
}
