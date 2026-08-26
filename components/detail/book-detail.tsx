import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Biblio } from "@/lib/types/biblio"

export function BookDetail({ biblio }: { biblio: Biblio }) {
  const authors = biblio.authors.map((a) => a.name).join(", ")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative mx-auto h-64 w-44 flex-shrink-0 overflow-hidden rounded-md md:mx-0">
            <Image
              src={biblio.coverImage || "https://placehold.co/200x300/1e293b/white?text=No+Cover"}
              alt={biblio.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{biblio.title}</h1>

            {biblio.edition && (
              <p className="mt-1 text-sm text-muted-foreground">
                {biblio.edition} edition
              </p>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Author:</span> {authors}
              </p>
              <p>
                <span className="font-medium">Publisher:</span> {biblio.publisher}
              </p>
              <p>
                <span className="font-medium">Publish Year:</span> {biblio.publishYear}
              </p>
              <p>
                <span className="font-medium">Pages:</span> {biblio.pages}
              </p>
              <p>
                <span className="font-medium">Dimensions:</span> {biblio.dimensions}
              </p>
              {biblio.isbn && (
                <p>
                  <span className="font-medium">ISBN:</span> {biblio.isbn}
                </p>
              )}
              {biblio.issn && (
                <p>
                  <span className="font-medium">ISSN:</span> {biblio.issn}
                </p>
              )}
              {biblio.series && (
                <p>
                  <span className="font-medium">Series:</span> {biblio.series}
                </p>
              )}
              <p>
                <span className="font-medium">Language:</span> {biblio.language}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge variant="outline">{biblio.gmd}</Badge>
              <Badge variant="outline">{biblio.collectionType}</Badge>
              <Badge variant="outline">
                Classification: {biblio.classification}
              </Badge>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {biblio.shortSynopsis}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
