"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { FilterSidebar } from "@/components/search/filter-sidebar"
import { SortToolbar } from "@/components/search/sort-toolbar"
import { Pagination } from "@/components/search/pagination"
import { BiblioGrid } from "@/components/biblio/biblio-grid"
import { BiblioList } from "@/components/biblio/biblio-list"
import { biblios } from "@/lib/data/biblios"
import { Biblio } from "@/lib/types/biblio"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "books"
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const totalResults = biblios.length
  const totalPages = Math.ceil(totalResults / 6)
  const startIndex = (currentPage - 1) * 6
  const results: Biblio[] = biblios.slice(startIndex, startIndex + 6)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <p className="text-sm text-muted-foreground">
          {totalResults} results for "{query}"
        </p>
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 md:block">
          <FilterSidebar />
        </aside>

        <div className="flex-1">
          <SortToolbar viewMode={viewMode} onViewChange={setViewMode} />

          {viewMode === "grid" ? (
            <BiblioGrid biblios={results} />
          ) : (
            <BiblioList biblios={results} />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </MainLayout>
  )
}
