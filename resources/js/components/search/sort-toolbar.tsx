import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { LayoutGrid, List } from 'lucide-react';
import type { SortOption } from '@/types/biblio';

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'year', label: 'Year (newest)' },
    { value: 'newest', label: 'Newest First' },
];

export function SortToolbar({
    sort,
    viewMode,
    onSortChange,
    onViewChange,
}: {
    sort: SortOption;
    viewMode: 'grid' | 'list';
    onSortChange: (sort: SortOption) => void;
    onViewChange: (mode: 'grid' | 'list') => void;
}) {
    return (
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select
                    value={sort}
                    onValueChange={(value) => onSortChange(value as SortOption)}
                >
                    <SelectTrigger className="h-8 w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-1.5">
                <Button
                    variant={viewMode === 'grid' ? 'default' : 'secondary'}
                    size="icon"
                    className="size-8"
                    onClick={() => onViewChange('grid')}
                    aria-label="Grid view"
                >
                    <LayoutGrid className="size-4" />
                </Button>
                <Button
                    variant={viewMode === 'list' ? 'default' : 'secondary'}
                    size="icon"
                    className="size-8"
                    onClick={() => onViewChange('list')}
                    aria-label="List view"
                >
                    <List className="size-4" />
                </Button>
            </div>
        </div>
    );
}
