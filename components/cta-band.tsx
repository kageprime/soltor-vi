import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaBand({
  title,
  body,
  primary = { href: '/contact#quote', label: 'Request a quote' },
  secondary = { href: '/contact', label: 'Contact the desk' },
  image = '/images/offshore-platform.png',
}: {
  title: string
  body: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Image src={image} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
      <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
        <div className="md:col-span-7">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
          <Link
            href={primary.href}
            className="group inline-flex h-13 items-center justify-center gap-3 bg-gold px-7 text-sm font-semibold text-navy-deep transition-colors hover:bg-white"
          >
            {primary.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href={secondary.href}
            className="inline-flex h-13 items-center justify-center border border-white/30 px-7 text-sm font-medium transition-colors hover:border-white hover:bg-white/10"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
