import { ReactNode } from "react"

interface MetricItemProps {
  icon: ReactNode
  metricValue: string | number
  metricDescription: string
}

const MetricItem = ({
  icon,
  metricValue,
  metricDescription,
}: MetricItemProps) => {
  return (
    <div className="flex items-center gap-5">
      {icon}
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-200">{metricValue}</span>
        <span className="text-gray-300 opacity-70">{metricDescription}</span>
      </div>
    </div>
  )
}

export default MetricItem
