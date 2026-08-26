import { Author } from "@/lib/types/biblio";

export const authors: Author[] = [
  { id: "a001", name: "Doe, John", role: "author" },
  { id: "a002", name: "Smith, Jane", role: "author" },
  { id: "a003", name: "Johnson, Robert", role: "editor" },
  { id: "a004", name: "Williams, Emily", role: "translator" },
  { id: "a005", name: "Brown, Michael", role: "author" },
  { id: "a006", name: "Davis, Sarah", role: "author" },
  { id: "a007", name: "Miller, David", role: "author" },
  { id: "a008", name: "Wilson, Lisa", role: "author" },
];

export const authorMap: Record<string, Author> = Object.fromEntries(
  authors.map((a) => [a.id, a])
);
