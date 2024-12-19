import LoginButton from "./_components/loginButton"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { redirect } from "next/navigation"

const Login = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex h-full p-5">
      <div
        className="h-full w-[800px] bg-cover bg-center"
        style={{ backgroundImage: "url('images/bookwise-cover.svg')" }}
      >
        {/* O conteúdo dentro da div pode ser posicionado sobre a imagem de fundo */}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div>
          <h3 className="text-3xl font-medium">Boas vindas!</h3>
          <p className="text-xl opacity-70">
            Faça seu login ou acesse como visitante
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <LoginButton
              text="Entrar com o Google"
              imagePath="images/google-icon.svg"
              loginType="google"
            />
            <LoginButton
              text="Entrar com o Github"
              imagePath="images/github-icon.svg"
              loginType="github"
            />
            <LoginButton
              text="Entrar como visitante"
              imagePath="images/rocket-icon.svg"
              loginType="visitante"
              url="/"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
