import { useState, useEffect } from 'react';
import { FaHome, FaHeart, FaImages, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const BottomBar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show bottom bar after initial load/scroll
    const timer = setTimeout(() => setIsVisible(true), 1000);
    
    const handleScroll = () => {
      const sections = ['home', 'couple', 'event', 'gallery', 'rsvp'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bottom-bar-container">
      <div className="bottom-bar glass-card">
        <button 
          className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => scrollToSection('home')}
        >
          <FaHome size={20} />
          <span>Beranda</span>
        </button>
        <button 
          className={`nav-item ${activeSection === 'couple' ? 'active' : ''}`}
          onClick={() => scrollToSection('couple')}
        >
          <FaHeart size={20} />
          <span>Mempelai</span>
        </button>
        <button 
          className={`nav-item ${activeSection === 'event' ? 'active' : ''}`}
          onClick={() => scrollToSection('event')}
        >
          <FaCalendarAlt size={20} />
          <span>Acara</span>
        </button>
        <button 
          className={`nav-item ${activeSection === 'gallery' ? 'active' : ''}`}
          onClick={() => scrollToSection('gallery')}
        >
          <FaImages size={20} />
          <span>Galeri</span>
        </button>
        <button 
          className={`nav-item ${activeSection === 'rsvp' ? 'active' : ''}`}
          onClick={() => scrollToSection('rsvp')}
        >
          <FaEnvelope size={20} />
          <span>RSVP</span>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
