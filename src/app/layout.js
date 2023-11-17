import { Inter } from 'next/font/google'
import './globals.css'
import'./page.module.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anomaly Checker',
  description: 'Developed by @fxckfxru',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
