"use client"

import { BiblioGrid } from "@/components/biblio/biblio-grid"
import { BiblioList } from "@/components/biblio/biblio-list"
import { Biblio } from "@/lib/types/biblio"
import { Button } from "@/components/ui/button"
import { LayoutGridIcon, ListViewIcon } from "hugeicons-react"
import { useState } from "react"

export function BiblioCollection({
  biblios,
  title,
}: {
  biblios: Biblio[]
  title?: string
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <section className="py-8">
      {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
      <div className="mb-4 flex gap-1.5">
        <Button
          variant={viewMode === "grid" ? "default" : "secondary"}
          size="sm"
          onClick={() => setViewMode("grid")}
        >
          <LayoutGridIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "secondary"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <ListViewIcon className="h-4 w-4" />
        </Button>
      </div>

      {viewMode === "grid" ? (
        <BiblioGrid biblios={biblios} />
      ) : (
        <BiblioList biblios={biblios} />
      )}
    </section>
  )
}
