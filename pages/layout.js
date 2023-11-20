import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { metadata } from './metadata.js'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* other meta tags as needed */}
      </head>
      <body className={inter.className}>{children}
      <Analytics />
      </body>
    </html>
  )
}
