import { Member } from "@/lib/types/member";
import { biblios } from "./biblios";

function biblioRef(b: typeof biblios[0]) {
  return {
    id: b.id,
    title: b.title,
    authors: b.authors.map((a) => a.name).join(", "),
  };
}

export const currentMember: Member = {
  id: "u001",
  memberId: "M001",
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  phone: "(555) 123-4567",
  address: "123 Library Street, Cambridge, MA 02138",
  isLoggedIn: true,
  loans: [
    {
      id: "l001",
      biblio: biblioRef(biblios[1]),
      checkoutDate: "2024-05-15",
      dueDate: "2024-06-15",
      isOverdue: false,
    },
    {
      id: "l002",
      biblio: biblioRef(biblios[2]),
      checkoutDate: "2024-05-20",
      dueDate: "2024-06-20",
      isOverdue: false,
    },
    {
      id: "l003",
      biblio: biblioRef(biblios[4]),
      checkoutDate: "2024-05-10",
      dueDate: "2024-06-10",
      isOverdue: true,
    },
  ],
  bookmarks: [
    biblioRef(biblios[0]),
    biblioRef(biblios[3]),
  ],
  readingHistory: [
    biblioRef(biblios[0]),
    biblioRef(biblios[1]),
    biblioRef(biblios[2]),
  ],
};

export const guestMember: Member = {
  id: "",
  memberId: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  isLoggedIn: false,
  loans: [],
  bookmarks: [],
  readingHistory: [],
};
