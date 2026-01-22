import { useState, useRef, useEffect } from 'react'
import { FaMusic, FaPause } from 'react-icons/fa'
import gsap from 'gsap'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto play when component mounts (or when user interacts with page if blocked)
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.5
      // Attempt to play automatically
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.log("Auto-play prevented:", error)
          setIsPlaying(false)
        })
      }
    }

    // Animation for the rotating disc
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'linear',
        paused: !isPlaying
      })
    }
  }, [])

  useEffect(() => {
    // Control rotation animation based on playing state
    if (containerRef.current) {
      if (isPlaying) {
        gsap.globalTimeline.resume()
      } else {
        gsap.globalTimeline.pause()
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/02/07/audio_18220158c5.mp3" />
      
      <button 
        onClick={togglePlay}
        className="glass-card"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          border: '1px solid #bf953f',
          color: '#bf953f',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          padding: 0
        }}
      >
        <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isPlaying ? <FaMusic size={20} /> : <FaPause size={20} />}
        </div>
      </button>
      
      {/* Music Waves Animation */}
      {isPlaying && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
           <div className="music-wave" style={{
             position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
             width: '100%', height: '100%', borderRadius: '50%', border: '1px solid #bf953f',
             opacity: 0, animation: 'ripple 2s infinite linear'
           }}></div>
           <div className="music-wave" style={{
             position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
             width: '100%', height: '100%', borderRadius: '50%', border: '1px solid #bf953f',
             opacity: 0, animation: 'ripple 2s infinite linear 1s'
           }}></div>
        </div>
      )}

      <style>{`
        @keyframes ripple {
          0% { width: 50px; height: 50px; opacity: 0.8; }
          100% { width: 100px; height: 100px; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default MusicPlayer
