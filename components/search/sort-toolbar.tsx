"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LayoutGridIcon, ListViewIcon } from "hugeicons-react"

export function SortToolbar({
  viewMode,
  onViewChange,
}: {
  viewMode: "grid" | "list"
  onViewChange: (mode: "grid" | "list") => void
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select defaultValue="relevance">
          <SelectTrigger className="h-8 w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="year">Year (newest)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-1.5">
        <Button
          variant={viewMode === "grid" ? "default" : "secondary"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onViewChange("grid")}
        >
          <LayoutGridIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "secondary"}
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onViewChange("list")}
        >
          <ListViewIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
