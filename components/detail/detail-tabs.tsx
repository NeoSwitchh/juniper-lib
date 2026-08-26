import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Biblio } from "@/lib/types/biblio"

export function DetailTabs({ biblio }: { biblio: Biblio }) {
  return (
    <Tabs defaultValue="details" className="mt-6">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="availability">Availability</TabsTrigger>
        <TabsTrigger value="cite">Cite</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-4 text-sm">
        <div className="space-y-2">
          <p>
            <span className="font-medium">Title:</span> {biblio.title}
          </p>
          <p>
            <span className="font-medium">Authors:</span>{" "}
            {biblio.authors.map((a) => `${a.name} (${a.role})`).join(", ")}
          </p>
          <p>
            <span className="font-medium">Subjects:</span>{" "}
            {biblio.subjects.map((s) => s.term).join(", ")}
          </p>
          <p>
            <span className="font-medium">GMD:</span> {biblio.gmd}
          </p>
          <p>
            <span className="font-medium">Collection Type:</span> {biblio.collectionType}
          </p>
          <p>
            <span className="font-medium">Location:</span> {biblio.location.name} ({biblio.location.room})
          </p>
        </div>
      </TabsContent>

      <TabsContent value="availability" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Total copies: {biblio.totalCopies}, Available: {biblio.availableCopies}
        </p>
      </TabsContent>

      <TabsContent value="cite" className="mt-4">
        <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto">
{`${biblio.authors.map((a) => a.name).join(", ")}. (${biblio.publishYear}). ${biblio.title}. ${biblio.publisher}.`}
        </pre>
      </TabsContent>
    </Tabs>
  )
}
