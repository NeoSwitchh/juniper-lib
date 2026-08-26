"use client"

import { Button } from "@/components/ui/button"
import { ChatIcon } from "hugeicons-react"

export function ChatButton() {
  return (
    <Button
      variant="default"
      size="sm"
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
    >
      <ChatIcon className="h-5 w-5" />
    </Button>
  )
}
