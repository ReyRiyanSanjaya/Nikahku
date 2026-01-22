import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaHeart, FaCalendarAlt, FaRing } from 'react-icons/fa'
import TiltCard from './TiltCard'

gsap.registerPlugin(ScrollTrigger)

const stories = [
  {
    year: '2021',
    title: 'Pertemuan Pertama',
    desc: 'Kami bertemu di sebuah acara reuni kampus. Tak ada yang menyangka, sapaan hangat sore itu menjadi awal dari cerita panjang kami.',
    icon: <FaCalendarAlt />
  },
  {
    year: '2023',
    title: 'Menjalin Kasih',
    desc: 'Setelah mengenal lebih jauh, kami memutuskan untuk melangkah bersama. Saling menguatkan, tumbuh bersama, dan berbagi mimpi.',
    icon: <FaHeart />
  },
  {
    year: '2025',
    title: 'Lamaran',
    desc: 'Dengan restu kedua orang tua, kami memantapkan hati untuk melangkah ke jenjang yang lebih serius. Sebuah janji suci untuk selamanya.',
    icon: <FaRing />
  }
]

const LoveStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll('.story-item')
      
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1, y: 0, x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        )
      })

    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="section container" style={{ padding: '100px 20px', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 className="gold-text script-font section-title-large">Kisah Cinta</h2>
        <p style={{ color: '#666', fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', fontStyle: 'italic' }}>
          "Setiap cerita cinta itu indah, tapi cerita kami adalah favoritku."
        </p>
      </div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Center Line */}
        <div style={{ 
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', 
          background: 'linear-gradient(to bottom, transparent, #bf953f, transparent)', 
          transform: 'translateX(-50%)', opacity: 0.3 
        }}></div>

        {stories.map((story, i) => (
          <div key={i} className="story-item" style={{ 
            display: 'flex', 
            justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', 
            alignItems: 'center', 
            marginBottom: '60px', 
            position: 'relative' 
          }}>
            
            {/* Timeline Dot */}
            <div style={{ 
              position: 'absolute', left: '50%', width: '40px', height: '40px', 
              background: '#fdfbf7', border: '1px solid #bf953f', borderRadius: '50%', 
              transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 2, color: '#bf953f', boxShadow: '0 4px 10px rgba(191, 149, 63, 0.2)'
            }}>
              {story.icon}
            </div>

            {/* Content Card */}
            <TiltCard className={`glass-card story-card-${i % 2 === 0 ? 'left' : 'right'}`} style={{ 
              width: '42%', 
              padding: '30px', 
              textAlign: i % 2 === 0 ? 'right' : 'left',
              marginRight: i % 2 === 0 ? '50px' : 0,
              marginLeft: i % 2 !== 0 ? '50px' : 0,
            }}>
              <span style={{ 
                display: 'inline-block', padding: '4px 12px', borderRadius: '20px', 
                background: 'rgba(191, 149, 63, 0.1)', color: '#bf953f', 
                fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' 
              }}>
                {story.year}
              </span>
              <h3 className="gold-text" style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', marginBottom: '10px' }}>
                {story.title}
              </h3>
              <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>
                {story.desc}
              </p>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoveStory
