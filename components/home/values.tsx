import Image from 'next/image'
import { regions, values } from '@/lib/site'

export function Values() {
  return (
    <section className="bg-navy-deep text-white">
      <div className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-gold">Why Soltor Capital</p>
          <blockquote className="mt-6">
            <p className="text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              {'“One credible partner across energy, equipment, technology and contracts.”'}
            </p>
            <footer className="mt-6 font-mono text-xs text-white/50">— The Soltor Capital standard</footer>
          </blockquote>

          <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {values.map((v, i) => (
              <li key={v.title} className="grid grid-cols-[3rem_1fr] gap-4 py-7">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:flex-1">
            <Image
              src="/images/people-engineers.png"
              alt="Engineers reviewing project data at an industrial energy facility"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-white/5 p-7">
            <h3 className="eyebrow text-white/60">Global presence</h3>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2">
              {regions.map((r) => (
                <li key={r.name} className="border-l-2 border-gold pl-4">
                  <p className="font-semibold">{r.name}</p>
                  <p className="mt-1 text-sm text-white/60">{r.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
