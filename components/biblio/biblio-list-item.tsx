"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Biblio } from "@/lib/types/biblio"
import {
  BookmarkAdd01Icon,
  File01Icon,
  QuoteDownIcon,
  BookDownloadIcon,
} from "hugeicons-react"

const statusColor = (biblio: Biblio) =>
  biblio.availableCopies > 0 ? "bg-green-500" : "bg-red-500"

export function BiblioListItem({ biblio }: { biblio: Biblio }) {
  return (
    <div className="flex gap-4 py-3">
      <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded">
        <Image
          src={biblio.coverImage || "https://placehold.co/200x300/1e293b/white?text=No+Cover"}
          alt={biblio.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link href={`/detail/${biblio.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug">
            {biblio.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
          {biblio.authors.map((a) => a.name).join(", ")}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {biblio.subjects.map((subject) => (
            <Badge key={subject.id} variant="secondary" className="text-xs">
              {subject.term}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 text-right text-xs">
        <div className="mb-1 flex items-center justify-end gap-1">
          <span className={`h-2 w-2 rounded-full ${statusColor(biblio)}`} />
          <span className="text-muted-foreground">
            {biblio.availableCopies}/{biblio.totalCopies}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 pl-2">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <BookmarkAdd01Icon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <File01Icon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <QuoteDownIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <BookDownloadIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
