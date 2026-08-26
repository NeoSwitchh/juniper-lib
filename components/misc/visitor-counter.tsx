"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QuotesIcon, PlayCircleIcon, PauseCircleIcon } from "hugeicons-react"
import { quotes } from "@/lib/data/visitors"

export function VisitorCounter() {
  const [memberId, setMemberId] = useState("")
  const [institution, setInstitution] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(quotes[quoteIndex].text)
    if (isSpeaking) {
      speechSynthesis.cancel()
    } else {
      speechSynthesis.speak(utterance)
    }
    setIsSpeaking(!isSpeaking)
  }

  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visitor Counter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <QuotesIcon className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm italic">"{quotes[quoteIndex].text}"</p>
              <p className="mt-1 text-xs text-muted-foreground">
                — {quotes[quoteIndex].author}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-1.5"
            onClick={handleSpeak}
          >
            {isSpeaking ? (
              <PauseCircleIcon className="h-4 w-4" />
            ) : (
              <PlayCircleIcon className="h-4 w-4" />
            )}
            {isSpeaking ? "Stop" : "Read Aloud"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="memberId" className="text-sm">
              Member ID
            </Label>
            <Input
              id="memberId"
              placeholder="e.g. M001"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="institution" className="text-sm">
              Institution
            </Label>
            <Input
              id="institution"
              placeholder="Your institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
