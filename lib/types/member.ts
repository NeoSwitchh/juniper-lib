export interface Member {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isLoggedIn: boolean;
  loans: Loan[];
  bookmarks: BiblioRef[];
  readingHistory: BiblioRef[];
}

export interface Loan {
  id: string;
  biblio: BiblioRef;
  checkoutDate: string;
  dueDate: string;
  isOverdue: boolean;
}

export interface BiblioRef {
  id: string;
  title: string;
  authors: string;
}
