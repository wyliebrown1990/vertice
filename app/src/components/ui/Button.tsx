import clsx from 'clsx'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link' | 'success'
type Size = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-[0_1px_2px_rgb(96_0_240/0.25)]',
  secondary: 'bg-white text-ink border border-line hover:bg-canvas hover:border-ink-4/50',
  ghost: 'text-ink-2 hover:bg-line-soft',
  link: 'text-primary hover:text-primary-hover underline-offset-4 hover:underline px-0!',
  success: 'bg-success text-white hover:bg-success-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-[7px]',
  md: 'h-9 px-4 text-sm rounded-[var(--radius-control)]',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, type = 'button', ...rest },
  ref,
) {
  return <button ref={ref} type={type} className={clsx(base, variants[variant], sizes[size], className)} {...rest} />
})

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: LinkProps & { variant?: Variant; size?: Size }) {
  return <Link className={clsx(base, variants[variant], sizes[size], className)} {...rest} />
}
