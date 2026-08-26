"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdvancedSearchModal } from "@/components/search/advanced-search-modal"

const searchByOptions = ["ALL", "Title", "Author", "Subject", "ISBN/ISSN"]

export function SearchForm() {
  const [searchBy, setSearchBy] = useState("ALL")

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="relative flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search for books, authors, subjects..."
          className="h-9 pr-20"
        />
        <Button size="sm" className="absolute right-2 h-6">
          Search
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {searchByOptions.map((option) => (
          <Button
            key={option}
            variant={searchBy === option ? "default" : "secondary"}
            size="xs"
            onClick={() => setSearchBy(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 pt-1 text-xs">
        <AdvancedSearchModal />
      </div>
    </div>
  )
}
