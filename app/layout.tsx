import type { Metadata } from "next"
import "./globals.css"

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
