import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/enquiry-form'
import { PageHero, SectionHeading } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Become a supplier',
  description:
    'Join the Soltor Capital supply network — refiners, OEM manufacturers, technology distributors and logistics partners.',
}

const steps = [
  { title: 'Register', body: 'Submit your company profile, product categories and capabilities.' },
  { title: 'Verification', body: 'We complete KYC, sanctions screening and quality documentation review.' },
  { title: 'Onboarding', body: 'Approved partners are added to our sourcing network for live enquiries.' },
  { title: 'Supply', body: 'Receive qualified RFQs and fulfil contracts under agreed terms.' },
]

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        crumb="Suppliers"
        eyebrow="Supplier network"
        title="Grow with a global procurement partner."
        description="We work with refiners, manufacturers, distributors and logistics providers who share our standards for quality and compliance."
        image="/images/stock-shipping.jpg"
      />

      <section className="border-b">
        <div className="container-x py-20 md:py-28">
          <SectionHeading eyebrow="Process" title="From registration to first contract." />
          <ol className="mt-14 grid gap-px bg-border md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-background p-8">
                <span className="text-5xl font-semibold tracking-tight text-gold">{i + 1}</span>
                <h3 className="mt-6 text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Register"
              title="Supplier registration."
              description="Tell us about your company and what you supply. Our procurement team will be in touch."
            />
          </div>
          <div className="bg-background p-6 md:p-10 lg:col-span-8">
            <EnquiryForm
              subject="Supplier registration"
              selectLabel="Supply category"
              options={[
                'Petroleum products',
                'Oilfield equipment',
                'Technology hardware',
                'Network & installation services',
                'Logistics & shipping',
                'Other',
              ]}
              messageLabel="Company profile"
              messagePlaceholder="Products, certifications, countries served, capacity…"
              submitLabel="Submit registration"
            />
          </div>
        </div>
      </section>
    </>
  )
}
