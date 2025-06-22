import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'hackathon',
  description: 'landing page for hackathon',
  generator: 'nkc baby',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
