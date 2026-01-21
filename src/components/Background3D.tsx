import { Canvas } from '@react-three/fiber'
import { Float, Sparkles, PerspectiveCamera, ContactShadows } from '@react-three/drei'

function FloatingShapes() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 1, -3]} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[1.2, 0.1, 16, 100]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-2, -1, -4]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.9, 0.08, 16, 100]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 3, -5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#fff" roughness={0.2} metalness={0.5} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #fdfbf7, #f5efe6)' }}>
      <Canvas>
        <fog attach="fog" args={['#fdfbf7', 5, 20]} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        
        <Sparkles 
          count={150} 
          scale={12} 
          size={4} 
          speed={0.4} 
          opacity={0.7} 
          color="#d4af37"
        />
        
        <FloatingShapes />
        
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#8a6c1e" />
      </Canvas>
    </div>
  )
}
