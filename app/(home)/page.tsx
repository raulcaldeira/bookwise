import Sidebar from "../_components/sidebar"

export default function Home() {
  return (
    <section className="flex h-full">
      <div className="p-5">
        <Sidebar />
      </div>
      <div className="flex-1"></div>
    </section>
  )
}
