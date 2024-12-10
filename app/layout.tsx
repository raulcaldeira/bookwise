import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import AuthProvider from "./_providers/auth"

const nunito = Nunito({
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: "Bookwise",
  description: "O maior aplicativo de avaliação de livros.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${nunito.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
