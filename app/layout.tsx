import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import "./globals.css"

const nunitoSans = Nunito_Sans({
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
      <body className={`${nunitoSans.className} antialiased`}>{children}</body>
    </html>
  )
}
