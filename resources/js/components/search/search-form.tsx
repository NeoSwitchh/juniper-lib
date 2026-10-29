import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { AdvancedSearchModal } from '@/components/search/advanced-search-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { search } from '@/routes';
import type { SearchFacets } from '@/types/biblio';

const searchByOptions = [
    { value: 'all', label: 'ALL' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'subject', label: 'Subject' },
    { value: 'isbn', label: 'ISBN/ISSN' },
] as const;

type SearchBy = (typeof searchByOptions)[number]['value'];

export function SearchForm({
    initialQ = '',
    initialSearchBy = 'all',
    facets,
}: {
    initialQ?: string;
    initialSearchBy?: SearchBy;
    facets?: SearchFacets;
}) {
    const [searchBy, setSearchBy] = useState<SearchBy>(initialSearchBy);

    return (
        <div className="flex w-full max-w-3xl flex-col gap-3">
            <Form {...search.form()} className="flex flex-col gap-3">
                <div className="relative flex items-center gap-2">
                    <Input
                        type="search"
                        name="q"
                        defaultValue={initialQ}
                        placeholder="Search for books, authors, subjects..."
                        className="h-9 pr-20"
                    />
                    <input type="hidden" name="searchBy" value={searchBy} />
                    <Button
                        type="submit"
                        size="sm"
                        className="absolute right-2 h-6"
                    >
                        Search
                    </Button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {searchByOptions.map((option) => (
                        <Button
                            key={option.value}
                            type="button"
                            variant={
                                searchBy === option.value
                                    ? 'default'
                                    : 'secondary'
                            }
                            size="sm"
                            onClick={() => setSearchBy(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </Form>

            <div className="flex gap-2 pt-1 text-xs">
                <AdvancedSearchModal facets={facets} />
            </div>
        </div>
    );
}
