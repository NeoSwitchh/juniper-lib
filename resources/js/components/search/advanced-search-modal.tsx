import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { search } from '@/routes';
import type { SearchFacets } from '@/types/biblio';

export function AdvancedSearchModal({ facets }: { facets?: SearchFacets }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={cn(
                    buttonVariants({ variant: 'link', size: 'sm' }),
                    'h-auto p-0 text-xs',
                )}
            >
                Advanced Search
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Advanced Search</DialogTitle>
                    <DialogDescription>
                        Refine your search using multiple criteria.
                    </DialogDescription>
                </DialogHeader>
                <Form {...search.form()} className="grid gap-4 py-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-title">Title</Label>
                        <Input
                            id="adv-title"
                            name="title"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-author">Author</Label>
                        <Input
                            id="adv-author"
                            name="author"
                            placeholder="Enter author name"
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-subject">Subject</Label>
                        <Input
                            id="adv-subject"
                            name="subject"
                            placeholder="Enter subject"
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-isbn">ISBN/ISSN</Label>
                        <Input
                            id="adv-isbn"
                            name="isbn"
                            placeholder="Enter ISBN or ISSN"
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-year">Publish Year</Label>
                        <Input
                            id="adv-year"
                            name="year"
                            type="number"
                            placeholder="e.g. 2023"
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-location">Location</Label>
                        <Select name="location">
                            <SelectTrigger id="adv-location" className="w-full">
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                {(facets?.locations ?? ['Main Library']).map(
                                    (location) => (
                                        <SelectItem
                                            key={location}
                                            value={location}
                                        >
                                            {location}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="adv-gmd">Material Type</Label>
                        <Select name="gmd[]">
                            <SelectTrigger id="adv-gmd" className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {(facets?.gmds ?? ['Book']).map((gmd) => (
                                    <SelectItem key={gmd} value={gmd}>
                                        {gmd}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => setOpen(false)}>
                            Search
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
