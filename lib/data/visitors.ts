import { VisitorData, Quote } from "@/lib/types/visitor";

export const quotes: Quote[] = [
  { text: "The only thing that you absolutely have to know, is the location of the library.", author: "Albert Einstein" },
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "The library is the temple of learning, and nothing is more troublesome than to enlarge it.", author: "Thomas Jefferson" },
];

export const visitorData: VisitorData = {
  visitorCount: 1247,
  quote: quotes[0].text,
  author: quotes[0].author,
  quotes,
};
