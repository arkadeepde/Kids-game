import '../styles/globals.css'
import Link from 'next/link'
import FollowCursor from '../components/FollowCursor'

export const metadata = {
  title: 'Kids Games',
  description: 'Simple, touch-friendly games for toddlers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main-shell">
          <header className="header">
            <div className="logo">Kids Games</div>
            <nav className="menu">
              <Link href="/">Home</Link>
              <Link href="/games/bubble-pop">Bubble Pop</Link>
            </nav>
          </header>

          <main style={{width: '100%', flex: 1}}>
            {children}
          </main>

          <FollowCursor />
        </div>
      </body>
    </html>
  )
}
