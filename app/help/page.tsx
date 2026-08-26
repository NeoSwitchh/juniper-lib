import { MainLayout } from "@/components/layout/main-layout"

export default function HelpPage() {
  return (
    <MainLayout>
      <article className="prose dark:prose-invert max-w-4xl">
        <h1>Help Center</h1>

        <h2>Frequently Asked Questions</h2>

        <h3>How do I get a library card?</h3>
        <p>
          Visit the circulation desk with a valid photo ID and proof of
          address. Cards are issued free of charge to Cambridge residents.
        </p>

        <h3>How do I borrow books?</h3>
        <p>
          Bring items to the circulation desk. Most materials have a
          21-day loan period and can be renewed online through your account.
        </p>

        <h3>Can I access digital resources?</h3>
        <p>
          Yes! We offer e-books, audiobooks, and research databases.
          Access these through your member account using your Member ID.
        </p>

        <h3>How do I place a hold?</h3>
        <p>
          Search for the item in our catalog, open the detail page, and
          click "Add to Basket." Staff will notify you when the item is ready.
        </p>

        <h2>Need More Help?</h2>
        <p>
          Contact us at info@library.example or call (555) 123-4567.
        </p>
      </article>
    </MainLayout>
  )
}
