import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand } from '@/components/cta-band'
import { PageHero, SectionHeading } from '@/components/page-hero'
import { equipment, featuredSupply, petroleumProducts } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Energy & equipment',
  description:
    'Crude oil, AGO diesel, PMS, Jet A-1, LPG, fuel oil and petrochemicals — plus API-certified pumps, valves, compressors, generators and drilling equipment.',
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Energy & equipment"
        eyebrow="Oil & gas"
        title="Energy products and oilfield equipment."
        description="Petroleum commodities supplied under international trade terms, and certified equipment procured directly from OEM partners."
        image="/images/terminal-night.png"
      />

      <section>
        <div className="container-x py-20 md:py-28">
          <SectionHeading
            align="split"
            eyebrow="Petroleum products"
            title="Crude, refined and specialty products."
            description="Crude oil and refined products sourced from verified refineries and allocations, supplied FOB, CIF or CFR."
          />
          <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {petroleumProducts.map((p) => (
              <li key={p.title} className="group bg-background">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <p className="eyebrow text-gold">{p.tag}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-deep text-white">
        <div className="container-x py-16 md:py-20">
          <p className="eyebrow text-gold">Current allocations</p>
          <ul className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {featuredSupply.map((s) => (
              <li key={s.product} className="bg-navy-deep p-6">
                <p className="font-semibold">{s.product}</p>
                <p className="mt-3 font-mono text-xs text-white/55">{s.spec}</p>
                <p className="font-mono text-xs text-white/55">{s.terms}</p>
                <p className={s.status === 'Available' ? 'mt-4 text-xs font-medium text-gold' : 'mt-4 text-xs font-medium text-white/70'}>
                  {s.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="equipment" className="scroll-mt-32 bg-secondary">
        <div className="container-x py-20 md:py-28">
          <SectionHeading
            align="split"
            eyebrow="Oilfield equipment"
            title="Certified machinery for upstream and industry."
            description="New and refurbished oilfield and industrial equipment procured to API standards from leading OEM partners."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((e) => (
              <li key={e.title} className="flex flex-col bg-background">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={e.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-navy">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
                  <p className="mt-5 border-t pt-4 font-mono text-xs text-muted-foreground">{e.cond}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Need a specific grade or unit?"
        body="Send us the specification, quantity, destination and Incoterms — we’ll return a formal quote."
        image="/images/hero-tanker.png"
      />
    </>
  )
}
