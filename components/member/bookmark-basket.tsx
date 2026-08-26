import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { BiblioRef } from "@/lib/types/member"

export function BookmarkBasket({ bookmarks }: { bookmarks: BiblioRef[] }) {
  if (bookmarks.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">
            No bookmarks saved yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold">Bookmark Basket</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bookmarks.map((biblio) => (
          <Card key={biblio.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="relative mb-2 h-32 w-full overflow-hidden rounded">
                <Image
                  src="https://placehold.co/200x300/1e293b/white?text=No+Cover"
                  alt={biblio.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <Link href={`/detail/${biblio.id}`}>
                <h4 className="line-clamp-1 text-sm font-medium">
                  {biblio.title}
                </h4>
              </Link>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {biblio.authors}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
