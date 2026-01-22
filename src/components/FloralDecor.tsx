import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloralDecor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const corners = containerRef.current.children;
    
    // Gentle floating animation
    gsap.to(corners, {
      y: '+=15',
      duration: 3,
      stagger: 0.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Subtle breathing effect
    gsap.to(corners, {
      scale: 1.05,
      duration: 4,
      stagger: 0.3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

  }, []);

  const floralUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Corner_Ornament_Gold_Up_Left.png/500px-Corner_Ornament_Gold_Up_Left.png";

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
      {/* Top Left Corner */}
      <div className="floral-corner large" style={{ position: 'absolute', top: -40, left: -40, width: '280px', height: '280px', opacity: 0.6 }}>
        <img 
          src={floralUrl}
          alt="Floral Top Left" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(0deg)' }}
        />
      </div>

      {/* Bottom Right Corner */}
      <div className="floral-corner large" style={{ position: 'absolute', bottom: -40, right: -40, width: '280px', height: '280px', opacity: 0.6 }}>
        <img 
          src={floralUrl}
          alt="Floral Bottom Right" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(180deg)' }}
        />
      </div>

      {/* Top Right Corner - Smaller */}
      <div className="floral-corner" style={{ position: 'absolute', top: -30, right: -30, width: '200px', height: '200px', opacity: 0.4 }}>
        <img 
          src={floralUrl}
          alt="Floral Top Right" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(90deg)' }}
        />
      </div>
      
      {/* Bottom Left Corner - Smaller */}
      <div className="floral-corner" style={{ position: 'absolute', bottom: -30, left: -30, width: '200px', height: '200px', opacity: 0.4 }}>
        <img 
          src={floralUrl}
          alt="Floral Bottom Left" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(-90deg)' }}
        />
      </div>
    </div>
  )
}

export default FloralDecor;
