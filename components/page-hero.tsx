import Image from 'next/image'
import Link from 'next/link'

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumb,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
  crumb: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/10"
      />
      <div className="container-x flex min-h-[26rem] flex-col justify-end pb-14 pt-24 md:min-h-[32rem] md:pb-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-mono text-xs text-white/60">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {crumb}
            </li>
          </ol>
        </nav>
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'split'
}) {
  if (align === 'split') {
    return (
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow text-muted-foreground">
            <span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-gold align-middle" />
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy md:text-5xl">
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-pretty leading-relaxed text-muted-foreground md:col-span-5">
            {description}
          </p>
        )}
      </div>
    )
  }
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-muted-foreground">
        <span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-gold align-middle" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
