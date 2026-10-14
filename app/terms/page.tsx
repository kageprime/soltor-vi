import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { contact } from '@/lib/site'

export const metadata: Metadata = { title: 'Terms & Conditions' }

const Email = () => (
  <a href={`mailto:${contact.email}`} className="text-navy underline underline-offset-4">
    {contact.email}
  </a>
)

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="The rules for using our website and engaging Soltor Capital for trading, procurement, technology, and contracting services. Last updated: September 2026."
      sections={[
        { heading: '1. About Soltor Capital', body: <p>Soltor Capital is an international trading, procurement, technology, and contracting company serving global markets. Contact: <Email /> · {contact.phone}.</p> },
        { heading: '2. Use of this website', body: <p>You agree to use this site for lawful business enquiries only. You must not misuse the site, attempt unauthorised access, submit false information, or interfere with its operation.</p> },
        { heading: '3. Quotes, products & services', body: <p>Product listings, specifications, and availability shown on this site are indicative and subject to confirmation. A formal quote, proforma invoice, or signed contract defines the final price, specification, delivery terms (Incoterms), lead time, and payment terms. All petroleum, equipment, and technology supply is subject to availability, export controls, sanctions compliance, and manufacturer confirmation.</p> },
        { heading: '4. Orders & contracts', body: <p>No binding order exists until both parties sign a written contract or Soltor Capital issues written acceptance. Delivery timelines run from receipt of agreed advance payment and completed documentation (including KYC where required).</p> },
        { heading: '5. Pricing & payment', body: <p>Unless stated otherwise, prices exclude taxes, duties, freight, and insurance, which are set out in the applicable quote or contract. Late payments may attract interest and suspend further deliveries.</p> },
        { heading: '6. Compliance', body: <p>We operate under strict global trade, sanctions, export-control, and anti-bribery requirements. We may decline, suspend, or cancel any enquiry or order that would breach applicable laws or internal compliance checks.</p> },
        { heading: '7. Intellectual property', body: <p>All site content, logos, images, and copy are owned by Soltor Capital or its licensors. You may not copy, reproduce, or redistribute them without prior written permission.</p> },
        { heading: '8. Limitation of liability', body: <p>To the maximum extent permitted by law, Soltor Capital is not liable for indirect or consequential losses arising from use of this site. Nothing in these terms limits liability that cannot be limited by law.</p> },
        { heading: '9. Privacy', body: <p>How we handle your personal data is set out in our <Link href="/privacy" className="text-navy underline underline-offset-4">Privacy Policy</Link>.</p> },
        { heading: '10. Changes & contact', body: <p>We may update these terms from time to time; the version published here applies. Questions: <Email /> · {contact.phone} · {contact.hours}.</p> },
      ]}
    />
  )
}
