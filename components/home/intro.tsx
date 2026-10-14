import { stats } from '@/lib/site'

export function Intro() {
  return (
    <section className="border-b">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <p className="eyebrow text-muted-foreground">
            <span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-gold align-middle" />
            Soltor Capital
          </p>
          <p className="mt-6 text-balance text-2xl font-medium leading-snug tracking-tight text-navy md:text-4xl">
            We connect refiners, OEM manufacturers and logistics channels into one integrated
            procurement network — so our clients can source essential energy, equipment and
            technology with confidence.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px self-end bg-border md:col-span-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-6">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
