import { type CXOptions, cx } from 'cva'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: CXOptions) => twMerge(cx(inputs))
