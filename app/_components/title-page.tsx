import { ReactNode } from "react"

interface TitlePageProps {
  icon: ReactNode
  text: string
}

const TitlePage = ({ icon, text }: TitlePageProps) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <h1 className="text-2xl font-bold capitalize">{text}</h1>
    </div>
  )
}

export default TitlePage
