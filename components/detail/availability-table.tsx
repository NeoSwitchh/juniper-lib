import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Biblio } from "@/lib/types/biblio"

const statusVariant = (status: string) => {
  switch (status) {
    case "available":
      return "default"
    case "borrowed":
      return "secondary"
    case "reserved":
      return "outline"
    case "lost":
      return "destructive"
    default:
      return "secondary"
  }
}

const statusColor = (status: string) => {
  switch (status) {
    case "available":
      return "text-green-600"
    case "borrowed":
      return "text-amber-600"
    case "reserved":
      return "text-blue-600"
    case "lost":
      return "text-red-600"
    default:
      return "text-muted-foreground"
  }
}

export function AvailabilityTable({ biblio }: { biblio: Biblio }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold">Availability</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Copy ID</TableHead>
              <TableHead className="text-xs">Location</TableHead>
              <TableHead className="text-xs">Call Number</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {biblio.availability.map((copy) => (
              <TableRow key={copy.copyId}>
                <TableCell className="text-xs">{copy.copyId}</TableCell>
                <TableCell className="text-xs">{copy.location}</TableCell>
                <TableCell className="text-xs">{copy.callNumber}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(copy.status)} className="text-xs">
                    {copy.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {copy.dueDate ? (
                    <span className={statusColor(copy.status)}>
                      {new Date(copy.dueDate).toLocaleDateString()}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
