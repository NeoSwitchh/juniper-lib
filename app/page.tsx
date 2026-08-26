import { MainLayout } from "@/components/layout/main-layout"
import { SearchForm } from "@/components/search/search-form"
import { TopicGrid } from "@/components/misc/topic-grid"
import { BiblioCollection } from "@/components/biblio/biblio-collection"
import { popularBiblios, latestBiblios, randomBiblios } from "@/lib/data/biblios"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="mb-2 text-3xl font-bold">Welcome to the Library</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Search our collection of books, journals, and digital resources
        </p>
        <SearchForm />
      </div>

      <TopicGrid />

      <BiblioCollection biblios={popularBiblios} title="Popular This Week" />
      <BiblioCollection biblios={latestBiblios} title="New Arrivals" />
      <BiblioCollection biblios={randomBiblios} title="Just for You" />
    </MainLayout>
  )
}
