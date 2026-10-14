'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Globe, Mail, Menu, Phone, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { contact, nav } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="hidden bg-navy-deep text-white/75 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <Globe className="size-3.5 text-gold" aria-hidden="true" />
            Serving global markets · West Africa · Middle East · Europe · Asia
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-3.5" aria-hidden="true" />
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-3.5" aria-hidden="true" />
              {contact.phone}
            </a>
            <span className="font-mono text-[0.7rem] text-white/50">{contact.hours}</span>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="container-x flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative flex h-18 items-center px-4 text-sm font-medium transition-colors hover:text-navy',
                        active ? 'text-navy' : 'text-foreground/70',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-4 bottom-0 h-0.5 bg-gold transition-transform origin-left',
                          active ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact#quote"
              className="hidden h-11 items-center bg-navy px-5 text-sm font-medium text-white transition-colors hover:bg-navy-deep sm:inline-flex"
            >
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid size-11 place-items-center border lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-b bg-background lg:hidden"
        >
          <ul className="container-x divide-y py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base font-medium"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-gold">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li className="flex gap-3 py-4">
              <Link
                href="/contact#quote"
                onClick={() => setOpen(false)}
                className="flex h-12 flex-1 items-center justify-center bg-navy text-sm font-medium text-white"
              >
                Request a quote
              </Link>
              <a
                href={contact.whatsappHref}
                className="flex h-12 flex-1 items-center justify-center border text-sm font-medium"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
