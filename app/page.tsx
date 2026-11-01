import { CtaBand } from '@/components/cta-band'
import { DivisionsGrid } from '@/components/home/divisions-grid'
import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { ProjectsPreview } from '@/components/home/projects-preview'
import { SupplyTable } from '@/components/home/supply-table'
import { Values } from '@/components/home/values'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <DivisionsGrid />
      <SupplyTable />
      <Values />
      <ProjectsPreview />
      <CtaBand
        title="Start the conversation."
        body="From a single cargo allocation to a multi-year infrastructure programme — our trading desk is ready to respond."
      />
    </>
  )
}
