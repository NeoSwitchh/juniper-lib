# Library OPAC UI Refactor Plan — PHP → Next.js + Shadcn

## Executive Summary

This plan outlines refactoring the **public-facing OPAC** side of the legacy system from PHP-based templates to Next.js 16 + Shadcn + Tailwind. The scope is **UI-only** — all data will be dummy/mock data, no live PHP/MySQL backend calls.

### Current Architecture (the legacy system)

the legacy system has two themes:

| Theme | Stack | Purpose |
|-------|-------|---------|
| `default` | Bootstrap 4 + Tailwind CSS + Vue.js 2.x + jQuery | Desktop-focused OPAC |
| `lightweight` | Custom mobile-first CSS + jQuery | Mobile-focused (triggered by `LIGHTWEIGHT_MODE` constant) |

**Routing**: PHP query-params (`?p=show_detail&id=X`, `?search=search&keywords=X`)

**Data Flow**: PHP backend queries MySQL → data passed to PHP template files → rendered HTML

### Target Architecture

| Concern | Technology |
|---------|-----------|
| Framework | Next.js 16.2.6 |
| Runtime | React 19.2.4 (RSC enabled) |
| Styling | Tailwind CSS 4 + OKLCH color system |
| Components | Shadcn (base-mira style, baseColor: neutral) |
| Icons | Hugeicons |
| Language | TypeScript (strict) |
| Path alias | `@/*` → `./*` |

### Existing juniper-library Project Setup

The target project at `juniper-library/` already has:
- `app/layout.tsx` — RootLayout with ThemeProvider, Inter + Geist_Mono fonts
- `app/globals.css` — Full OKLCH color palette (light/dark mode)
- `app/page.tsx` — Starter page with Button example
- `lib/utils.ts` — `cn(...inputs)` = `twMerge(clsx(inputs))`
- `components/ui/button.tsx` — Shadcn button with cva variants
- `components/theme-provider.tsx` — Theme context
- `components.json` — `style: "base-mira"`, `rsc: true`, `iconLibrary: "hugeicons"`

### Page-by-Page Mapping (PHP → Next.js)

### 1. Home Page

**PHP Source**: `template/default/parts/_home.php`

**Key Sections**:
- Navbar (`_navbar.php`) with main menus, member login state, bookmark basket badge, language selector
- Search form (`_search-form.php`) — Vue.js 2 with keyword input, search-by filter buttons, advanced search modal trigger, recent search history
- Topic category grid (5 categories) + Topic modal (10 Dewey categories with icon images)
- Collections: Popular, Latest, Random (via `classic.php` helper functions)
- Legacy Vue components: `collection`, `group-subject`, `group-member`

**Next.js Target**: `app/page.tsx`

**Components**:
- `<Navbar>` — shadcn `NavigationMenu`, `DropdownMenu`, `Button`
- `<SearchForm>` — shadcn `Input`, `Button`, custom filter buttons
- `<TopicGrid>` — CSS grid with category cards
- `<TopicModal>` — shadcn `Dialog`
- `<Bibliocollection>` — shadcn `Card` grid with cover images, titles, authors
- `<AdvancedSearchModal>` — shadcn `Dialog` with form fields

---

### 2. Search Results Page

**PHP Source**: `template/default/parts/_result-search.php`

**Key Sections**:
- Bootstrap grid: `col-md-3` filter sidebar, `col-md-9` results area
- Sort dropdown (relevance, title, year, etc.)
- List/Grid view toggle with masonry layout
- Biblio list items via `biblio_list_template.php` — list/grid dual mode, cover images, title links, author buttons, availability status, action buttons (MARC download, cite, add to basket)

**Next.js Target**: `app/search/page.tsx`

**Components**:
- `<SearchNavbar>` — top bar with search info
- `<FilterSidebar>` — shadcn `Checkbox`, `Select`, `Accordion`
- `<SortToolbar>` — shadcn `Select`, `ToggleGroup` for list/grid
- `<BiblioGrid>` / `<BiblioList>` — shadcn `Card` or custom list item
- `<Pagination>` — shadcn custom or simple prev/next

---

### 3. Bibliographic Detail Page

**PHP Source**: `template/default/detail_template.php` + `template/lightweight/detail_template.php`

**Key Sections**:
- Book cover image
- Title, author, edition, publisher, year, pages
- ISBN/ISSN, dimensions, series
- Availability status per copy (location, call number, status)
- Action buttons: MARC download, citation, add to basket
- Tabbed interface: Details | Availability | Cite
- Visitor counter component (`visitor_template.php`)

**Next.js Target**: `app/detail/[id]/page.tsx`

**Components**:
- `<BookDetail>` — shadcn `Card` with image + details grid
- `<AvailabilityTable>` — shadcn `Table`
- `<ActionButtons>` — shadcn `Button` group
- `<Tabs>` — shadcn `Tabs`
- `<VisitorCounter>` — embedded component

---

### 4. Member Area Page

**PHP Source**: `template/default/parts/_member.php`

**Key Sections**:
- Conditional rendering: if `$is_login` shows main_content (profile, loans, bookmarks, etc.); else shows search form + login prompt
- Member profile info
- Active loans list
- Bookmark basket
- Reading history

**Next.js Target**: `app/member/page.tsx`

**Components**:
- `<MemberLoginForm>` — shadcn `Form` with `Input`, `Button`
- `<MemberProfile>` — shadcn `Card`
- `<LoanList>` — shadcn `Table`
- `<BookmarkBasket>` — shadcn `Card` grid

---

### 5. Libinfo / Help / Librarian / News Pages

**PHP Source**: `template/default/parts/_other.php` (generic page)

**Key Sections**:
- Navbar + search form + content section
- Plain HTML content (about library, help docs, contact info, librarian profile, news list)

**Next.js Target**: `app/libinfo/page.tsx`, `app/help/page.tsx`, `app/news/page.tsx`

**Components**:
- `<ContentPage>` — simple content layout with `<Navbar>`
- `<NewsCard>` — shadcn `Card` with date, title, summary, "Read More" button
- `<NewsList>` — shadcn `Card` grid

---

### 6. Visitor Counter

**PHP Source**: `template/default/visitor_template.php`

**Key Sections**:
- Vue.js app with member ID/institution form
- Axios API calls (not needed for dummy data)
- Quotes display
- Text-to-speech via `speechSynthesis`

**Next.js Target**: `app/visitor/page.tsx` or as embedded component

**Components**:
- `<VisitorForm>` — shadcn `Input`, `Button`
- `<QuotesDisplay>` — shadcn `Card`
- `<TextToSpeech>` — simple button with Web Speech API

---

### 7. Login Page

**PHP Source**: `template/default/login_template.inc.php`

**Key Sections**:
- Login form with username/password
- Facility/institution login option
- "I'm not a member" link for guest access

**Next.js Target**: `app/login/page.tsx`

**Components**:
- `<LoginForm>` — shadcn `Form`, `Input`, `Button`, `Card`

---

## Component Inventory & Shadcn Equivalents

| the legacy system Concept | Next.js / Shadcn | Notes |
|---|---|---|
| Navbar with dropdowns | `NavigationMenu`, `DropdownMenu`, `Button` | From `@/components/ui/` |
| Search input | `Input` | With `Search` icon from Hugeicons |
| Search-by filter buttons | `ToggleGroup` / custom `Button` | ALL, Author, Subject, ISBN/ISSN |
| Advanced search modal | `Dialog` + `Form` | Title, Author, Subject, ISBN, Year (Input), Location/GMD/Type (Select) |
| Topic category grid | CSS Grid + `Card` | 5 items on home, 10 in modal |
| Biblio list item | Custom component or `Card` | List/Grid toggle, cover, title, author, status, actions |
| Sort dropdown | `Select` | Relevance, Title, Year, Newest |
| List/Grid toggle | `ToggleGroup` | Two icons (list, grid) |
| Availability table | `Table` | Copy location, call number, status |
| Action buttons | `Button` | MARC download, Cite, Add to basket |
| Tabbed interface | `Tabs` | Details \| Availability \| Cite |
| Filter sidebar | `Accordion` + `Checkbox` | Collapsible filter sections |
| Pagination | Custom or `Button` group | Prev/Next or numbered |
| Login form | `Form` + `Input` + `Button` + `Card` | Username, password, facility |
| Visitor counter | Custom component | Form + quotes + TTS |
| Bookmark basket badge | `Badge` | Show count on navbar |
| Language selector | `Select` or `DropdownMenu` | EN / ID toggle |
| Dark mode toggle | `Switch` or button | From theme-provider |
| News card | `Card` | Date, title, summary, Read More |
| Modal (footer social) | `Dialog` trigger via button | Facebook/Twitter/etc links |
| Chat system button | `Button` + dialog | Floating chat button |

---

## Dummy Data Schema

All data will be TypeScript files in `lib/data/` or `lib/mock/`.

### Bibliographic Record (Biblio)

```typescript
export interface Biblio {
  id: string;              // biblioID
  title: string;           // original title
  edition: string;         // e.g. "1st ed."
  isbn: string;
  issn: string;
  publisher: string;
  publishYear: number;
  pages: number;
  dimensions: string;      // e.g. "24cm"
  series: string;
  language: string;
  coverImage: string;      // URL or placeholder
  gmd: string;             // General Material Description
  subjects: Subject[];
  authors: Author[];
  isbiblios: boolean;      // true for biblio records

  // Availability
  totalCopies: number;
  availableCopies: number;
  availability: Availability[];

  // Collections
  collectionType: string;
  classification: string;  // e.g. "004.13"
  location: Location;

  // UI helpers
  shortSynopsis: string;
  listDisplayMode: 'grid' | 'list';
}
```

### Author

```typescript
export interface Author {
  id: string;              // masterFileID
  name: string;            // e.g. "Doe, John"
  role: string;            // "author", "editor", "translator"
}
```

### Subject

```typescript
export interface Subject {
  id: string;              // keywordID
  term: string;            // "Computer Science"
  deweyClass: string;      // "004"
}
```

### Availability (per copy)

```typescript
export interface Availability {
  copyId: string;          // itemID
  location: string;        // "Circulation Desk"
  callNumber: string;      // "004.13 DOEx"
  status: 'available' | 'borrowed' | 'reserved' | 'lost';
  dueDate?: string;        // ISO date string
}
```

### Location

```typescript
export interface Location {
  name: string;            // "Main Library"
  room: string;            // "Room 101"
}
```

### Navigation Menu

```typescript
export interface NavMenu {
  label: string;            // "Home", "LibInfo", "News", etc.
  href: string;             // "/", "/libinfo"
  icon: string;             // icon name for Hugeicons
  subMenus?: NavMenu[];
}
```

### Search

```typescript
export interface SearchResult {
  query: string;
  totalResults: number;
  results: Biblio[];
  sortBy: 'relevance' | 'title' | 'year' | 'newest';
  viewMode: 'grid' | 'list';
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
```

### Member

```typescript
export interface Member {
  id: string;              // userID
  memberId: string;        // e.g. "M001"
  name: string;
  email: string;
  phone: string;
  address: string;
  isLoggedIn: boolean;
  loans: Loan[];
  bookmarks: Biblio[];
  readingHistory: Biblio[];
}

export interface Loan {
  id: string;
  biblio: Biblio;
  checkoutDate: string;     // ISO date
  dueDate: string;          // ISO date
  isOverdue: boolean;
}
```

### Visitor Counter

```typescript
export interface VisitorData {
  visitorCount: number;
  quote: string;
  author: string;
  quotes: { text: string; author: string }[];
}

export interface VisitorForm {
  memberId: string;
  institution: string;
}
```

### News

```typescript
export interface NewsItem {
  id: string;
  date: string;            // formatted via Intl
  title: string;
  summary: string;
  slug: string;
}
```

### Topic Categories (Dewey)

```typescript
export interface TopicCategory {
  deweyClass: string;      // "0", "1", "2" ... "9"
  label: string;           // "General Works", "Religion", etc.
  icon: string;            // icon name / emoji
  color: string;           // CSS color class
  count: number;           // number of biblios in category
}
```

---

## Next.js File / Folder Structure

```
juniper-library/
├── app/
│   ├── layout.tsx          # RootLayout (already exists)
│   ├── page.tsx            # Home page (refactor starter)
│   ├── globals.css         # OKLCH palette (already exists)
│   │
│   ├── search/
│   │   └── page.tsx        # Search results
│   │
│   ├── detail/
│   │   └── [id]/
│   │       └── page.tsx    # Bibliographic detail
│   │
│   ├── member/
│   │   └── page.tsx        # Member area (login-gated)
│   │
│   ├── libinfo/
│   │   └── page.tsx        # About / library info
│   │
│   ├── help/
│   │   └── page.tsx        # Help docs
│   │
│   ├── news/
│   │   └── page.tsx        # News list + detail
│   │
│   ├── visitor/
│   │   └── page.tsx        # Visitor counter / quotes
│   │
│   └── login/
│       └── page.tsx        # Member login form
│
├── components/
│   ├── ui/                 # Shadcn UI components (already started)
│   ├── layout/
│   │   ├── navbar.tsx      # Top navbar
│   │   ├── footer.tsx      # Footer with social links
│   │   └── theme-toggle.tsx  # Dark/light mode switch
│   ├── search/
│   │   ├── search-form.tsx    # Main search input + filters
│   │   ├── filter-sidebar.tsx
│   │   ├── sort-toolbar.tsx
│   │   ├── advanced-search-modal.tsx
│   │   └── view-toggle.tsx    # Grid/list toggle
│   ├── biblio/
│   │   ├── biblio-card.tsx      # Grid card
│   │   ├── biblio-list-item.tsx # List item
│   │   ├── biblio-grid.tsx
│   │   └── biblio-list.tsx
│   ├── detail/
│   │   ├── book-detail.tsx
│   │   ├── availability-table.tsx
│   │   ├── action-buttons.tsx
│   │   └── detail-tabs.tsx     # Shadcn Tabs
│   ├── member/
│   │   ├── member-login-form.tsx
│   │   ├── member-profile.tsx
│   │   ├── loan-table.tsx
│   │   └── bookmark-basket.tsx
│   ├── misc/
│   │   ├── topic-grid.tsx      # Dewey category cards
│   │   ├── topic-modal.tsx     # Shadcn Dialog
│   │   ├── news-card.tsx
│   │   ├── news-list.tsx
│   │   ├── visitor-counter.tsx
│   │   ├── visitor-form.tsx
│   │   └── chat-button.tsx     # Floating chat
│   └── icons/
│       └── icon-mapping.tsx   # Hugeicons name mappings
│
├── lib/
│   ├── utils.ts            # cn() helper (already exists)
│   ├── data/
│   │   ├── biblios.ts      # Dummy biblio records
│   │   ├── authors.ts
│   │   ├── subjects.ts
│   │   ├── members.ts
│   │   ├── news.ts
│   │   ├── topics.ts
│   │   ├── visitors.ts
│   │   └── nav-menus.ts
│   └── types/
│       ├── biblio.ts
│       ├── member.ts
│       ├── search.ts
│       ├── nav.ts
│       └── visitor.ts
│
└── styles/
    └── tailwind.css        # Additional custom CSS (if needed)
```

This structure keeps Shadcn UI components in `components/ui/` (as generated), domain-specific components in sub-folders under `components/`, and all dummy data with TypeScript interfaces in `lib/`.

---

## Styling Approach

### Color System

The existing `globals.css` uses a full OKLCH palette. The plan will reuse these CSS variables:

| Variable | Purpose |
|---|---|
| `--background` / `--foreground` | Page background/text |
| `--card` / `--card-foreground` | Card backgrounds |
| `--primary` / `--primary-foreground` | Primary brand color |
| `--secondary` / `--secondary-foreground` | Secondary elements |
| `--muted` / `--muted-foreground` | Subtle backgrounds |
| `--border` / `--input` / `--ring` | Form controls and focus rings |
| `--destructive` | Error/warning states |

### Layout

- **Container**: Use a responsive `max-w-7xl mx-auto px-4` wrapper
- **Grid**: Tailwind CSS Grid for search results (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`), biblio cards, topic grid
- **Flex**: Flexbox for navbar alignment, action button groups
- **Spacing**: Use Tailwind spacing scale (`gap-4`, `p-6`, etc.)

### Typography

- **Headings**: Inter font (already configured in layout via `--font-sans`)
- **Body**: `text-sm`, `text-xs/relaxed` (matches button sizing)
- **Line height**: Use `leading-relaxed`, `leading-snug` for readability

### Responsiveness

| Breakpoint | Width | Target |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Wide desktop |

Key responsive patterns:
- Navbar collapses to `sm` breakpoint with mobile menu
- Search results: 1 column mobile → 4 columns desktop
- Topic grid: 2 columns mobile → 5 columns desktop
- Filter sidebar becomes accordion on mobile

### Animation / Transitions

- Use Tailwind `transition-all` for hover states (matches button component style)
- Use `@tailwindcss/animate` (via `tw-animate-css`) for any shadcn dialog/modal transitions
- Keep animations minimal for performance

---

## Phased Implementation

### Phase 1: Foundation (1-2 days)

- [ ] Create `docs/` directory and this plan document
- [ ] Set up `lib/data/` with all dummy data files (biblios, authors, members, news, topics, visitors, nav-menus)
- [ ] Set up `lib/types/` with all TypeScript interfaces
- [ ] Verify `lib/utils.ts` (cn helper), `app/globals.css` (color vars), `app/layout.tsx` (ThemeProvider) are intact
- [ ] Install any missing Shadcn components (`Card`, `Table`, `Dialog`, `Form`, `Tabs`, `Badge`, `NavigationMenu`, `DropdownMenu`, `Select`, `Input`)

### Phase 2: Core Layout (1 day)

- [ ] Build `<Navbar>` — shadcn NavigationMenu + DropdownMenu, bookmark badge, language selector, dark mode toggle
- [ ] Build `<Footer>` — logo, about text, search form, social buttons, copyright
- [ ] Create shared layout wrapper component used by all pages
- [ ] Set up route structure (`app/search/`, `app/detail/[id]/`, `app/member/`, etc.)

### Phase 3: Home Page (1-2 days)

- [ ] Build `<SearchForm>` — input + search-by buttons + advanced search trigger
- [ ] Build `<TopicGrid>` — 5 Dewey category cards with icons
- [ ] Build `<TopicModal>` — 10 categories in shadcn Dialog
- [ ] Build `<BiblioCollection>` — reusable grid/list component
- [ ] Wire up `app/page.tsx` with Popular / Latest / Random sections
- [ ] Add Vue-like interactivity via React state (no Vue needed)

### Phase 4: Search Results (1-2 days)

- [ ] Build `<FilterSidebar>` — collapsible filters (author, subject, year, location, etc.)
- [ ] Build `<SortToolbar>` — sort Select + list/grid toggle
- [ ] Implement `<BiblioCard>` and `<BiblioListItem>` components (dual-mode)
- [ ] Wire up `app/search/page.tsx` with dummy results + URL params handling
- [ ] Add pagination component

### Phase 5: Detail Page (1-2 days)

- [ ] Build `<BookDetail>` — cover, title/author, metadata grid
- [ ] Build `<AvailabilityTable>` — copies with status
- [ ] Build `<ActionButtons>` — MARC download, Cite, Add to basket
- [ ] Build `<DetailTabs>` — Details / Availability / Cite tabs (shadcn Tabs)
- [ ] Embed `<VisitorCounter>` component
- [ ] Wire up `app/detail/[id]/page.tsx` with dynamic route + dummy data

### Phase 6: Member Area (1 day)

- [ ] Build `<MemberLoginForm>` with validation
- [ ] Build `<MemberProfile>`, `<LoanTable>`, `<BookmarkBasket>`
- [ ] Handle conditional rendering (logged in vs not)
- [ ] Wire up `app/member/page.tsx`

### Phase 7: Supporting Pages (1 day)

- [ ] Build `<NewsCard>` and `<NewsList>`
- [ ] Build `<VisitorCounter>` — form + quotes + TTS via `speechSynthesis`
- [ ] Build `<LoginForm>`
- [ ] Build simple `<ContentPage>` for Libinfo / Help
- [ ] Wire up all remaining routes

### Phase 8: Polish & Finalization (1 day)

- [ ] Responsive testing across breakpoints
- [ ] Dark/light mode toggle fully functional
- [ ] Ensure all icons use Hugeicons consistently
- [ ] Add hover/active states matching button component style
- [ ] Clean up unused code
- [ ] Update README or add a demo script

---

## Key Decisions

1. **No state management library** — React built-in state + context for simple things (e.g., theme, view mode)
2. **No API layer** — dummy data only; can swap to real API later by replacing `lib/data/*` imports
3. **Routing** — Next.js file-based routing instead of PHP query params; `?p=show_detail&id=X` → `/detail/X`
4. **Vue replacement** — All Vue 2.x logic replaced with React hooks (`useState`, `useEffect`)
5. **jQuery replacement** — All jQuery interactions ($().click(), $.ajax()) replaced with native React event handlers
6. **Masonry layout** — Replaced with CSS Grid columns (no external dependency needed for dummy data)
7. **Shadcn primitives** — Base UI components from `@base-ui/react` as used in existing button component

---

## Out of Scope

- Admin backend UI (`admin/` areas)
- Live database integration
- Authentication/session management with real backend
- Real search/indexing engine integration
- Print/export functionality (MARC download is placeholder only)
- Chat system / real-time features
- The `lightweight` mobile theme as a separate build (can be responsive design within the same app)

1. **Home** (`?p=home` / root) → `app/page.tsx`
2. **Search Results** (`?search=search`) → `app/search/page.tsx`
3. **Bibliographic Detail** (`?p=show_detail&id=X`) → `app/detail/[id]/page.tsx`
4. **Member Area** (`?p=member`) → `app/member/page.tsx`
5. **Librarian / Libinfo / Help / News** (`?p=libinfo` etc.) → `app/libinfo/page.tsx`
6. **News List** (news section) → `app/news/page.tsx`
7. **Visitor Counter** → `app/visitor/page.tsx`
8. **Login** → `app/login/page.tsx`
9. **Advanced Search Modal** → Component on search page
10. **Topic Category Modal** → Component on home/detail pages