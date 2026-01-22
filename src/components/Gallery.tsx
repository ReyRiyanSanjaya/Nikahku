import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Carousel3D from './Carousel3D'

gsap.registerPlugin(ScrollTrigger)

const images = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format',
  'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=600&auto=format',
]

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('.anim-item')
      
      if (items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            }
          }
        )
      }
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  const navigate = (direction: number) => {
    if (selectedIndex === null) return
    const newIndex = (selectedIndex + direction + images.length) % images.length
    setSelectedIndex(newIndex)
  }

  return (
    <div ref={sectionRef} className="section container" style={{ textAlign: 'center' }}>
      <h2 className="anim-item gold-text script-font section-title-large" style={{ marginBottom: '10px' }}>Galeri Bahagia</h2>
      <p className="anim-item" style={{ marginBottom: '30px', letterSpacing: '1px', fontSize: '1.1rem', color: '#888', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>
        "Setiap detik bersamamu adalah kenangan yang abadi."
      </p>

      {/* 3D Carousel Section */}
      <div className="anim-item carousel-container">
        <Carousel3D images={images} onImageClick={setSelectedIndex} />
      </div>

      <div style={{ marginBottom: '40px' }}>
         <p style={{ fontSize: '0.9rem', color: '#888', fontStyle: 'italic' }}>
            (Geser atau klik foto untuk memperbesar)
         </p>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="lightbox-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button className="lightbox-btn lb-close" onClick={() => setSelectedIndex(null)}>
            <FaTimes />
          </button>

          {/* Navigation Buttons */}
          <button 
            className="lightbox-btn lb-prev" 
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="lightbox-btn lb-next" 
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
          >
            <FaChevronRight />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[selectedIndex]} 
              alt="Full View" 
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
