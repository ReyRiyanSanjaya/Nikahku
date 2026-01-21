import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FaEnvelopeOpenText } from 'react-icons/fa'

interface HeroProps {
  onOpen: () => void
}

const Hero: React.FC<HeroProps> = ({ onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleOpen = () => {
    gsap.to(contentRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: 'back.in(1.7)',
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none'
            onOpen()
          }
        })
      }
    })
  }

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: '#fdfbf7',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(253, 251, 247, 0.85)',
        backdropFilter: 'blur(3px)'
      }}></div>

      <div ref={contentRef} className="glass-card hero-card">
        <h3 style={{ letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '10px', fontSize: '0.8rem', color: '#888', fontWeight: 700 }}>The Wedding of</h3>
        <h1 className="gold-text script-font hero-title">Wulan & Fariz</h1>
        <div style={{ width: '60px', height: '1px', background: '#bf953f', margin: '20px auto', opacity: 0.5 }}></div>
        <p style={{ fontSize: '1.1rem', marginBottom: '40px', letterSpacing: '2px', fontFamily: 'Cormorant Garamond', fontWeight: 600 }}>31 . 01 . 2026</p>
        
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '8px', fontStyle: 'italic', color: '#666' }}>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <div style={{ background: 'rgba(255,255,255,0.5)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(191, 149, 63, 0.2)' }}>
             <p style={{ fontWeight: '700', fontSize: '1.2rem', color: '#444' }}>Tamu Undangan</p>
          </div>
        </div>

        <button className="btn" onClick={handleOpen} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', margin: '0 auto' }}>
          <FaEnvelopeOpenText size={16} /> Buka Undangan
        </button>
      </div>
    </div>
  )
}

export default Hero
