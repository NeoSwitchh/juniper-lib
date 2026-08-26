import { BiblioListItem } from "@/components/biblio/biblio-list-item"
import { Biblio } from "@/lib/types/biblio"

export function BiblioList({ biblios }: { biblios: Biblio[] }) {
  return (
    <div className="divide-y">
      {biblios.map((biblio) => (
        <BiblioListItem key={biblio.id} biblio={biblio} />
      ))}
    </div>
  )
}
