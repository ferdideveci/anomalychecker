import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anomalychecker.app - Track any set of the Anomaly AI NFT collection',
  description: 'Track any set of the Anomaly AI NFT collection. Developed by @fxru_eth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}
      <Analytics />
      </body>
    </html>
  )
}
