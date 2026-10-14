import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/page-hero'
import { projects } from '@/lib/site'

export function ProjectsPreview() {
  return (
    <section>
      <div className="container-x py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Selected work" title="Delivered across markets." />
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy">
            All projects
            <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {projects.slice(0, 3).map((p) => (
            <li key={p.title}>
              <article>
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image src={p.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute left-0 top-0 bg-gold px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-navy-deep">
                    {p.category}
                  </span>
                </div>
                <p className="mt-5 font-mono text-xs text-muted-foreground">
                  {p.client} · {p.country}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.scope}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
