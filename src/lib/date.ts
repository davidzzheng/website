import { format } from 'date-fns'

export const formatMonthYear = (date: string) => {
  return format(date, 'LLLL, yyyy')
}
