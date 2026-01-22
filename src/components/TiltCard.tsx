import { useRef, useState, MouseEvent, ReactNode, CSSProperties, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(({ children, className, style }, ref) => {
  const internalRef = useRef<HTMLDivElement>(null)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })
  
  // Combine refs
  useImperativeHandle(ref, () => internalRef.current as HTMLDivElement)
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!internalRef.current) return

    const rect = internalRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = (mouseX / width - 0.5) * 2 // -1 to 1
    const yPct = (mouseY / height - 0.5) * 2 // -1 to 1
    
    // Update glare
    setGlarePos({ 
      x: (mouseX / width) * 100, 
      y: (mouseY / height) * 100,
      opacity: 1
    })
    
    // Tilt calculation
    const rotateX = yPct * -10 // Invert Y for X rotation
    const rotateY = xPct * 10
    
    gsap.to(internalRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    if (!internalRef.current) return
    
    setGlarePos(prev => ({ ...prev, opacity: 0 }))
    
    gsap.to(internalRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  return (
    <div
      ref={internalRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Glare Effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 80%)`,
          opacity: glarePos.opacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10,
          mixBlendMode: 'overlay'
        }}
      />
      
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  )
})

export default TiltCard
