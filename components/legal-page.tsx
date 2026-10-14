import Link from 'next/link'

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: { heading: string; body: React.ReactNode }[]
}) {
  return (
    <>
      <section className="border-b bg-secondary">
        <div className="container-x py-16 md:py-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-navy">
                {title}
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-gold">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-navy md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
        </div>
      </section>
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <nav aria-label="On this page" className="hidden md:col-span-3 md:block">
          <ol className="sticky top-36 space-y-3 text-sm">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s-${i + 1}`} className="text-muted-foreground hover:text-navy">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-2xl space-y-12 md:col-span-9">
          {sections.map((s, i) => (
            <section key={s.heading} id={`s-${i + 1}`} className="scroll-mt-36">
              <h2 className="text-xl font-semibold text-navy">{s.heading}</h2>
              <div className="mt-4 leading-relaxed text-foreground/80">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
