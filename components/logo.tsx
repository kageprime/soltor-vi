import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="Soltor Capital — home"
    >
      <span
        aria-hidden="true"
        className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-navy"
      >
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gold" />
        <span className="relative size-4 rounded-full border-2 border-white bg-navy" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.05rem] font-semibold tracking-[0.2em]',
            inverted ? 'text-white' : 'text-navy',
          )}
        >
          SOLTOR
        </span>
        <span
          className={cn(
            'mt-1 font-mono text-[0.6rem] tracking-[0.42em]',
            inverted ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          CAPITAL
        </span>
      </span>
    </Link>
  )
}
