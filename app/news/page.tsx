import { MainLayout } from "@/components/layout/main-layout"
import { NewsList } from "@/components/misc/news-list"

export default function NewsPage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Library News</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Stay up to date with the latest announcements and events.
        </p>
      </div>

      <NewsList />
    </MainLayout>
  )
}
