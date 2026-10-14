import type { Metadata } from 'next'
import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import { EnquiryForm } from '@/components/enquiry-form'
import { PageHero, SectionHeading } from '@/components/page-hero'
import { contact, divisions } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact & quotes',
  description: 'Contact the Soltor Capital trading desk or request a formal quote.',
}

const channels = [
  { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: 'Phone', value: contact.phone, href: contact.phoneHref },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Message the desk', href: contact.whatsappHref },
  { icon: Clock, label: 'Hours', value: contact.hours },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Trading desk"
        title="Talk to our team."
        description="Enquiries, formal quotes and partnership discussions — reach the desk directly or send your requirements below."
        image="/images/people-engineers.png"
      />

      <section className="border-b">
        <ul className="container-x grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => {
            const Icon = c.icon
            const content = (
              <>
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <p className="eyebrow mt-6 text-muted-foreground">{c.label}</p>
                <p className="mt-2 font-semibold text-navy">{c.value}</p>
              </>
            )
            return (
              <li key={c.label} className="bg-background">
                {c.href ? (
                  <a href={c.href} className="block p-8 transition-colors hover:bg-secondary">
                    {content}
                  </a>
                ) : (
                  <div className="p-8">{content}</div>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section id="quote" className="scroll-mt-32 bg-secondary">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Request a quote"
              title="Send your requirements."
              description="Include specification, quantity, destination and preferred Incoterms. Quotes are subject to availability, KYC and compliance checks."
            />
          </div>
          <div className="bg-background p-6 md:p-10 lg:col-span-8">
            <EnquiryForm
              subject="Quote request"
              selectLabel="Division"
              options={divisions.map((d) => d.title)}
              submitLabel="Request quote"
            />
          </div>
        </div>
      </section>
    </>
  )
}
