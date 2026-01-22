import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa'
import TiltCard from './TiltCard'

gsap.registerPlugin(ScrollTrigger)

const EventDetail = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targetDate = new Date('2026-01-31T08:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelectorAll('.anim-item'),
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.2, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }
  }, [])

  return (
    <div ref={sectionRef} className="section container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2 className="anim-item gold-text script-font section-title-large" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Rangkaian Acara</h2>
      <p className="anim-item" style={{ maxWidth: '600px', margin: '0 auto 60px', color: '#777', fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', fontStyle: 'italic' }}>
         Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:
      </p>

      <div className="anim-item" style={{ marginBottom: '80px' }}>
        <div className="timer-container" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="timer-box" style={{ textAlign: 'center' }}>
              <div className="gold-text timer-value" style={{ fontSize: '3.5rem', fontWeight: '400', lineHeight: 1, fontFamily: 'Cormorant Garamond' }}>
                {String(value).padStart(2, '0')}
              </div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.75rem', marginTop: '10px', color: '#888', fontWeight: 600 }}>{unit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="event-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Akad Nikah */}
        <TiltCard className="anim-item glass-card event-card" style={{ padding: '50px 40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', 
              background: 'linear-gradient(to right, #bf953f, #fcf6ba, #bf953f)' 
          }}></div>
          
          <h3 className="gold-text" style={{ fontSize: '2.5rem', fontFamily: 'Cormorant Garamond', marginBottom: '30px' }}>Akad Nikah</h3>
          
          <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px' }}>
              <FaCalendarAlt color="#bf953f" size={20} />
              <div>
                 <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Tanggal</span>
                 <span style={{ fontWeight: 500, color: '#333' }}>Sabtu, 31 Januari 2026</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px' }}>
              <FaClock color="#bf953f" size={20} />
              <div>
                 <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Waktu</span>
                 <span style={{ fontWeight: 500, color: '#333' }}>08.00 WIB - Selesai</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
              <FaMapMarkerAlt color="#bf953f" size={20} style={{ marginTop: '5px' }} />
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Lokasi</span>
                <span style={{ fontWeight: '600', display: 'block', color: '#333', fontSize: '1.1rem', marginBottom: '5px' }}>Masjid Kilat Kaduagung</span>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Jl. Gunung Kencana, Kaduagung Tim., Kec. Cibadak, Kabupaten Lebak, Banten</span>
              </div>
            </div>
          </div>
          <button 
            className="btn" 
            style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Masjid+Kilat+Kaduagung+Lebak+Banten', '_blank')}
          >
            <FaMapMarkerAlt /> Lihat Lokasi
          </button>
        </TiltCard>

        {/* Resepsi */}
        <TiltCard className="anim-item glass-card event-card" style={{ padding: '50px 40px', position: 'relative', overflow: 'hidden' }}>
           <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', 
              background: 'linear-gradient(to right, #bf953f, #fcf6ba, #bf953f)' 
          }}></div>

          <h3 className="gold-text" style={{ fontSize: '2.5rem', fontFamily: 'Cormorant Garamond', marginBottom: '30px' }}>Resepsi</h3>
          
          <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px' }}>
              <FaCalendarAlt color="#bf953f" size={20} />
              <div>
                 <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Tanggal</span>
                 <span style={{ fontWeight: 500, color: '#333' }}>Sabtu, 31 Januari 2026</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '15px' }}>
              <FaClock color="#bf953f" size={20} />
              <div>
                 <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Waktu</span>
                 <span style={{ fontWeight: 500, color: '#333' }}>11.00 WIB - Selesai</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
              <FaMapMarkerAlt color="#bf953f" size={20} style={{ marginTop: '5px' }} />
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Lokasi</span>
                <span style={{ fontWeight: '600', display: 'block', color: '#333', fontSize: '1.1rem', marginBottom: '5px' }}>Kediaman Mempelai Wanita</span>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Jl. Gunung Kencana, Kaduagung Tim., Kec. Cibadak, Kabupaten Lebak, Banten</span>
              </div>
            </div>
          </div>
          <button 
            className="btn" 
            style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Jl.+Gunung+Kencana,+Kaduagung+Tim.,+Kec.+Cibadak,+Kabupaten+Lebak,+Banten', '_blank')}
          >
            <FaMapMarkerAlt /> Lihat Lokasi
          </button>
        </TiltCard>

      </div>
    </div>
  )
}

export default EventDetail
