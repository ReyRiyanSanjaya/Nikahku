import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaInstagram } from 'react-icons/fa'

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

      // Bride Animation (Left to Right)
      if (brideRef.current) {
          gsap.fromTo(brideRef.current.querySelector('.couple-img-container'),
            { x: -100, opacity: 0 },
            { 
              x: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
              scrollTrigger: { trigger: brideRef.current, start: 'top 75%' }
            }
          )
          gsap.fromTo(brideRef.current.querySelector('.couple-info'),
            { x: 50, opacity: 0 },
            { 
              x: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: 'power3.out',
              scrollTrigger: { trigger: brideRef.current, start: 'top 75%' }
            }
          )
      }

      // Groom Animation (Right to Left)
      if (groomRef.current) {
        gsap.fromTo(groomRef.current.querySelector('.couple-img-container'),
            { x: 100, opacity: 0 },
            { 
              x: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
              scrollTrigger: { trigger: groomRef.current, start: 'top 75%' }
            }
          )
          gsap.fromTo(groomRef.current.querySelector('.couple-info'),
            { x: -50, opacity: 0 },
            { 
              x: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: 'power3.out',
              scrollTrigger: { trigger: groomRef.current, start: 'top 75%' }
            }
          )
      }

    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="section container" style={{ padding: '100px 20px', overflow: 'hidden' }}>
      
      {/* Header */}
      <div className="header-anim" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 className="gold-text script-font couple-header-title">Mempelai</h2>
        <p style={{ 
            maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', 
            fontFamily: 'Cormorant Garamond', fontStyle: 'italic', color: '#666', lineHeight: 1.8 
        }}>
          "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami."
        </p>
      </div>

      {/* Couple Content */}
              <div className="couple-container">
                {/* Bride Section */}
                <div ref={brideRef} className="couple-block reverse">
                  {/* Info */}
                  <div className="couple-info couple-info-wrapper glass-card" style={{ textAlign: 'right' }}>
                    <h3 className="gold-text script-font couple-name">Wulan Mandasari</h3>
                    <p style={{ fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', color: '#999' }}>The Bride</p>
                    
                    <div className="couple-divider" style={{ width: '60px', height: '2px', background: '#bf953f', margin: '0 0 20px auto' }}></div>
                    
                    <p style={{fontStyle: 'italic', marginBottom: '5px', fontSize: '1rem', color: '#555'}}>Putri dari</p>
                    <p style={{fontWeight: '600', fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: '#333'}}>
                      Bpk. Galang Prasetyo<br/>& Ibu Dewi Yolanda
                    </p>

                     <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: '#bf953f', textDecoration: 'none', fontSize: '1.1rem', justifyContent: 'inherit' }}>
                        <FaInstagram /> <span style={{ fontSize: '0.9rem', fontFamily: 'Montserrat' }}>@wulanmanda</span>
                     </a>
                  </div>

                  {/* Image */}
                  <div className="couple-img-container couple-img-wrapper">
                     <div style={{ 
                         position: 'absolute', top: '-20px', right: '-20px', width: '100%', height: '100%', 
                         border: '2px solid rgba(191, 149, 63, 0.3)', borderRadius: '100px 0 100px 0', zIndex: 0 
                     }}></div>
                     <div className="couple-img-inner bride" style={{ 
                         borderRadius: '100px 0 100px 0', overflow: 'hidden', 
                         boxShadow: '0 20px 50px rgba(0,0,0,0.15)', position: 'relative', zIndex: 1 
                     }}>
                        <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                            alt="Wulan" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                     </div>
                  </div>

                </div>

                {/* Connector */}
                <div className="couple-connector" style={{ textAlign: 'center', opacity: 0.3 }}>
                     <span className="script-font gold-text" style={{ fontSize: '6rem' }}>&</span>
                </div>

                {/* Groom Section */}
                <div ref={groomRef} className="couple-block">
                  {/* Info */}
                  <div className="couple-info couple-info-wrapper glass-card" style={{ textAlign: 'left' }}>
                    <h3 className="gold-text script-font couple-name">Fariz Ananta</h3>
                    <p style={{ fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', color: '#999' }}>The Groom</p>
                    
                    <div className="couple-divider" style={{ width: '60px', height: '2px', background: '#bf953f', margin: '0 auto 20px 0' }}></div>
                    
                    <p style={{fontStyle: 'italic', marginBottom: '5px', fontSize: '1rem', color: '#555'}}>Putra dari</p>
                    <p style={{fontWeight: '600', fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: '#333'}}>
                      Bpk. Arya Saputra<br/>& Ibu Dian Wahyuni
                    </p>

                    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: '#bf953f', textDecoration: 'none', fontSize: '1.1rem', justifyContent: 'inherit' }}>
                        <FaInstagram /> <span style={{ fontSize: '0.9rem', fontFamily: 'Montserrat' }}>@farizananta</span>
                     </a>
                  </div>

                  {/* Image */}
                  <div className="couple-img-container couple-img-wrapper">
                     <div style={{ 
                         position: 'absolute', bottom: '-20px', left: '-20px', width: '100%', height: '100%', 
                         border: '2px solid rgba(191, 149, 63, 0.3)', borderRadius: '0 100px 0 100px', zIndex: 0 
                     }}></div>
                     <div className="couple-img-inner groom" style={{ 
                         borderRadius: '0 100px 0 100px', overflow: 'hidden', 
                         boxShadow: '0 20px 50px rgba(0,0,0,0.15)', position: 'relative', zIndex: 1 
                     }}>
                        <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" 
                            alt="Fariz" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                     </div>
                  </div>

                </div>

              </div>
    </div>
  )
}

export default Couple
