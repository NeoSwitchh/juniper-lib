import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Biblio } from "@/lib/types/biblio"

export function BiblioCard({ biblio }: { biblio: Biblio }) {
  const statusColor = biblio.availableCopies > 0 ? "bg-green-500" : "bg-red-500"

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex gap-3">
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
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {biblio.publishYear}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {biblio.gmd}
              </Badge>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span className={`h-2 w-2 rounded-full ${statusColor}`} />
              <span className="text-muted-foreground">
                {biblio.availableCopies}/{biblio.totalCopies} available
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
