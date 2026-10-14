'use client'

import Image from 'next/image'
import { useState } from 'react'
import { projects, type ProjectCategory } from '@/lib/site'
import { cn } from '@/lib/utils'

const filters: ('All' | ProjectCategory)[] = ['All', 'Oil & Gas', 'Technology', 'Networking', 'Procurement']

export function ProjectList() {
  const [active, setActive] = useState<(typeof filters)[number]>('All')
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={cn(
              'h-10 border px-5 text-sm font-medium transition-colors',
              active === f ? 'border-navy bg-navy text-white' : 'bg-background text-foreground/70 hover:border-navy hover:text-navy',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((p) => (
          <li key={p.title}>
            <article>
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-0 top-0 bg-gold px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-navy-deep">
                  {p.category}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy">{p.title}</h3>
              <dl className="mt-3 flex gap-6 font-mono text-xs text-muted-foreground">
                <div>
                  <dt className="sr-only">Client</dt>
                  <dd>{p.client}</dd>
                </div>
                <div>
                  <dt className="sr-only">Country</dt>
                  <dd>{p.country}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.scope}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
