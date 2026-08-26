"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { MemberLoginForm } from "@/components/member/member-login-form"
import { MemberProfile } from "@/components/member/member-profile"
import { LoanTable } from "@/components/member/loan-table"
import { BookmarkBasket } from "@/components/member/bookmark-basket"
import { currentMember, guestMember } from "@/lib/data/members"
import { Member } from "@/lib/types/member"
import { SearchForm } from "@/components/search/search-form"

export default function MemberPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const member: Member = isLoggedIn ? currentMember : guestMember

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <MainLayout>
      {isLoggedIn ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {member.name}
            </p>
          </div>

          <MemberProfile member={member} />

          <LoanTable member={member} />

          <BookmarkBasket bookmarks={member.bookmarks} />

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold">Reading History</h3>
            <BookmarkBasket bookmarks={member.readingHistory} />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Member Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please log in to access your account, loans, and bookmarks.
            </p>
          </div>

          <MemberLoginForm onLogin={handleLogin} />

          <div className="mt-8">
            <p className="text-center text-sm text-muted-foreground">
              Not a member? Use the search below to browse the catalog.
            </p>
            <div className="mt-4 flex justify-center">
              <SearchForm />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
