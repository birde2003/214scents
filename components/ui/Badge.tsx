import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  const variants = {
    default: 'bg-primary/20 text-primary border-primary',
    success: 'bg-green-900/20 text-green-400 border-green-500',
    error: 'bg-red-900/20 text-red-400 border-red-500',
    warning: 'bg-yellow-900/20 text-yellow-400 border-yellow-500',
    info: 'bg-blue-900/20 text-blue-400 border-blue-500',
    primary: 'bg-primary/30 text-primary border-primary',
    danger: 'bg-red-900/20 text-red-400 border-red-500',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
