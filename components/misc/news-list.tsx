import { NewsCard } from "@/components/misc/news-card"
import { NewsItem } from "@/lib/types/news"
import { newsItems } from "@/lib/data/news"

export function NewsList({ items = newsItems }: { items?: NewsItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  )
}
