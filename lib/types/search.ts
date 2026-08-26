import { Biblio } from "./biblio";

export interface SearchResult {
  query: string;
  totalResults: number;
  results: Biblio[];
  sortBy: "relevance" | "title" | "year" | "newest";
  viewMode: "grid" | "list";
  filters: SearchFilters;
}

export interface SearchFilters {
  author: string;
  subject: string;
  isbn: string;
  publishYear: string;
  location: string;
  gmd: string;
  collectionType: string;
}
