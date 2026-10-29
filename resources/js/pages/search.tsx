import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { BiblioGrid } from '@/components/biblio/biblio-grid';
import { BiblioList } from '@/components/biblio/biblio-list';
import Pagination from '@/components/pagination';
import { FilterSidebar } from '@/components/search/filter-sidebar';
import { SearchForm } from '@/components/search/search-form';
import { SortToolbar } from '@/components/search/sort-toolbar';
import { search } from '@/routes';
import type {
    Biblio,
    PaginatorMeta,
    SearchFacets,
    SearchFilters,
    SortOption,
} from '@/types/biblio';

type Props = {
    biblios: Biblio[];
    meta: PaginatorMeta;
    filters: SearchFilters;
    sort: SortOption;
    facets: SearchFacets;
};

type FilterPatch = Partial<SearchFilters> & {
    sort?: SortOption;
    page?: number | string;
};

export default function SearchPage({
    biblios,
    meta,
    filters,
    sort,
    facets,
}: Props) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const applyParams = (patch: FilterPatch) => {
        const next = { ...filters, ...patch };
        const params: Record<string, string | number | string[]> = {};

        if (next.q.trim() !== '') {
            params.q = next.q.trim();
        }
        if (next.searchBy !== 'all') {
            params.searchBy = next.searchBy;
        }
        if (next.title.trim() !== '') {
            params.title = next.title.trim();
        }
        if (next.author.trim() !== '') {
            params.author = next.author.trim();
        }
        if (next.subject.trim() !== '') {
            params.subject = next.subject.trim();
        }
        if (next.isbn.trim() !== '') {
            params.isbn = next.isbn.trim();
        }
        if (next.year !== '') {
            params.year = next.year;
        }
        if (next.location !== '') {
            params.location = next.location;
        }
        if (next.gmd.length > 0) {
            params.gmd = next.gmd;
        }
        if (next.authors.length > 0) {
            params.authors = next.authors;
        }
        if (next.subjects.length > 0) {
            params.subjects = next.subjects;
        }

        const nextSort = patch.sort ?? sort;
        if (nextSort !== 'relevance') {
            params.sort = nextSort;
        }
        if (
            patch.page !== undefined &&
            patch.page !== 1 &&
            patch.page !== '1'
        ) {
            params.page = patch.page;
        }

        router.get(search.url(), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Search" />

            <div className="mb-6">
                <h1 className="text-xl font-semibold tracking-tight">
                    Search Results
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {meta.total} result{meta.total === 1 ? '' : 's'}
                    {filters.q !== '' && <> for &ldquo;{filters.q}&rdquo;</>}
                </p>
                <div className="mt-4">
                    <SearchForm
                        initialQ={filters.q}
                        initialSearchBy={filters.searchBy}
                        facets={facets}
                    />
                </div>
            </div>

            <div className="flex gap-6">
                <aside className="hidden w-64 shrink-0 md:block">
                    <FilterSidebar
                        facets={facets}
                        filters={filters}
                        onChange={applyParams}
                    />
                </aside>

                <div className="min-w-0 flex-1">
                    <SortToolbar
                        sort={sort}
                        viewMode={viewMode}
                        onSortChange={(value) =>
                            applyParams({ sort: value, page: 1 })
                        }
                        onViewChange={setViewMode}
                    />

                    {viewMode === 'grid' ? (
                        <BiblioGrid biblios={biblios} />
                    ) : (
                        <BiblioList biblios={biblios} />
                    )}

                    <Pagination
                        currentPage={meta.currentPage}
                        lastPage={meta.lastPage}
                        onPageChange={(page) => applyParams({ page })}
                    />
                </div>
            </div>
        </>
    );
}

SearchPage.layout = {
    breadcrumbs: [
        {
            title: 'Search',
            href: search.url(),
        },
    ],
};
