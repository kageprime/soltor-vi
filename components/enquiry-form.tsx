'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { contact } from '@/lib/site'

type Field = { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }

const baseFields: Field[] = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
]

export function EnquiryForm({
  subject,
  selectLabel,
  options,
  messageLabel = 'Requirements',
  messagePlaceholder = 'Product, specification, quantity, destination port, Incoterms…',
  submitLabel = 'Send enquiry',
}: {
  subject: string
  selectLabel: string
  options: string[]
  messageLabel?: string
  messagePlaceholder?: string
  submitLabel?: string
}) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const lines = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || '—'}`,
      `${selectLabel}: ${data.get('category')}`,
      '',
      String(data.get('message') ?? ''),
    ]
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `${subject} — ${data.get('company')}`,
    )}&body=${encodeURIComponent(lines.join('\n'))}`
    window.location.href = href
    setSent(true)
  }

  const inputClass =
    'mt-2 block h-12 w-full border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15'

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      {baseFields.map((f) => (
        <div key={f.name}>
          <label htmlFor={`f-${f.name}`} className="text-sm font-medium text-navy">
            {f.label}
            {f.required && <span className="text-gold"> *</span>}
          </label>
          <input
            id={`f-${f.name}`}
            name={f.name}
            type={f.type ?? 'text'}
            required={f.required}
            autoComplete={f.autoComplete}
            className={inputClass}
          />
        </div>
      ))}
      <div className="sm:col-span-2">
        <label htmlFor="f-category" className="text-sm font-medium text-navy">
          {selectLabel}
          <span className="text-gold"> *</span>
        </label>
        <select id="f-category" name="category" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-message" className="text-sm font-medium text-navy">
          {messageLabel}
          <span className="text-gold"> *</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          required
          rows={5}
          placeholder={messagePlaceholder}
          className="mt-2 block w-full border border-input bg-background p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-navy focus:ring-2 focus:ring-navy/15"
        />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          Your details are used only to respond to this enquiry, in line with our Privacy Policy.
        </p>
        <button
          type="submit"
          className="group inline-flex h-13 items-center justify-center gap-3 bg-navy px-7 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          {submitLabel}
          <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="sm:col-span-2">
        {sent && (
          <span className="flex items-center gap-2 text-sm text-navy">
            <Check className="size-4 text-gold" aria-hidden="true" />
            Your email client has opened with the enquiry. If it didn&apos;t, email us at{' '}
            <a className="underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  )
}
