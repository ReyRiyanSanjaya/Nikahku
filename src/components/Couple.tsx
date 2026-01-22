import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaInstagram } from 'react-icons/fa'
import TiltCard from './TiltCard'

gsap.registerPlugin(ScrollTrigger)

const Couple = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const brideRef = useRef<HTMLDivElement>(null)
  const groomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.header-anim', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Couple Cards Animation
      const cards = document.querySelectorAll('.couple-card');
      cards.forEach((card, index) => {
         gsap.fromTo(card, 
           { opacity: 0, y: 80 },
           { 
             opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: index * 0.3,
             scrollTrigger: {
               trigger: card,
               start: 'top 85%',
             }
           }
         )
      });

    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="section container" style={{ padding: '120px 20px', overflow: 'hidden' }}>
      
      {/* Header */}
      <div className="header-anim" style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h2 className="gold-text script-font" style={{ fontSize: '4.5rem', marginBottom: '20px' }}>Sang Mempelai</h2>
        <p style={{ 
            maxWidth: '650px', margin: '0 auto', fontSize: '1.2rem', 
            fontFamily: 'Cormorant Garamond', fontStyle: 'italic', color: '#666', lineHeight: 1.8 
        }}>
          "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah."
          <br />
          <span style={{ fontSize: '0.9rem', marginTop: '10px', display: 'block', fontWeight: 600 }}>(QS. Adz-Dzariyat: 49)</span>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', maxWidth: '1000px', margin: '0 auto', alignItems: 'start' }}>
        
        {/* Bride Section */}
        <TiltCard className="couple-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="image-frame-container" style={{ position: 'relative', marginBottom: '35px' }}>
                <div style={{ 
                    position: 'absolute', top: '15px', left: '15px', width: '100%', height: '100%', 
                    border: '1px solid #bf953f', borderRadius: '200px 200px 0 0', zIndex: 0, opacity: 0.6 
                }}></div>
                <div style={{ 
                    width: '320px', height: '450px', borderRadius: '200px 200px 0 0', overflow: 'hidden', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1, backgroundColor: '#f0f0f0' 
                }}>
                    <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                        alt="Wulan" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>
            </div>

            <h3 className="gold-text script-font" style={{ fontSize: '3rem', marginBottom: '5px' }}>Wulan Mandasari</h3>
            <p style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '25px', color: '#999', fontWeight: 600 }}>The Beautiful Bride</p>
            
            <div style={{ width: '40px', height: '1px', background: '#bf953f', marginBottom: '25px', opacity: 0.4 }}></div>
            
            <p style={{fontStyle: 'italic', marginBottom: '8px', fontSize: '0.95rem', color: '#777', fontFamily: 'Cormorant Garamond'}}>Putri tercinta dari pasangan</p>
            <p style={{fontWeight: '600', fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', color: '#444', lineHeight: 1.4}}>
                Bpk. Galang Prasetyo<br/>& Ibu Dewi Yolanda
            </p>

            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '25px', color: '#bf953f', textDecoration: 'none', fontSize: '1.2rem', transition: 'color 0.3s' }}>
                <FaInstagram /> <span style={{ fontSize: '0.85rem', fontFamily: 'Montserrat', fontWeight: 500 }}>@wulanmanda</span>
            </a>
        </TiltCard>

        {/* Groom Section */}
        <TiltCard className="couple-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="image-frame-container" style={{ position: 'relative', marginBottom: '35px' }}>
                <div style={{ 
                    position: 'absolute', top: '15px', right: '15px', width: '100%', height: '100%', 
                    border: '1px solid #bf953f', borderRadius: '200px 200px 0 0', zIndex: 0, opacity: 0.6 
                }}></div>
                <div style={{ 
                    width: '320px', height: '450px', borderRadius: '200px 200px 0 0', overflow: 'hidden', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1, backgroundColor: '#f0f0f0' 
                }}>
                    <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" 
                        alt="Fariz" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>
            </div>

            <h3 className="gold-text script-font" style={{ fontSize: '3rem', marginBottom: '5px' }}>Fariz Ananta</h3>
            <p style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '25px', color: '#999', fontWeight: 600 }}>The Handsome Groom</p>
            
            <div style={{ width: '40px', height: '1px', background: '#bf953f', marginBottom: '25px', opacity: 0.4 }}></div>
            
            <p style={{fontStyle: 'italic', marginBottom: '8px', fontSize: '0.95rem', color: '#777', fontFamily: 'Cormorant Garamond'}}>Putra tercinta dari pasangan</p>
            <p style={{fontWeight: '600', fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', color: '#444', lineHeight: 1.4}}>
                Bpk. Arya Saputra<br/>& Ibu Dian Wahyuni
            </p>

            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '25px', color: '#bf953f', textDecoration: 'none', fontSize: '1.2rem', transition: 'color 0.3s' }}>
                <FaInstagram /> <span style={{ fontSize: '0.85rem', fontFamily: 'Montserrat', fontWeight: 500 }}>@farizananta</span>
            </a>
        </TiltCard>

      </div>
    </div>
  )
}

export default Couple
