import { useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import Quote from './components/Quote';
import Couple from './components/Couple';
import EventDetail from './components/EventDetail';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import FloralDecor from './components/FloralDecor';
import BottomBar from './components/BottomBar';
import './style.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="grain-overlay"></div>
      <Background3D />
      <FloralDecor />
      
      <Hero onOpen={() => setIsOpen(true)} />
      
      <div className="main-content" style={{ 
        position: 'relative', 
        zIndex: 1, 
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        pointerEvents: isOpen ? 'all' : 'none'
      }}>
        <div id="home"><Quote /></div>
        <div id="couple"><Couple /></div>
        <div id="event"><EventDetail /></div>
        <div id="gallery"><Gallery /></div>
        <div id="rsvp"><RSVP /></div>
        
        <footer style={{ textAlign: 'center', padding: '20px', fontSize: '0.8rem', color: '#666', marginBottom: '80px' }}>
          <p className="glass-card" style={{ display: 'inline-block', padding: '10px 20px' }}>&copy; 2026 Wulan & Fariz Wedding. All rights reserved.</p>
        </footer>
      </div>

      {isOpen && <BottomBar />}
    </div>
  );
}

export default App;
