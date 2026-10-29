import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { SearchFacets, SearchFilters } from '@/types/biblio';

type FilterPatch = Partial<SearchFilters> & { page?: string };

type FilterSidebarProps = {
    facets: SearchFacets;
    filters: SearchFilters;
    onChange: (patch: FilterPatch) => void;
};

function toggleValue(values: string[], value: string): string[] {
    return values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
}

export function FilterSidebar({
    facets,
    filters,
    onChange,
}: FilterSidebarProps) {
    return (
        <aside className="space-y-6">
            <div>
                <h3 className="mb-3 text-sm font-semibold">Authors</h3>
                <div className="space-y-2">
                    {facets.authors.map((author) => (
                        <div key={author} className="flex items-center gap-2">
                            <Checkbox
                                id={`author-${author}`}
                                checked={filters.authors.includes(author)}
                                onCheckedChange={() =>
                                    onChange({
                                        authors: toggleValue(
                                            filters.authors,
                                            author,
                                        ),
                                        page: '',
                                    })
                                }
                            />
                            <Label
                                htmlFor={`author-${author}`}
                                className="text-sm"
                            >
                                {author}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="mb-3 text-sm font-semibold">Subjects</h3>
                <div className="space-y-2">
                    {facets.subjects.map((subject) => (
                        <div key={subject} className="flex items-center gap-2">
                            <Checkbox
                                id={`subject-${subject}`}
                                checked={filters.subjects.includes(subject)}
                                onCheckedChange={() =>
                                    onChange({
                                        subjects: toggleValue(
                                            filters.subjects,
                                            subject,
                                        ),
                                        page: '',
                                    })
                                }
                            />
                            <Label
                                htmlFor={`subject-${subject}`}
                                className="text-sm"
                            >
                                {subject}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="mb-3 text-sm font-semibold">Publish Year</h3>
                <Select
                    value={filters.year === '' ? 'all' : filters.year}
                    onValueChange={(value) =>
                        onChange({
                            year: value === 'all' ? '' : value,
                            page: '',
                        })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All years" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All years</SelectItem>
                        {facets.years.map((year) => (
                            <SelectItem key={year} value={String(year)}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div>
                <h3 className="mb-3 text-sm font-semibold">Location</h3>
                <Select
                    value={filters.location === '' ? 'all' : filters.location}
                    onValueChange={(value) =>
                        onChange({
                            location: value === 'all' ? '' : value,
                            page: '',
                        })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        {facets.locations.map((location) => (
                            <SelectItem key={location} value={location}>
                                {location}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div>
                <h3 className="mb-3 text-sm font-semibold">Material Type</h3>
                <div className="space-y-2">
                    {facets.gmds.map((gmd) => (
                        <div key={gmd} className="flex items-center gap-2">
                            <Checkbox
                                id={`gmd-${gmd}`}
                                checked={filters.gmd.includes(gmd)}
                                onCheckedChange={() =>
                                    onChange({
                                        gmd: toggleValue(filters.gmd, gmd),
                                        page: '',
                                    })
                                }
                            />
                            <Label htmlFor={`gmd-${gmd}`} className="text-sm">
                                {gmd}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
