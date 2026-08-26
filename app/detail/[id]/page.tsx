import { notFound } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { BookDetail } from "@/components/detail/book-detail"
import { AvailabilityTable } from "@/components/detail/availability-table"
import { ActionButtons } from "@/components/detail/action-buttons"
import { DetailTabs } from "@/components/detail/detail-tabs"
import { VisitorCounter } from "@/components/misc/visitor-counter"
import { biblioMap } from "@/lib/data/biblios"

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const biblio = biblioMap[id]

  if (!biblio) {
    notFound()
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <ActionButtons />
      </div>

      <BookDetail biblio={biblio} />

      <DetailTabs biblio={biblio} />

      <AvailabilityTable biblio={biblio} />

      <div className="mt-8">
        <VisitorCounter />
      </div>
    </MainLayout>
  )
}
