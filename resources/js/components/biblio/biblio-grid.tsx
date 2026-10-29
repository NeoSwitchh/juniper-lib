import { BiblioCard } from '@/components/biblio/biblio-card';
import type { Biblio } from '@/types/biblio';

export function BiblioGrid({ biblios }: { biblios: Biblio[] }) {
    if (biblios.length === 0) {
        return <EmptyResults />;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {biblios.map((biblio) => (
                <BiblioCard key={biblio.id} biblio={biblio} />
            ))}
        </div>
    );
}

export function EmptyResults() {
    return (
        <div className="rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">
            No results found. Try adjusting your search or filters.
        </div>
    );
}
