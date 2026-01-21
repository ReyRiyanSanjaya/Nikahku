import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa'

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
    <div ref={sectionRef} className="section container" style={{ textAlign: 'center' }}>
      <h2 className="anim-item gold-text script-font event-title section-title-large">Rangkaian Acara</h2>

      <div className="anim-item" style={{ marginBottom: '80px' }}>
        <div className="timer-container" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="timer-box">
              <div className="gold-text timer-value">
                {String(value).padStart(2, '0')}
              </div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7rem', marginTop: '5px', color: '#666' }}>{unit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="event-grid">
        
        {/* Akad Nikah */}
        <div className="anim-item glass-card event-card">
          <div className="event-card-badge">
            08:00 WIB
          </div>
          <h3 className="gold-text event-card-title">Akad Nikah</h3>
          <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <FaCalendarAlt color="#bf953f" />
              <span>Sabtu, 31 Januari 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <FaClock color="#bf953f" />
              <span>08.00 WIB - Selesai</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '25px' }}>
              <FaMapMarkerAlt color="#bf953f" style={{ marginTop: '5px' }} />
              <div>
                <span style={{ fontWeight: 'bold', display: 'block', color: '#333' }}>Masjid Kilat Kaduagung</span>
                <span style={{ fontSize: '0.9rem' }}>Jl. Gunung Kencana, Kaduagung Tim., Kec. Cibadak, Kabupaten Lebak, Banten</span>
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
        </div>

        {/* Resepsi */}
        <div className="anim-item glass-card event-card">
           <div className="event-card-badge">
            11:00 WIB
          </div>
          <h3 className="gold-text event-card-title">Resepsi</h3>
          <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <FaCalendarAlt color="#bf953f" />
              <span>Sabtu, 31 Januari 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <FaClock color="#bf953f" />
              <span>11.00 WIB - Selesai</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '25px' }}>
              <FaMapMarkerAlt color="#bf953f" style={{ marginTop: '5px' }} />
              <div>
                <span style={{ fontWeight: 'bold', display: 'block', color: '#333' }}>Kediaman Mempelai Wanita</span>
                <span style={{ fontSize: '0.9rem' }}>Jl. Gunung Kencana, Kaduagung Tim., Kec. Cibadak, Kabupaten Lebak, Banten</span>
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
        </div>

      </div>
    </div>
  )
}

export default EventDetail
