import { MainLayout } from "@/components/layout/main-layout"

export default function LibinfoPage() {
  return (
    <MainLayout>
      <article className="prose dark:prose-invert max-w-4xl">
        <h1>Library Information</h1>

        <h2>About the Library</h2>
        <p>
          The Main Library serves the greater Cambridge community with a
          collection of over 50,000 volumes spanning multiple disciplines.
          Our mission is to provide access to information and foster lifelong
          learning for all community members.
        </p>

        <h2>Hours</h2>
        <ul>
          <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
          <li>Saturday: 9:00 AM - 5:00 PM</li>
          <li>Sunday: 1:00 PM - 5:00 PM</li>
        </ul>

        <h2>Location</h2>
        <p>
          123 Library Street<br />
          Cambridge, MA 02138<br />
          Phone: (555) 123-4567<br />
          Email: info@library.example
        </p>

        <h2>Membership</h2>
        <p>
          Library cards are available to all Cambridge residents. Sign up at
          the circulation desk with a valid photo ID and proof of address.
        </p>
      </article>
    </MainLayout>
  )
}
