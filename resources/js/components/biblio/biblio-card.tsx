import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Biblio } from '@/types/biblio';

const fallbackCover = 'https://placehold.co/200x300/1e293b/white?text=No+Cover';

export function BiblioCard({ biblio }: { biblio: Biblio }) {
    const statusColor =
        biblio.availableCopies > 0 ? 'bg-green-500' : 'bg-red-500';

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex gap-3">
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
                        <div className="mt-2 flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                                {biblio.publishYear}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {biblio.gmd}
                            </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs">
                            <span
                                className={`size-2 rounded-full ${statusColor}`}
                            />
                            <span className="text-muted-foreground">
                                {biblio.availableCopies}/{biblio.totalCopies}{' '}
                                available
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
