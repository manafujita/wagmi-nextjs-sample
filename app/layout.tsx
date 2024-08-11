import '@rainbow-me/rainbowkit/styles.css'
import { headers } from 'next/headers'
import './globals.css'

import Providers from './providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = headers().get('cookie')

  return (
    <html lang="en">
      <body>
        <Providers cookie={cookie}>{children}</Providers>
      </body>
    </html>
  )
}
