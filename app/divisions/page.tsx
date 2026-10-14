import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero, SectionHeading } from '@/components/page-hero'
import { divisions, stats, values } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Who we are',
  description:
    'Five integrated business divisions spanning oil & gas products, oilfield equipment, enterprise technology, network contracts and general contracts.',
}

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        crumb="Who we are"
        eyebrow="Our business"
        title="An integrated trading and contracting group."
        description="Soltor Capital operates five business divisions, each backed by specialist partners and a single standard of compliance and delivery."
        image="/images/offshore-platform.png"
      />

      <section className="border-b">
        <div className="container-x grid gap-px bg-border py-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-2 py-10 sm:px-8">
              <p className="text-5xl font-semibold tracking-tight text-navy">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="container-x py-20 md:py-28">
          <SectionHeading eyebrow="Divisions" title="What each division delivers." />
          <ol className="mt-16 space-y-20 md:space-y-28">
            {divisions.map((d, i) => (
              <li key={d.id} id={`division-${d.id}`} className="grid scroll-mt-32 items-center gap-10 md:grid-cols-12">
                <div className={cn('relative aspect-[16/10] overflow-hidden md:col-span-7', i % 2 === 1 && 'md:order-2')}>
                  <Image src={d.image} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
                </div>
                <div className="md:col-span-5">
                  <p className="font-mono text-sm text-gold">Division {d.id}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">{d.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-foreground/80">{d.summary}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{d.detail}</p>
                  <Link href={d.href} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                    Explore {d.title}
                    <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-x py-20 md:py-28">
          <SectionHeading eyebrow="Our principles" title="How we do business." />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} className="border-t-2 border-navy bg-background p-8">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl font-semibold text-navy">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Partner with a single, credible counterparty."
        body="Tell us what you need to source — our desk will route it to the right division."
      />
    </>
  )
}
