import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { CookieConsent } from '@/components/CookieConsent'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chetna Mitra - AI Chat Assistant',
  description: 'Your intelligent AI chat companion with voice input, file sharing, and community features',
  keywords: ['AI Chat', 'Voice Assistant', 'Community', 'File Sharing'],
  authors: [{ name: 'Chetna Mitra Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Chetna Mitra - AI Chat Assistant',
    description: 'Your intelligent AI chat companion with voice input, file sharing, and community features',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chetna Mitra - AI Chat Assistant',
    description: 'Your intelligent AI chat companion with voice input, file sharing, and community features',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-950 text-white antialiased`}>
        <Providers>
          {children}
          <CookieConsent />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #475569',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}