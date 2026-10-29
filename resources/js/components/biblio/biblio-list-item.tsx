import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, FileText, Printer, Quote } from 'lucide-react';
import type { Biblio } from '@/types/biblio';

const fallbackCover = 'https://placehold.co/200x300/1e293b/white?text=No+Cover';

const statusColor = (biblio: Biblio) =>
    biblio.availableCopies > 0 ? 'bg-green-500' : 'bg-red-500';

export function BiblioListItem({ biblio }: { biblio: Biblio }) {
    return (
        <div className="flex gap-4 py-3">
            <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded">
                <img
                    src={biblio.coverImage || fallbackCover}
                    alt={biblio.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm leading-snug font-medium">
                    {biblio.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {biblio.authors.map((a) => a.name).join(', ')}
                </p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                    {biblio.subjects.map((subject) => (
                        <Badge
                            key={subject.id}
                            variant="secondary"
                            className="text-xs"
                        >
                            {subject.term}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="shrink-0 text-right text-xs">
                <div className="mb-1 flex items-center justify-end gap-1">
                    <span
                        className={`size-2 rounded-full ${statusColor(biblio)}`}
                    />
                    <span className="text-muted-foreground">
                        {biblio.availableCopies}/{biblio.totalCopies}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1 pl-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    aria-label="Add to basket"
                >
                    <BookmarkPlus className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    aria-label="MARC record"
                >
                    <FileText className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    aria-label="Cite"
                >
                    <Quote className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    aria-label="Print"
                >
                    <Printer className="size-4" />
                </Button>
            </div>
        </div>
    );
}
