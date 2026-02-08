"use client"

import { useEffect, useRef, useState } from 'react'

export default function FollowCursor() {
  const ref = useRef(null)
  const [isHoveringBubble, setIsHoveringBubble] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let visible = false

    function onPointerMove(e) {
      visible = true
      const x = e.clientX
      const y = e.clientY
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1)`
    }

    function onPointerDown() {
      el.classList.add('active')
      // create a quick ripple
      const ripple = document.createElement('span')
      ripple.className = 'cursor-ripple'
      el.appendChild(ripple)
      setTimeout(() => ripple.remove(), 400)
    }

    function onPointerUp() {
      el.classList.remove('active')
    }

    function onTouchStart(e) {
      // show cursor briefly at touch location for engagement
      const t = e.touches[0]
      if (!t) return
      const x = t.clientX
      const y = t.clientY
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1.4)`
      el.classList.add('active')
      setTimeout(() => el.classList.remove('active'), 500)
    }

    function onBubbleHover(e) {
      setIsHoveringBubble(e.detail.hovering)
      if (e.detail.hovering) {
        el.classList.add('hovering-bubble')
      } else {
        el.classList.remove('hovering-bubble')
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('bubbleHover', onBubbleHover)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('bubbleHover', onBubbleHover)
    }
  }, [])

  return (
    <div ref={ref} className="follow-cursor" aria-hidden="true">
      <div className="cursor-inner">{isHoveringBubble ? '💥' : '👆'}</div>
    </div>
  )
}
