import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import'./page.module.css'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anomaly Checker',
  description: 'Developed by @fxru_eth',
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
