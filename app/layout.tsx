import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { RelayOneContextProvider } from './RelayOneContextProvider'

import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "hodlocker.com";
const APP_DEFAULT_TITLE = "hodlocker.com | Don't get psyoped, be locked in.";
const APP_TITLE_TEMPLATE = "%s - hodlocker";
const APP_DESCRIPTION = "Don't get psyoped, be locked in.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ['https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/locked.png']
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    creator: '@hodlocker',
    images: ['https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/locked.png']
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
};




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={inter.className}>
        <RelayOneContextProvider>
          {children}
        </RelayOneContextProvider>
      </body>
    </html>
  )
}
