import { BiblioCard } from "@/components/biblio/biblio-card"
import { Biblio } from "@/lib/types/biblio"

export function BiblioGrid({ biblios }: { biblios: Biblio[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {biblios.map((biblio) => (
        <BiblioCard key={biblio.id} biblio={biblio} />
      ))}
    </div>
  )
}
