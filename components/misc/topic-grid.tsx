import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { homeTopics } from "@/lib/data/topics"

export function TopicGrid() {
  return (
    <section className="py-8">
      <h2 className="mb-6 text-lg font-semibold">Browse by Category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {homeTopics.map((topic) => (
          <Card key={topic.deweyClass} className="group transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="text-3xl">{topic.icon}</div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-medium">
                {topic.label}
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {topic.count} items
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
