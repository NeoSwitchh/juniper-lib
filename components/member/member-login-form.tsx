"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MemberLoginForm({ onLogin }: { onLogin: () => void }) {
  const [memberId, setMemberId] = useState("")
  const [pin, setPin] = useState("")

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <div>
        <Label htmlFor="memberId" className="text-sm">
          Member ID
        </Label>
        <Input
          id="memberId"
          type="text"
          placeholder="e.g. M001"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="pin" className="text-sm">
          PIN
        </Label>
        <Input
          id="pin"
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      <Button className="w-full" size="sm" onClick={onLogin}>
        Login
      </Button>
    </div>
  )
}
