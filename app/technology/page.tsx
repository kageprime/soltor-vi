import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBand } from '@/components/cta-band'
import { PageHero, SectionHeading } from '@/components/page-hero'
import { techProducts, techServices } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Technology & network contracts',
  description:
    'Enterprise servers, networking, security and CCTV — plus structured cabling, fibre, data centre build and maintenance contracts.',
}

const gallery = [
  { src: '/images/tech-rack.jpg', alt: 'Enterprise server rack' },
  { src: '/images/tech-network.jpg', alt: 'Network switching equipment' },
  { src: '/images/tech-cctv.jpg', alt: 'CCTV surveillance camera' },
]

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        crumb="Technology"
        eyebrow="Technology & networks"
        title="Enterprise infrastructure, specified and delivered."
        description="Hardware supplied to specification and networks installed turnkey — from server rooms to campus-wide fibre backbones."
        image="/images/stock-serverroom.webp"
      />

      <section>
        <div className="container-x py-20 md:py-28">
          <SectionHeading
            align="split"
            eyebrow="Technology products"
            title="The hardware behind critical operations."
            description="Sourced from Dell, HP, Lenovo, Cisco, Juniper, Aruba and other leading manufacturers."
          />
          <ul className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
            {techProducts.map((t) => (
              <li key={t.code} className="border-b border-r p-7 transition-colors hover:bg-secondary">
                <p className="font-mono text-xs text-gold">{t.code}</p>
                <h3 className="mt-6 text-lg font-semibold text-navy">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Technology gallery" className="container-x grid gap-4 pb-20 md:grid-cols-3 md:pb-28">
        {gallery.map((g) => (
          <div key={g.src} className="relative aspect-[4/3] overflow-hidden">
            <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section id="services" className="scroll-mt-32 bg-navy-deep text-white">
        <div className="container-x py-20 md:py-28">
          <p className="eyebrow text-gold">Network contracts</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Turnkey installation and long-term support.
          </h2>
          <ol className="mt-14 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {techServices.map((s, i) => (
              <li key={s.title} className="bg-navy-deep p-8">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Scope your next infrastructure project."
        body="Share your site, users and requirements — we’ll propose hardware, design and installation in one contract."
        image="/images/stock-network.webp"
      />
    </>
  )
}
