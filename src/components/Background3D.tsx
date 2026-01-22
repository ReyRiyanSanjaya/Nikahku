import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, PerspectiveCamera, Stars, Text, Image, Environment, MeshTransmissionMaterial, CameraShake, Cloud, Sky } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

function CameraRig() {
  const { camera, pointer } = useThree()
  
  useFrame(() => {
    // Calculate scroll progress based on window scroll
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0
    
    // Move camera forward based on scroll
    // Start at z=8 (entrance), move deep into the hall (z=-30)
    const targetZ = 8 - (progress * 45) // Go a bit further to see the couple
    
    // Smooth movement for Z
    camera.position.z += (targetZ - camera.position.z) * 0.05
    
    // Add mouse parallax (look around)
    // Small sway based on pointer position
    const targetX = pointer.x * 0.8
    const targetY = pointer.y * 0.8
    
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    
    // Look slightly ahead
    camera.lookAt(0, 0, camera.position.z - 10)
  })
  
  return null
}

function Butterfly({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  const [speed] = useState(() => 0.5 + Math.random() * 2)
  const [offset] = useState(() => Math.random() * 100)
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime()
      ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.5
      ref.current.rotation.y = Math.sin(t * 2 + offset) * 0.5
      ref.current.rotation.z = Math.cos(t * 3 + offset) * 0.2
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh position={[-0.2, 0, 0]} rotation={[0, -0.5, 0]}>
         <circleGeometry args={[0.15, 32]} />
         <meshStandardMaterial color="#fffdcb" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, 0.5, 0]}>
         <circleGeometry args={[0.15, 32]} />
         <meshStandardMaterial color="#fffdcb" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function Butterflies() {
  const butterflies = useMemo(() => Array.from({ length: 30 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 4 + 1,
      (Math.random() - 0.5) * 20
    ] as [number, number, number]
  })), [])
  
  return (
    <group>
      {butterflies.map((b, i) => (
        <Butterfly key={i} position={b.position} />
      ))}
    </group>
  )
}

function FlowerBush({ position }: { position: [number, number, number] }) {
  const flowers = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1,
        (Math.random() - 0.5) * 1.5
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.3,
      color: Math.random() > 0.5 ? "#ffb7b2" : "#ffd1dc"
    }))
  }, [])

  return (
    <group position={position}>
      {flowers.map((f, i) => (
        <mesh key={i} position={f.position} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <sphereGeometry args={[f.scale, 8, 8]} />
          <meshStandardMaterial color={f.color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function FlowerRoad() {
  // Create clusters of flowers along the aisle
  const clusters = useMemo(() => {
    const items = []
    for (let z = 0; z > -40; z -= 3) {
      // Left side
      items.push({ position: [-4.5, -2, z] as [number, number, number] })
      // Right side
      items.push({ position: [4.5, -2, z] as [number, number, number] })
    }
    return items
  }, [])

  return (
    <group>
      {clusters.map((cluster, i) => (
        <FlowerBush key={i} position={cluster.position} />
      ))}
    </group>
  )
}

function CoupleDisplay() {
  return (
    <group position={[0, 0, -38]}>
      {/* Main Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <MeshTransmissionMaterial
            backside
            backsideThickness={1}
            thickness={2}
            roughness={0.2}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.5}
            anisotropy={20}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.5}
            color="#bf953f"
        />
      </mesh>
      
      {/* Inner Picture Area with Image */}
      <Image 
        url="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
        position={[0, 0, 0.11]}
        scale={[5.5, 3.5]}
        transparent
        opacity={0.9}
      />
      
      {/* Text Overlay */}
      <Text
        position={[0, 0.5, 0.12]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#bf953f"
      >
        The Wedding Of
      </Text>
      
      <Text
        position={[0, -0.5, 0.12]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://db.onlinewebfonts.com/t/5bf06596a053153248631d74f9fc4e28.woff"
        outlineWidth={0.02}
        outlineColor="#bf953f"
      >
        Wulan & Fariz
      </Text>
      
      {/* Decorative Lights around frame */}
      <pointLight position={[0, 2, 1]} intensity={2} color="#ffd1dc" distance={8} />
    </group>
  )
}

function WeddingAisle() {
  const items = useMemo(() => Array.from({ length: 12 }), [])
  
  return (
    <group>
      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -15]}>
        <planeGeometry args={[12, 60]} />
        <MeshTransmissionMaterial
            roughness={0.1}
            transmission={0.5}
            thickness={0} // Thin surface
            chromaticAberration={0.2}
            color="#fcfbf7"
        />
      </mesh>
      
      {items.map((_, i) => (
        <group key={i} position={[0, -0.5, -i * 5]}>
            {/* Golden Arch */}
            <mesh position={[0, 2, 0]}>
                <torusGeometry args={[3.5, 0.15, 16, 100, Math.PI]} />
                {/* Modern Glass/Crystal Material */}
                <MeshTransmissionMaterial
                  backside
                  backsideThickness={5}
                  thickness={2}
                  roughness={0}
                  transmission={1}
                  ior={1.5}
                  chromaticAberration={1}
                  anisotropy={20}
                  distortion={0.2}
                  distortionScale={0.3}
                  temporalDistortion={0.5}
                  color="#bf953f"
                  attenuationColor="#ffffff"
                  attenuationDistance={0.5}
                />
            </mesh>
            
            {/* Pillars Left */}
            <mesh position={[-3.5, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 4, 32]} />
                <meshStandardMaterial color="#fff" roughness={0.3} />
            </mesh>
             {/* Base Left */}
             <mesh position={[-3.5, -2, 0]}>
                <boxGeometry args={[0.8, 0.4, 0.8]} />
                <meshStandardMaterial color="#fff" roughness={0.3} />
            </mesh>

            {/* Pillars Right */}
            <mesh position={[3.5, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 4, 32]} />
                <meshStandardMaterial color="#fff" roughness={0.3} />
            </mesh>
             {/* Base Right */}
             <mesh position={[3.5, -2, 0]}>
                <boxGeometry args={[0.8, 0.4, 0.8]} />
                <meshStandardMaterial color="#fff" roughness={0.3} />
            </mesh>
            
            {/* Hanging Lanterns (Simulated) */}
            <mesh position={[0, 3.2, 0]}>
               <sphereGeometry args={[0.15, 16, 16]} />
               <meshStandardMaterial emissive="#fff" emissiveIntensity={2} color="#fff" />
            </mesh>
            <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd1dc" distance={5} />
        </group>
      ))}
      
      {/* Side Decorations - Floating Frames */}
      {items.map((_, i) => (
        <group key={`frame-${i}`} position={[i % 2 === 0 ? -5 : 5, 1, -i * 5 + 2.5]}>
           <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
             <mesh rotation={[0, i % 2 === 0 ? 0.5 : -0.5, 0]}>
               <boxGeometry args={[0.1, 3, 2]} />
               <meshStandardMaterial color="#bf953f" metalness={0.8} roughness={0.1} wireframe />
             </mesh>
           </Float>
        </group>
      ))}
    </group>
  )
}

function Petal({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [speed] = useState(() => 0.02 + Math.random() * 0.05)
  const [rotationAxis] = useState(() => new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize())
  const [rotationSpeed] = useState(() => Math.random() * 0.05)
  const [swayOffset] = useState(() => Math.random() * Math.PI * 2)
  
  // Custom petal shape
  const petalShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    // Create a natural petal curve
    shape.bezierCurveTo(0.1, 0.1, 0.2, 0.3, 0, 0.5)
    shape.bezierCurveTo(-0.2, 0.3, -0.1, 0.1, 0, 0)
    return shape
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Fall movement
      meshRef.current.position.y -= speed
      
      // Swaying movement
      const t = state.clock.getElapsedTime()
      meshRef.current.position.x += Math.sin(t * 1.5 + swayOffset) * 0.01
      meshRef.current.position.z += Math.cos(t * 1 + swayOffset) * 0.005
      
      // Rotation
      meshRef.current.rotateOnAxis(rotationAxis, rotationSpeed)
      
      // Reset position when out of view
      if (meshRef.current.position.y < -15) {
        meshRef.current.position.y = 15
        meshRef.current.position.x = (Math.random() - 0.5) * 20
        meshRef.current.position.z = (Math.random() - 0.5) * 15
        // Reset rotation
        meshRef.current.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
      <shapeGeometry args={[petalShape]} />
      <meshStandardMaterial 
        color={color} 
        side={THREE.DoubleSide} 
        transparent 
        opacity={0.8} 
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  )
}

function FloatingPetals() {
  const count = 100 // Increased count
  const colors = ["#ffb7b2", "#ffd1dc", "#ff9e99", "#fff0f5", "#ffffff"]
  
  const petals = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 30,
        (Math.random() * 30) - 15
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }, [])
  
  return (
    <group>
      {petals.map((petal, i) => (
        <Petal key={i} position={petal.position} color={petal.color} />
      ))}
    </group>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const { size } = useThree()
  const isMobile = size.width < 768
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group>
      <Stars radius={100} depth={50} count={isMobile ? 1000 : 2000} factor={4} saturation={0} fade speed={1} />
      <Sparkles 
        count={isMobile ? 200 : 500} 
        scale={15} 
        size={3} 
        speed={0.4} 
        opacity={0.6} 
        color="#d4af37"
      />
      <Sparkles 
        count={isMobile ? 100 : 200} 
        scale={10} 
        size={5} 
        speed={0.2} 
        opacity={0.3} 
        color="#fff"
      />
    </group>
  )
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, #fdfbf7 0%, #f7f1e3 100%)' }}>
      <Canvas gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#fdfbf7', 5, 25]} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        <CameraRig />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <pointLight position={[-10, -5, -5]} intensity={1} color="#d4af37" />
        
        <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
        
        <Cloud 
          opacity={0.3} 
          speed={0.2} 
          bounds={[10, 2, 10]}
          segments={20} 
          position={[0, 5, -10]}
          color="#fff0f5"
        />

        <ParticleField />
        <WeddingAisle />
        <FlowerRoad />
        <CoupleDisplay />
        <FloatingPetals />
        <Butterflies />
        
        {/* Environment for realistic reflections */}
        <Environment preset="sunset" blur={0.6} />
        
        {/* Subtle Camera Shake for realism */}
        <CameraShake 
          maxYaw={0.005} 
          maxPitch={0.005} 
          maxRoll={0.005} 
          yawFrequency={0.1} 
          pitchFrequency={0.1} 
          rollFrequency={0.1} 
          intensity={0.5} 
        />
      </Canvas>
    </div>
  )
}
