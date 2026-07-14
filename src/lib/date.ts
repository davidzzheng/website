import { format } from "date-fns"

export const formatMonthYear = (date: string) => format(date, "LLLL, yyyy")
