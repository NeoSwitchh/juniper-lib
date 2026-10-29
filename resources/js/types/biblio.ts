export type BiblioAuthor = {
    id: string;
    name: string;
    role: string;
};

export type BiblioSubject = {
    id: string;
    term: string;
    deweyClass: string;
};

export type Availability = {
    copyId: string;
    location: string;
    callNumber: string;
    status: 'available' | 'borrowed' | 'reserved' | 'lost';
    dueDate?: string | null;
};

export type BiblioLocation = {
    name: string;
    room: string;
};

export type Biblio = {
    id: string;
    title: string;
    edition: string;
    isbn: string;
    issn: string;
    publisher: string;
    publishYear: number;
    pages: number;
    dimensions: string;
    series: string;
    language: string;
    coverImage: string;
    gmd: string;
    subjects: BiblioSubject[];
    authors: BiblioAuthor[];
    isbiblios: boolean;
    totalCopies: number;
    availableCopies: number;
    availability: Availability[];
    collectionType: string;
    classification: string;
    location: BiblioLocation;
    shortSynopsis: string;
    listDisplayMode: 'grid' | 'list';
};

export type SearchFilters = {
    q: string;
    searchBy: 'all' | 'title' | 'author' | 'subject' | 'isbn';
    title: string;
    author: string;
    subject: string;
    isbn: string;
    year: string;
    location: string;
    gmd: string[];
    authors: string[];
    subjects: string[];
};

export type SearchFacets = {
    authors: string[];
    subjects: string[];
    years: number[];
    locations: string[];
    gmds: string[];
};

export type SortOption = 'relevance' | 'title' | 'year' | 'newest';

export type PaginatorMeta = {
    currentPage: number;
    lastPage: number;
    total: number;
};
