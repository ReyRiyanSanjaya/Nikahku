import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import TiltCard from './TiltCard'

interface HeroProps {
  onOpen: () => void
}

const Hero: React.FC<HeroProps> = ({ onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container entrance
      gsap.fromTo(contentRef.current, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      )

      // Staggered animation for children
      const q = gsap.utils.selector(contentRef)
      gsap.fromTo(q("h3"), // "The Royal Wedding of"
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
      )
      
      gsap.fromTo(q("h1"), // Names
        { y: 50, opacity: 0, scale: 1.1, filter: 'blur(10px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, delay: 0.7, ease: 'power3.out' }
      )
      
      gsap.fromTo(q("p"), // Quote & Date
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 1.2, ease: 'power2.out' }
      )
      
      gsap.fromTo(q(".divider"), // Line
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 0.6, duration: 1, delay: 1.5, ease: 'power2.out' }
      )
      
      gsap.fromTo(q(".invite-box"), // Guest box
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.8, ease: 'power2.out' }
      )
      
      gsap.fromTo(q(".btn"), // Button
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.1, ease: 'back.out(1.7)' }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleOpen = () => {
    gsap.to(contentRef.current, {
      scale: 1.05,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 1.2,
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
      backgroundImage: 'url("https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=2000&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(253, 251, 247, 0.7)',
        backdropFilter: 'blur(5px)'
      }}></div>

      <TiltCard ref={contentRef} className="glass-card hero-card" style={{ maxWidth: '600px', width: '90%', textAlign: 'center', padding: '70px 40px' }}>
        <h3 style={{ letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '20px', fontSize: '0.85rem', color: '#666', fontWeight: 600, fontFamily: 'Montserrat' }}>The Royal Wedding of</h3>
        <h1 className="gold-text script-font hero-title" style={{ fontSize: '5rem', lineHeight: 1.1, marginBottom: '15px' }}>Wulan & Fariz</h1>
        
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#888', fontFamily: 'Cormorant Garamond', marginBottom: '20px' }}>
          "Two souls, one heart, forever in love."
        </p>

        <div className="divider" style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, transparent, #bf953f, transparent)', margin: '0 auto 20px', opacity: 0.6 }}></div>
        
        <p style={{ fontSize: '1.3rem', marginBottom: '40px', letterSpacing: '6px', fontFamily: 'Cormorant Garamond', fontWeight: 500, color: '#444' }}>31 . 01 . 2026</p>
        
        <div className="invite-box" style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '12px', fontStyle: 'italic', color: '#777', fontFamily: 'Cormorant Garamond' }}>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <div style={{ background: 'rgba(255,255,255,0.5)', padding: '15px 30px', borderRadius: '12px', display: 'inline-block', minWidth: '220px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)', border: '1px solid rgba(255,255,255,0.6)' }}>
             <p style={{ fontWeight: '600', fontSize: '1.2rem', color: '#333', letterSpacing: '0.5px', fontFamily: 'Cormorant Garamond' }}>Tamu Undangan</p>
          </div>
        </div>

        <button className="btn" onClick={handleOpen} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', margin: '0 auto', padding: '14px 35px', fontSize: '1rem' }}>
          <FaEnvelopeOpenText size={16} /> Buka Undangan Spesial
        </button>
        </TiltCard>
    </div>
  )
}

export default Hero
