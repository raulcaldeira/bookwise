import Image from "next/image"
import LoginButton from "./_components/loginButton"

const Login = () => {
  return (
    <div className="flex h-full p-5">
      {/* <div className="w-[800px]">
        <Image
          src="images/bookwise-cover.svg"
          alt="bookwise"
          width={0}
          height={200}
          style={{ height: "100%", width: "auto" }}
        />
      </div> */}
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
