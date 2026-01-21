import React, { useState, useEffect, useRef } from 'react'
import { FaUser, FaComment, FaCheckCircle, FaPaperPlane } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // alert('Terima kasih atas konfirmasinya!')
  }

  return (
    <div className="section container" style={{ textAlign: 'center', marginBottom: '120px' }}>
      <div ref={containerRef} className="glass-card rsvp-card" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        
        {!isSubmitted ? (
          <>
            <h2 className="gold-text script-font rsvp-title section-title-large" style={{ marginBottom: '10px' }}>RSVP</h2>
            <p className="rsvp-subtitle" style={{ marginBottom: '40px', fontSize: '1.1rem', color: '#666' }}>
              Kehadiran Anda adalah kado terindah bagi kami. <br/>
              Mohon konfirmasi kehadiran Anda.
            </p>
            
            <form ref={formRef} onSubmit={handleSubmit} className="rsvp-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#d4af37', zIndex: 1 }} />
                <input type="text" placeholder="Nama Lengkap" required className="glass-input" style={{ paddingLeft: '45px' }} />
              </div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#d4af37', zIndex: 1, pointerEvents: 'none' }}>
                  <FaCheckCircle />
                </div>
                <select className="glass-input" style={{ paddingLeft: '45px', appearance: 'none' }}>
                  <option value="Hadir">Saya akan hadir</option>
                  <option value="Tidak Hadir">Maaf, saya tidak bisa hadir</option>
                  <option value="Ragu-ragu">Masih ragu-ragu</option>
                </select>
              </div>
              
              <div style={{ position: 'relative' }}>
                <FaComment style={{ position: 'absolute', left: '15px', top: '20px', color: '#d4af37', zIndex: 1 }} />
                <textarea placeholder="Ucapan & Doa Restu" rows={4} className="glass-input" style={{ paddingLeft: '45px', resize: 'vertical' }}></textarea>
              </div>
              
              <button type="submit" className="btn" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <FaPaperPlane size={14} /> Kirim Konfirmasi
              </button>
            </form>
          </>
        ) : (
          <div style={{ padding: '40px 0', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #bf953f, #aa771c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(191, 149, 63, 0.3)' }}>
              <FaCheckCircle size={40} color="white" />
            </div>
            <h3 className="script-font" style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '15px' }}>Terima Kasih</h3>
            <p>Konfirmasi kehadiran Anda telah kami terima.</p>
            <p>Sampai jumpa di hari bahagia kami!</p>
            <button className="btn" onClick={() => setIsSubmitted(false)} style={{ marginTop: '30px', fontSize: '0.8rem', padding: '8px 20px' }}>Kirim lagi</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RSVP
