import { TopicCategory } from "@/lib/types/topics";

export const topics: TopicCategory[] = [
  { deweyClass: "0", label: "General Works, Computer Science & Information", icon: "Computer", color: "bg-blue-500", count: 142 },
  { deweyClass: "1", label: "Philosophy & Psychology", icon: "BookOpen", color: "bg-purple-500", count: 89 },
  { deweyClass: "2", label: "Religion", icon: "Church", color: "bg-amber-500", count: 67 },
  { deweyClass: "3", label: "Social Sciences", icon: "Users", color: "bg-green-500", count: 234 },
  { deweyClass: "4", label: "Language & Linguistics", icon: "Languages", color: "bg-teal-500", count: 56 },
  { deweyClass: "5", label: "Natural Sciences & Math", icon: "Flask", color: "bg-emerald-500", count: 178 },
  { deweyClass: "6", label: "Technology & Medicine", icon: "HeartPulse", color: "bg-red-500", count: 134 },
  { deweyClass: "7", label: "Arts & Recreation", icon: "Music", color: "bg-pink-500", count: 95 },
  { deweyClass: "8", label: "Literature & Rhetoric", icon: "Pen", color: "bg-indigo-500", count: 112 },
  { deweyClass: "9", label: "History & Geography", icon: "Globe", color: "bg-orange-500", count: 156 },
];

export const homeTopics = topics.slice(0, 5);
