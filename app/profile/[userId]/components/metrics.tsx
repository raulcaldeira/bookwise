import { Bookmark, BookOpen, Library, UserPen } from "lucide-react"
import MetricItem from "./metric-item"
import { BOOK_CATEGORY_LABELS } from "@/app/_constants/book-category"

interface MetricsProps {
  totalPagesRead: number
  totalBooksRated: number
  totalAuthorRead: number
  mostReadCategory: keyof typeof BOOK_CATEGORY_LABELS
}

const Metrics = ({
  totalPagesRead,
  totalBooksRated,
  totalAuthorRead,
  mostReadCategory,
}: MetricsProps) => {
  const categoryLabel =
    BOOK_CATEGORY_LABELS[mostReadCategory] || "Categoria Desconhecida"

  return (
    <div className="flex justify-center">
      <div className="space-y-8">
        <MetricItem
          icon={<BookOpen className="text-green-100" size={32} />}
          metricValue={totalPagesRead}
          metricDescription="Páginas lidas"
        />

        <MetricItem
          icon={<Library className="text-green-100" size={32} />}
          metricValue={totalBooksRated}
          metricDescription="Livros avaliados"
        />

        <MetricItem
          icon={<UserPen className="text-green-100" size={32} />}
          metricValue={totalAuthorRead}
          metricDescription="Autores lidos"
        />

        <MetricItem
          icon={<Bookmark className="text-green-100" size={32} />}
          metricValue={categoryLabel}
          metricDescription="Categoria mais lida"
        />
      </div>
    </div>
  )
}

export default Metrics
