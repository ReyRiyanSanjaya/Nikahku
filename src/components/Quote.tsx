import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FaHeart } from 'react-icons/fa'

const Quote = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="section container" style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
      <div className="glass-card quote-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px' }}>
        <FaHeart className="gold-text" size={30} style={{ marginBottom: '30px' }} />
        <p className="quote-text" style={{ 
          fontSize: '1.2rem', 
          lineHeight: '2', 
          fontStyle: 'italic', 
          marginBottom: '30px',
          color: '#555'
        }}>
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <h3 className="gold-text" style={{ fontSize: '1.5rem', fontFamily: 'Cormorant Garamond', fontWeight: 700 }}>
          (QS. Ar-Rum: 21)
        </h3>
      </div>
    </div>
  )
}

export default Quote
