import { Input } from "@/app/_components/ui/input"
import { Search } from "lucide-react"

interface SearchbarProps {
  searchBookRating: (searchText: string) => void
}

const Searchbar = ({ searchBookRating }: SearchbarProps) => {
  function handleInsertSearch(event: React.FormEvent<HTMLInputElement>) {
    const searchText = event.currentTarget.value

    searchBookRating(searchText)
  }

  return (
    <div className="peer flex items-center border border-gray-500 px-5 py-2 has-[:focus]:border-green-200">
      <Input
        type="text"
        placeholder="Buscar livro avaliado"
        aria-label="Buscar livro avaliado"
        className="peer border-none bg-transparent p-0 text-gray-400 caret-green-100 focus:text-gray-200"
        onChange={handleInsertSearch}
      />
      <Search className="text-gray-500 peer-focus:text-green-200" />
    </div>
  )
}

export default Searchbar
