import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Member } from "@/lib/types/member"

export function LoanTable({ member }: { member: Member }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold">Active Loans</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Title</TableHead>
              <TableHead className="text-xs">Checkout Date</TableHead>
              <TableHead className="text-xs">Due Date</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {member.loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>
                  <Link href={`/detail/${loan.biblio.id}`} className="text-sm font-medium hover:underline">
                    {loan.biblio.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {loan.biblio.authors}
                  </p>
                </TableCell>
                <TableCell className="text-xs">
                  {new Date(loan.checkoutDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-xs">
                  {new Date(loan.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {loan.isOverdue ? (
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
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
