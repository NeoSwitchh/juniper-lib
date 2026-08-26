import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Member } from "@/lib/types/member"

export function MemberProfile({ member }: { member: Member }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Member ID:</span>
            <span className="ml-2 font-medium">{member.memberId}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Name:</span>
            <span className="ml-2 font-medium">{member.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <span className="ml-2 font-medium">{member.email}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span>
            <span className="ml-2 font-medium">{member.phone}</span>
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Address:</span>
            <span className="ml-2 font-medium">{member.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
