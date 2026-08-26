import { navMenus } from "@/lib/data/nav-menus"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Library</h3>
            <p className="text-sm text-muted-foreground">
              Senayan Library Management System
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Main Library. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navMenus.slice(0, 5).map((menu) => (
                <li key={menu.href}>
                  <a
                    href={menu.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {menu.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold text-muted-foreground">
              Contact
            </h4>
            <p className="text-sm text-muted-foreground">
              123 Library Street<br />
              Cambridge, MA 02138<br />
              Phone: (555) 123-4567<br />
              Email: info@library.example
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold text-muted-foreground">
              Connect
            </h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                f
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                t
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                i
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground">
          Powered by SLIMS v9.8.0 "Bulian D Ace"
        </p>
      </div>
    </footer>
  )
}
