import { MainLayout } from "@/components/layout/main-layout"
import { VisitorCounter } from "@/components/misc/visitor-counter"

export default function VisitorPage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Visitor Counter</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your visit details and enjoy a daily library quote.
        </p>
      </div>

      <VisitorCounter />
    </MainLayout>
  )
}
