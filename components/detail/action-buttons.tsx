import { Button } from "@/components/ui/button"
import {
  BookmarkAdd01Icon,
  File01Icon,
  BookDownloadIcon,
  QuoteDownIcon,
} from "hugeicons-react"

interface ActionButtonsProps {
  biblioId?: string
}

export function ActionButtons({ biblioId }: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" className="gap-1.5">
        <File01Icon className="h-4 w-4" />
        MARC Download
      </Button>
      <Button variant="outline" size="sm" className="gap-1.5">
        <QuoteDownIcon className="h-4 w-4" />
        Cite
      </Button>
      <Button variant="outline" size="sm" className="gap-1.5">
        <BookmarkAdd01Icon className="h-4 w-4" />
        Add to Basket
      </Button>
      <Button variant="outline" size="sm" className="gap-1.5">
        <BookDownloadIcon className="h-4 w-4" />
        Print
      </Button>
    </div>
  )
}
