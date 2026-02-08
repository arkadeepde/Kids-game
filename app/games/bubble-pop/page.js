'use client'

import { useEffect, useRef, useState } from 'react'
import { useHighScore } from '../../../hooks/useHighScore'
import Confetti from '../../../components/Confetti'

export default function BubblePop() {
  const containerRef = useRef(null)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const [triggerConfetti, setTriggerConfetti] = useState(false)
  const [hasCelebratedThisSession, setHasCelebratedThisSession] = useState(false);
  const [previousHighScore, setPreviousHighScore] = useState(0);
  const { highScore, updateHighScore, isLoaded } = useHighScore()

  useEffect(() => {
    if (!started) return
    const gameContainer = containerRef.current
    if (!gameContainer) return

    const bubbleEmojis = ['🎈', '🎉', '⭐', '🌟', '💫', '🎊']
    const bubbleColors = ['bubble1','bubble2','bubble3','bubble4','bubble5','bubble6','bubble7','bubble8']

    function playPopSound() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) { /* ignore if audio blocked */ }
    }

    function playSuccessSound() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523, 659, 784];

        notes.forEach((freq, index) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = freq;
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.15);

          oscillator.start(audioContext.currentTime + index * 0.1);
          oscillator.stop(audioContext.currentTime + index * 0.1 + 0.15);
        });
      } catch (e) { }
    }

    function playDrumRoll() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        for (let i = 0; i < 12; i++) {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = 120 + Math.random() * 80;
          osc.type = 'triangle';
          gain.gain.setValueAtTime(0.15, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.07);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.07);
        }
      } catch (e) { }
    }

    function createParticles(x, y) {
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)];

        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        gameContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
      }
    }

    function popBubble(bubble) {
      if (!bubble || bubble.classList.contains('pop-animation')) return;
      bubble.classList.add('pop-animation');

      const rect = bubble.getBoundingClientRect();
      const containerRect = gameContainer.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      createParticles(x, y);
      playPopSound();
      playSuccessSound();

      setScore(prevScore => {
        const newScore = prevScore + 1;
        setTimeout(() => {
          // Only celebrate if not already celebrated this session and crossing previous high score
          if (!hasCelebratedThisSession && newScore === previousHighScore + 1 && updateHighScore(newScore)) {
            playDrumRoll();
            setTriggerConfetti(v => !v);
            setShowCongrats(true);
            setHasCelebratedThisSession(true);
            setTimeout(() => setShowCongrats(false), 3500);
          }
        }, 300);
        return newScore;
      });

      setTimeout(() => bubble.remove(), 500);
      createBubble();
    }

    function createBubble() {
      if (!gameContainer) return
      const bubble = document.createElement('div');
      bubble.className = 'bubble ' + bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

      const size = 60 + Math.random() * 80; // 60-140px
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';

      const x = Math.random() * (gameContainer.clientWidth - size);
      const y = Math.random() * (gameContainer.clientHeight - size);

      bubble.style.left = x + 'px';
      bubble.style.top = y + 'px';

      bubble.textContent = bubbleEmojis[Math.floor(Math.random() * bubbleEmojis.length)];

      // Animation
      const duration = 3 + Math.random() * 4;
      const startX = x;
      const endX = x + (Math.random() - 0.5) * 200;
      const startY = y;
      const endY = y - 300;

      let startTime = null;
      function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = (currentTime - startTime) / 1000;
        const progress = elapsed / duration;

        if (progress >= 1 || !document.contains(bubble)) return;

        bubble.style.left = (startX + (endX - startX) * progress) + 'px';
        bubble.style.top = (startY + (endY - startY) * progress) + 'px';
        bubble.style.opacity = 1 - (progress * progress);

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);

      bubble.addEventListener('click', () => popBubble(bubble));
      bubble.addEventListener('touchstart', (e) => { e.preventDefault(); popBubble(bubble); });
      bubble.addEventListener('mouseenter', () => {
        window.dispatchEvent(new CustomEvent('bubbleHover', { detail: { hovering: true } }));
      });
      bubble.addEventListener('mouseleave', () => {
        window.dispatchEvent(new CustomEvent('bubbleHover', { detail: { hovering: false } }));
      });

      gameContainer.appendChild(bubble);
    }

    // Create initial bubbles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBubble(), i * 200);
    }

    const interval = setInterval(createBubble, 1500);

    // cleanup
    return () => {
      clearInterval(interval);
      // remove all children under gameContainer
      if (gameContainer) {
        Array.from(gameContainer.children).forEach(child => child.remove());
      }
    }

  }, [started])

  // Reset celebration state when starting a new game
  const handleStart = () => {
    setScore(0);
    setStarted(true);
    setHasCelebratedThisSession(false);
    setPreviousHighScore(highScore); // cache high score at game start
  };

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1100, margin:'0 auto'}}>
        <div style={{color:'white', fontWeight:700, fontSize:20}}>Bubble Pop</div>
      </div>

      <div ref={containerRef} className="game-container" role="region" aria-label="Bubble pop game">
        <div className="score-badge">
          <div>Score: {score}</div>
          {isLoaded && <div style={{fontSize: '0.7em', marginTop: '4px', opacity: 0.8}}>High: {highScore}</div>}
        </div>

        {showCongrats && (
          <div className="congrats-overlay">
            <div className="congrats-content">
              <div className="congrats-emoji">🎉</div>
              <div className="congrats-title">New Record!</div>
              <div className="congrats-score">{score}</div>
            </div>
          </div>
        )}

        {!started && (
          <div className="start-overlay" onClick={handleStart}>
            <button className="start-button" aria-label="Start game">Start</button>
            <div className="start-title">Tap to begin</div>
            <div className="start-subtitle">Large targets, simple fun</div>
          </div>
        )}

        <Confetti trigger={triggerConfetti} />
      </div>

    </div>
  )
}
