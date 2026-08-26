export interface VisitorData {
  visitorCount: number;
  quote: string;
  author: string;
  quotes: Quote[];
}

export interface Quote {
  text: string;
  author: string;
}

export interface VisitorForm {
  memberId: string;
  institution: string;
}
