'use client'

import { useEffect, useRef } from 'react'

export default function Confetti({ trigger }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!trigger || !containerRef.current) return

    const container = containerRef.current
    const confettiPieces = 60

    for (let i = 0; i < confettiPieces; i++) {
      const piece = document.createElement('div')
      piece.className = 'confetti-piece'
      piece.style.left = Math.random() * 100 + '%'
      piece.style.backgroundColor = ['#FF6B9D', '#FFA500', '#FFD700', '#00CED1', '#32CD32', '#9370DB'][Math.floor(Math.random() * 6)]
      piece.style.setProperty('--duration', (2 + Math.random() * 1.5) + 's')
      piece.style.setProperty('--delay', (Math.random() * 0.3) + 's')
      piece.style.setProperty('--rotate', (Math.random() * 720 - 360) + 'deg')
      piece.style.setProperty('--offset', (Math.random() * 200 - 100) + 'px')
      
      container.appendChild(piece)
      setTimeout(() => piece.remove(), 3500)
    }
  }, [trigger])

  return <div ref={containerRef} className="confetti-container" aria-hidden="true" />
}
