import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plann.er',
  description: 'Invite your friends and plan your next trip!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className + ' bg-zinc-950 text-zinc-50 antialiased'}
      >
        {children}
      </body>
    </html>
  )
}
