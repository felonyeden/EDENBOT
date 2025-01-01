import { ChatWidget } from '@/components/chat-widget'
import '@/styles/globals.css'

export const metadata = {
  title: "Eden's Portfolio",
  description: 'A showcase of Eden\'s skills and experiences in media and tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}



import './globals.css'