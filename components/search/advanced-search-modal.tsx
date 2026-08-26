"use client"

import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdvancedSearchModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "link", size: "sm" }),
          "h-auto p-0 text-xs underline"
        )}
      >
        Advanced Search
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Advanced Search</DialogTitle>
          <DialogDescription>
            Refine your search using multiple criteria.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter title" />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="author">Author</Label>
            <Input id="author" placeholder="Enter author name" />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter subject" />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="isbn">ISBN/ISSN</Label>
            <Input id="isbn" placeholder="Enter ISBN or ISSN" />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="year">Publish Year</Label>
            <Input id="year" type="number" placeholder="e.g. 2023" />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Library</SelectItem>
                <SelectItem value="branch">Branch Library</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="gmd">Material Type</Label>
            <Select>
              <SelectTrigger id="gmd">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="journal">Journal</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
