import type { Metadata } from 'next'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { ProjectList } from '@/components/project-list'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected petroleum supply, equipment procurement, data centre and network infrastructure projects delivered by Soltor Capital.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Track record"
        title="Contracts delivered across sectors and borders."
        description="A selection of supply, procurement and infrastructure contracts executed for energy, telecoms, finance and industrial clients."
        image="/images/stock-construction.jpg"
      />
      <section>
        <div className="container-x py-20 md:py-28">
          <ProjectList />
        </div>
      </section>
      <CtaBand
        title="Your project could be next."
        body="Bring us the scope — we’ll handle sourcing, logistics and delivery."
      />
    </>
  )
}
