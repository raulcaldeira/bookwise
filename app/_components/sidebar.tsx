import Image from "next/image"
import SidebarLink from "./sidebar-link"
import { Binoculars, ChartLine, User } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import UserLoggedButton from "./user-logged-button"

const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div
      className="flex h-full flex-col justify-between bg-cover bg-center px-14 py-10"
      style={{ backgroundImage: "url('images/sidebar-bg.png')" }}
    >
      <div>
        <Image src="/images/logo.png" alt="bookwise" height={150} width={150} />

        <div className="mt-16 flex flex-col gap-8">
          <SidebarLink icon={<ChartLine size={24} />} text="Início" url="/" />
          <SidebarLink
            icon={<Binoculars size={24} />}
            text="Explorar"
            url="/explore"
          />
          <SidebarLink icon={<User size={24} />} text="Perfil" url="/profile" />
        </div>
      </div>
      <UserLoggedButton session={session} />
    </div>
  )
}

export default Sidebar
