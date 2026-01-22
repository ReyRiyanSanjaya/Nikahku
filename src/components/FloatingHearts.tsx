import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    const createHeart = () => {
      const heart = document.createElement('div')
      heart.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>'
      heart.style.position = 'absolute'
      heart.style.bottom = '-20px'
      heart.style.left = Math.random() * width + 'px'
      heart.style.color = '#bf953f'
      heart.style.opacity = (Math.random() * 0.5 + 0.2).toString()
      heart.style.fontSize = (Math.random() * 20 + 10) + 'px'
      heart.style.zIndex = '0'
      
      container.appendChild(heart)

      gsap.to(heart, {
        y: -height - 100,
        x: (Math.random() - 0.5) * 100,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        ease: 'power1.out',
        onComplete: () => {
          heart.remove()
        }
      })
    }

    const interval = setInterval(createHeart, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      pointerEvents: 'none', zIndex: 2, overflow: 'hidden' 
    }}>
    </div>
  )
}

export default FloatingHearts
