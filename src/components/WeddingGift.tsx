import { useRef, useState, useEffect } from 'react'
import { FaGift, FaCopy, FaCheck } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from './TiltCard'

gsap.registerPlugin(ScrollTrigger)

const accounts = [
  {
    bank: 'BCA',
    number: '1234567890',
    name: 'Wulan Mandasari',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png'
  },
  {
    bank: 'Mandiri',
    number: '0987654321',
    name: 'Fariz Ananta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png'
  }
]

const WeddingGift = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gift-anim',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div ref={sectionRef} className="section container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div className="gift-anim" style={{ marginBottom: '50px' }}>
        <div style={{ 
          width: '60px', height: '60px', background: 'rgba(191, 149, 63, 0.1)', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 20px', color: '#bf953f' 
        }}>
          <FaGift size={24} />
        </div>
        <h2 className="gold-text script-font section-title-large">Wedding Gift</h2>
        <p style={{ color: '#666', fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
        {accounts.map((acc, index) => (
          <TiltCard key={index} className="gift-anim glass-card" style={{ padding: '30px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ height: '30px' }}>
                <img src={acc.logo} alt={acc.bank} style={{ height: '100%', objectFit: 'contain' }} />
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR" style={{ width: '60px', opacity: 0.8 }} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px' }}>Nomor Rekening</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span className="gold-text" style={{ fontSize: '1.5rem', fontFamily: 'Montserrat', fontWeight: 600, letterSpacing: '1px' }}>{acc.number}</span>
                <button 
                  onClick={() => handleCopy(acc.number, index)}
                  style={{ 
                    background: 'none', border: 'none', cursor: 'pointer', color: '#bf953f',
                    display: 'flex', alignItems: 'center', fontSize: '0.9rem', padding: '5px'
                  }}
                  title="Salin Nomor Rekening"
                >
                  {copiedIndex === index ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
            </div>

            <p style={{ fontSize: '1.1rem', color: '#444', fontWeight: 500 }}>a.n {acc.name}</p>

            {/* Decorative Circle */}
            <div style={{ 
              position: 'absolute', bottom: '-50px', right: '-50px', 
              width: '150px', height: '150px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, rgba(191, 149, 63, 0.1), transparent)', 
              zIndex: 0 
            }}></div>
          </TiltCard>
        ))}
      </div>
    </div>
  )
}

export default WeddingGift
