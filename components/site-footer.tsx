import Link from 'next/link'
import { Logo } from '@/components/logo'
import { contact, divisions } from '@/lib/site'

const company = [
  { href: '/divisions', label: 'Who we are' },
  { href: '/projects', label: 'Projects' },
  { href: '/suppliers', label: 'Become a supplier' },
  { href: '/contact', label: 'Contact' },
  { href: '/contact#quote', label: 'Request a quote' },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            International trading, procurement, technology, and contracting company — connecting
            energy markets, equipment manufacturers, and enterprise clients worldwide.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-gold">Business</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {divisions.map((d) => (
              <li key={d.id}>
                <Link href={d.href} className="text-white/75 hover:text-white">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow text-gold">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/75 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-gold">Trading desk</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li>{contact.hours}</li>
            <li>Serving global markets</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Soltor Capital. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
