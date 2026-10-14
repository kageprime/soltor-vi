import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/page-hero'
import { divisions } from '@/lib/site'
import { cn } from '@/lib/utils'

export function DivisionsGrid() {
  return (
    <section className="bg-secondary">
      <div className="container-x py-20 md:py-28">
        <SectionHeading
          align="split"
          eyebrow="What we do"
          title="Five divisions. One integrated platform."
          description="Sourcing petroleum commodities, precision oilfield machinery, enterprise technology, network infrastructure and high-value contracts — under one compliance standard."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-6">
          {divisions.map((d, i) => (
            <li
              key={d.id}
              className={cn(i < 2 ? 'md:col-span-3' : 'md:col-span-2')}
            >
              <Link
                href={d.href}
                className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden bg-navy-deep p-7 text-white md:min-h-[26rem]"
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-10 object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent"
                />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-gold">{d.id}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{d.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{d.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Learn more
                  <ArrowUpRight
                    className="size-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
