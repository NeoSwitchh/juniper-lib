import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NewsItem } from "@/lib/types/news"
import { Calendar01Icon, ArrowRight01Icon } from "hugeicons-react"

export function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar01Icon className="h-3 w-3" />
          {new Date(news.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <CardTitle className="text-lg">{news.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{news.summary}</p>
        <Link
          href={`/news/${news.slug}`}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline decoration-primary underline-offset-2"
        >
          Read More
          <ArrowRight01Icon className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  )
}
