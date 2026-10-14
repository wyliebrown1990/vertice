import clsx from 'clsx'
import {
  siAsana,
  siAtlassian,
  siClaude,
  siCloudflare,
  siCursor,
  siDatadog,
  siFigma,
  siGithub,
  siGoogle,
  siGreenhouse,
  siHubspot,
  siIntercom,
  siLooker,
  siMiro,
  siMongodb,
  siOkta,
  siSnowflake,
  siZendesk,
  siZoom,
} from 'simple-icons'
import type { Vendor } from '../../data/vendors'

// Only the glyphs Northwind's portfolio uses, imported individually (tree-shaken, offline).
const glyphs: Record<string, { path: string }> = {
  siAsana,
  siAtlassian,
  siClaude,
  siCloudflare,
  siCursor,
  siDatadog,
  siFigma,
  siGithub,
  siGoogle,
  siGreenhouse,
  siHubspot,
  siIntercom,
  siLooker,
  siMiro,
  siMongodb,
  siOkta,
  siSnowflake,
  siZendesk,
  siZoom,
}

const sizes = {
  xs: 'size-6 rounded-[6px] text-[9px]',
  sm: 'size-7 rounded-[7px] text-[10px]',
  md: 'size-9 rounded-[9px] text-[12px]',
  lg: 'size-12 rounded-[12px] text-[15px]',
}

/** Brand-coloured tile: white glyph when simple-icons has one, otherwise short text. */
export function VendorLogo({
  vendor,
  size = 'md',
  className,
}: {
  vendor: Pick<Vendor, 'name' | 'color' | 'icon' | 'mono'>
  size?: keyof typeof sizes
  className?: string
}) {
  const glyph = vendor.icon ? glyphs[vendor.icon] : undefined
  return (
    <span
      aria-hidden
      className={clsx('inline-flex shrink-0 items-center justify-center font-bold text-white select-none', sizes[size], className)}
      style={{ backgroundColor: vendor.color }}
    >
      {glyph ? (
        <svg viewBox="0 0 24 24" className="size-[58%]" fill="currentColor">
          <path d={glyph.path} />
        </svg>
      ) : (
        <span className="tracking-tight">{vendor.mono ?? vendor.name.slice(0, 1)}</span>
      )}
    </span>
  )
}
