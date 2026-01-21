import { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, Float } from '@react-three/drei'
import * as THREE from 'three'
import ImageErrorBoundary from './ImageErrorBoundary'

// Global state to track dragging vs clicking
let isDraggingGlobal = false

interface CarouselItemProps {
  index: number
  count: number
  url: string
  radius?: number
  onClick?: () => void
}

function CarouselItem({ index, count, url, radius = 3, onClick }: CarouselItemProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const angle = (index / count) * Math.PI * 2
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  return (
    <group 
        position={[x, 0, z]} 
        rotation={[0, angle, 0]}
        onPointerOver={() => {
            setHovered(true)
            document.body.style.cursor = isDraggingGlobal ? 'grabbing' : 'pointer'
        }}
        onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
            e.stopPropagation()
            if (!isDraggingGlobal) {
                onClick?.()
            }
        }}
    >
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <ImageErrorBoundary fallback={null}>
                    <Image 
                        ref={ref} 
                        url={url} 
                        transparent 
                        side={THREE.DoubleSide} 
                        scale={hovered ? [2.5, 3.5] : [2, 3]}
                        opacity={hovered ? 1 : 0.85}
                    />
                </ImageErrorBoundary>
            </Float>
    </group>
  )
}

function DraggableRig({ children, speed = 0.1 }: { children: React.ReactNode, speed?: number }) {
  const ref = useRef<THREE.Group>(null)
  const { gl } = useThree()
  
  const state = useRef({
    isDragging: false,
    previousX: 0,
    velocity: 0,
    targetRotation: 0,
    currentRotation: 0
  })

  useEffect(() => {
    const canvas = gl.domElement
    
    const onDown = (e: PointerEvent) => {
      state.current.isDragging = true
      state.current.previousX = e.clientX
      state.current.velocity = 0
      isDraggingGlobal = false
      document.body.style.cursor = 'grabbing'
    }
    
    const onMove = (e: PointerEvent) => {
      if (!state.current.isDragging) return
      
      const delta = e.clientX - state.current.previousX
      state.current.previousX = e.clientX
      
      if (Math.abs(delta) > 1) {
          isDraggingGlobal = true
      }

      // Smoother sensitivity
      state.current.velocity = delta * 0.003
      state.current.targetRotation += state.current.velocity
    }
    
    const onUp = () => {
      state.current.isDragging = false
      document.body.style.cursor = 'auto'
      setTimeout(() => { isDraggingGlobal = false }, 100)
    }

    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [gl])

  useFrame((_state, delta) => {
    if (ref.current) {
      if (!state.current.isDragging) {
        // Higher friction for smoother decay (0.95 -> 0.98)
        state.current.velocity *= 0.98 
        
        if (Math.abs(state.current.velocity) < 0.0001) {
             state.current.targetRotation += speed * delta // Auto rotate
        } else {
             state.current.targetRotation += state.current.velocity // Momentum
        }
      }
      
      // Smooth interpolation (Lerp)
      state.current.currentRotation = THREE.MathUtils.lerp(
          state.current.currentRotation,
          state.current.targetRotation,
          0.1 // Smoothness factor
      )
      
      ref.current.rotation.y = state.current.currentRotation
    }
  })

  return <group ref={ref}>{children}</group>
}

function ResponsiveCamera() {
  const { camera, size } = useThree()
  
  useEffect(() => {
    const isMobile = size.width < 600
    // Adjust camera Z position based on screen width
    // Mobile needs to be further away to fit the carousel
    camera.position.z = isMobile ? 18 : 9
    camera.updateProjectionMatrix()
  }, [size, camera])
  
  return null
}

export default function Carousel3D({ images, onImageClick }: { images: string[], onImageClick?: (index: number) => void }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
        <Canvas camera={{ position: [0, 1, 9], fov: 50 }}>
            <ResponsiveCamera />
            <fog attach="fog" args={['#f8f8f8', 8, 25]} />
            <ambientLight intensity={0.8} />
            <Suspense fallback={null}>
                <DraggableRig speed={0.08}>
                    {images.map((img, i) => (
                        <CarouselItem 
                            key={i} 
                            index={i} 
                            count={images.length} 
                            url={img} 
                            radius={4.2}
                            onClick={() => onImageClick?.(i)}
                        />
                    ))}
                </DraggableRig>
            </Suspense>
        </Canvas>
    </div>
  )
}
