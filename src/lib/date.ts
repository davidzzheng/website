import { format, formatDistance } from 'date-fns'

export const formatRelativeDate = (date: string) =>
  formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })

export const formatDate = (date: string) => format(new Date(date), "EEEE, LLL dd, yyyy 'at' h:mm a")
