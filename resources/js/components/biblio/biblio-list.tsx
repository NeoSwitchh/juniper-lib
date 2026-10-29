import { EmptyResults } from '@/components/biblio/biblio-grid';
import { BiblioListItem } from '@/components/biblio/biblio-list-item';
import type { Biblio } from '@/types/biblio';

export function BiblioList({ biblios }: { biblios: Biblio[] }) {
    if (biblios.length === 0) {
        return <EmptyResults />;
    }

    return (
        <div className="divide-y">
            {biblios.map((biblio) => (
                <BiblioListItem key={biblio.id} biblio={biblio} />
            ))}
        </div>
    );
}
