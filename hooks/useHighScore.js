'use client'

import { useState, useEffect } from 'react'

const HIGH_SCORE_KEY = 'bubblePop_highScore'

export function useHighScore() {
  const [highScore, setHighScore] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasExistingScore, setHasExistingScore] = useState(false)

  // Load high score from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_KEY)
      if (stored) {
        const score = parseInt(stored, 10)
        setHighScore(score)
        setHasExistingScore(true)
      }
    } catch (e) {
      // localStorage might not be available
    }
    setIsLoaded(true)
  }, [])

  // Update high score if current score is higher
  const updateHighScore = (currentScore) => {
    if (currentScore > highScore) {
      setHighScore(currentScore)
      try {
        localStorage.setItem(HIGH_SCORE_KEY, currentScore.toString())
      } catch (e) {
        // ignore localStorage errors
      }
      // Only show celebration if we had a previous score and this beats it
      return hasExistingScore
    }
    return false
  }

  return { highScore, updateHighScore, isLoaded, hasExistingScore }
}
