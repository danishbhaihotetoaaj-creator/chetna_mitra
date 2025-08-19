import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Microservices Platform',
  description: 'Enterprise-grade AI platform with multi-provider support, document processing, and advanced analytics',
  keywords: 'AI, microservices, machine learning, document processing, analytics',
  authors: [{ name: 'AI Platform Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Microservices Platform',
    description: 'Enterprise-grade AI platform with multi-provider support',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Microservices Platform',
    description: 'Enterprise-grade AI platform with multi-provider support',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}