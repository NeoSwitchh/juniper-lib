"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { topics } from "@/lib/data/topics"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TopicModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          View All Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>All Categories</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {topics.map((topic) => (
            <Card key={topic.deweyClass}>
              <CardHeader className="pb-2">
                <div className="text-3xl">{topic.icon}</div>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-medium">{topic.label}</p>
                <span className="text-xs text-muted-foreground">
                  Dewey: {topic.deweyClass}xx
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
