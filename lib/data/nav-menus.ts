import { NavMenu } from "@/lib/types/nav";

export const navMenus: NavMenu[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Search", href: "/search", icon: "Search" },
  { label: "LibInfo", href: "/libinfo", icon: "Info" },
  { label: "News", href: "/news", icon: "Newspaper" },
  { label: "Help", href: "/help", icon: "Help" },
  { label: "Visitor", href: "/visitor", icon: "User" },
  { label: "Member", href: "/member", icon: "UserCircle" },
  { label: "Login", href: "/login", icon: "LogIn" },
];

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "id", label: "Bahasa Indonesia" },
];
