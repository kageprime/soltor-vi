import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredSupply } from '@/lib/site'

export function Hero() {
  const ticker = [...featuredSupply, ...featuredSupply]
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image
        src="/images/hero-tanker.png"
        alt="Crude oil tanker under way at sunset"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-deep to-transparent"
      />

      <div className="container-x flex min-h-[calc(100svh-7.5rem)] flex-col justify-center py-24">
        <p className="eyebrow text-gold">International Trading &amp; Procurement</p>
        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
          Powering progress across global markets.
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/80 md:text-xl">
          Energy products, oilfield equipment, enterprise technology and contracts — delivered
          by one credible partner across West Africa, the Middle East, Europe and Asia.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact#quote"
            className="group inline-flex h-13 items-center justify-center gap-3 bg-gold px-7 text-sm font-semibold text-navy-deep transition-colors hover:bg-white"
          >
            Request a quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/divisions"
            className="inline-flex h-13 items-center justify-center border border-white/30 px-7 text-sm font-medium backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
          >
            Explore what we do
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy-deep/70 backdrop-blur">
        <div className="flex items-stretch">
          <div className="hidden shrink-0 items-center gap-3 border-r border-white/10 px-6 md:flex md:px-10">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-gold" />
            </span>
            <span className="eyebrow text-white/80">Trading desk</span>
          </div>
          <div className="relative flex-1 overflow-hidden" aria-label="Featured supply" role="region">
            <ul className="animate-marquee flex w-max">
              {ticker.map((item, i) => (
                <li
                  key={`${item.product}-${i}`}
                  aria-hidden={i >= featuredSupply.length ? 'true' : undefined}
                  className="flex items-center gap-4 border-r border-white/10 px-8 py-4 font-mono text-xs"
                >
                  <span className="text-white">{item.product}</span>
                  <span className="text-white/50">{item.spec}</span>
                  <span className="text-white/50">{item.terms}</span>
                  <span className={item.status === 'Available' ? 'text-gold' : 'text-white/70'}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
