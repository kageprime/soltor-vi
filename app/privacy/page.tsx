import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { contact } from '@/lib/site'

export const metadata: Metadata = { title: 'Privacy Policy' }

const Email = () => (
  <a href={`mailto:${contact.email}`} className="text-navy underline underline-offset-4">
    {contact.email}
  </a>
)

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How we collect, use, and protect your information when you contact us or use our services. Last updated: September 2026."
      sections={[
        { heading: '1. Who we are', body: <p>Soltor Capital — international trading, procurement, technology, and contracting. Contact: <Email /> · {contact.phone}.</p> },
        { heading: '2. Data we collect', body: <p>When you use our contact forms, quote requests, supplier registration, phone, WhatsApp, or email, we collect: name, company, email, phone number, message content, and any documents you choose to share (e.g. spec sheets, KYC documents for compliance checks).</p> },
        { heading: '3. How we use your data', body: <p>We use your data to respond to enquiries, prepare quotes, verify suppliers and counterparties, fulfil contracts, maintain business records, and improve our services. We do not sell your personal data.</p> },
        { heading: '4. Sharing', body: <p>We share data only where necessary: with manufacturers, logistics providers, or service partners to fulfil your request; with authorities where required by law, sanctions, or export-control obligations; and with IT providers who host this site and our communications (including live-chat).</p> },
        { heading: '5. Retention & security', body: <p>We keep enquiry and transaction records only as long as needed for business, legal, and compliance purposes, then securely delete or anonymise them. We apply reasonable technical and organisational safeguards, though no internet transmission is fully secure.</p> },
        { heading: '6. Your rights', body: <p>You may request access, correction, or deletion of your personal data, or object to its use for marketing. Email <Email /> with the subject “Privacy Request” and we will respond within a reasonable timeframe.</p> },
        { heading: '7. Cookies & third parties', body: <p>This site uses essential cookies and third-party services (e.g. fonts, live-chat) that may set their own cookies. You can control cookies in your browser settings; blocking some cookies may limit site functionality.</p> },
        { heading: '8. Changes & contact', body: <p>We may update this policy; the version published here applies. Questions: <Email /> · {contact.phone}. See also our <Link href="/terms" className="text-navy underline underline-offset-4">Terms &amp; Conditions</Link>.</p> },
      ]}
    />
  )
}
