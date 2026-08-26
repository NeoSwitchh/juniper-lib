export interface Biblio {
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
  subjects: Subject[];
  authors: Author[];
  isbiblios: boolean;

  totalCopies: number;
  availableCopies: number;
  availability: Availability[];

  collectionType: string;
  classification: string;
  location: Location;

  shortSynopsis: string;
  listDisplayMode: "grid" | "list";
}

export interface Author {
  id: string;
  name: string;
  role: string;
}

export interface Subject {
  id: string;
  term: string;
  deweyClass: string;
}

export interface Availability {
  copyId: string;
  location: string;
  callNumber: string;
  status: "available" | "borrowed" | "reserved" | "lost";
  dueDate?: string;
}

interface Location {
  name: string;
  room: string;
}
