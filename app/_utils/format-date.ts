import { formatDistanceToNow, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

const formatDate = (date: Date) => {
  const distance = formatDistanceToNow(date, { addSuffix: true, locale: ptBR })

  const distanceText = distance.charAt(0).toUpperCase() + distance.slice(1)

  return distanceText
}

export default formatDate
