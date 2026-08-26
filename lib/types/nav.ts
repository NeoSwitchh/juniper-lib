export interface NavMenu {
  label: string;
  href: string;
  icon: string;
  subMenus?: NavMenu[];
}
