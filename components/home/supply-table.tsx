import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/page-hero'
import { featuredSupply } from '@/lib/site'

export function SupplyTable() {
  return (
    <section>
      <div className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Featured supply"
            title="Products moving global markets."
            description="Indicative allocations from our energy desk. Specifications, Incoterms and availability are confirmed per enquiry."
          />
          <div className="relative mt-10 aspect-[4/3] overflow-hidden">
            <Image
              src="/images/terminal-night.png"
              alt="Petroleum storage terminal and harbour at dusk"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">Featured petroleum product supply</caption>
              <thead>
                <tr className="border-b-2 border-navy">
                  {['Product', 'Specification', 'Terms', 'Status'].map((h) => (
                    <th key={h} scope="col" className="eyebrow pb-4 pr-4 font-normal text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featuredSupply.map((row) => (
                  <tr key={row.product} className="border-b transition-colors hover:bg-secondary">
                    <th scope="row" className="py-5 pr-4 font-medium text-navy">
                      {row.product}
                    </th>
                    <td className="py-5 pr-4 font-mono text-xs text-muted-foreground">{row.spec}</td>
                    <td className="py-5 pr-4 font-mono text-xs text-muted-foreground">{row.terms}</td>
                    <td className="py-5">
                      <span
                        className={
                          row.status === 'Available'
                            ? 'inline-flex items-center gap-2 text-xs font-medium text-navy'
                            : 'inline-flex items-center gap-2 text-xs font-medium text-muted-foreground'
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={row.status === 'Available' ? 'size-1.5 rounded-full bg-gold' : 'size-1.5 rounded-full bg-muted-foreground/40'}
                        />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Supply subject to availability, sanctions screening and KYC.
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              View all products
              <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
