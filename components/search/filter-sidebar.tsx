"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const authors = ["Doe, John", "Smith, Jane", "Johnson, Robert", "Williams, Emily"]
const subjects = ["Computer Science", "Programming", "Databases", "Artificial Intelligence", "Mathematics"]
const years = ["2024", "2023", "2022", "2021", "2020"]

export function FilterSidebar() {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Authors</h3>
        <div className="space-y-2">
          {authors.map((author) => (
            <div key={author} className="flex items-center gap-2">
              <Checkbox id={`author-${author}`} />
              <Label htmlFor={`author-${author}`} className="text-sm">
                {author}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-semibold">Subjects</h3>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center gap-2">
              <Checkbox id={`subject-${subject}`} />
              <Label htmlFor={`subject-${subject}`} className="text-sm">
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-semibold">Publish Year</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-semibold">Location</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            <SelectItem value="main">Main Library</SelectItem>
            <SelectItem value="reference">Reference Desk</SelectItem>
            <SelectItem value="study">Study Area</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-semibold">Material Type</h3>
        <div className="space-y-2">
          {["Book", "Journal", "Digital"].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox id={`gmd-${type}`} />
              <Label htmlFor={`gmd-${type}`} className="text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
