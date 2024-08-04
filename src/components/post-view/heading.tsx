import { cn } from '@/lib/utils'

type HeadingProps = {
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  id: string
  children: React.ReactNode
  className?: string
}

export const Heading = ({ heading, id, children, className }: HeadingProps) => {
  const Comp = heading

  return (
    <Comp
      id={id}
      className={cn(
        'relative flex items-center cursor-pointer',
        "hover:before:content-['#'] before:absolute before:text-muted-foreground before:-ml-[21px] before:opacity-0 hover:before:opacity-100 before:transition",
        className,
      )}
    >
      {children}
    </Comp>
  )
}
