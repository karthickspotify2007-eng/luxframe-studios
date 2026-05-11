'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePositionRef } from '@/hooks/useMousePosition'

const VERTEX_SHADER = `
  attribute float aSize;
  attribute float aRandom;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uMouse;
  uniform vec2 uMousePos;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Floating motion
    float noiseX = sin(pos.x * 0.5 + uTime * 0.3 + aRandom * 6.28) * 0.3;
    float noiseY = cos(pos.y * 0.4 + uTime * 0.2 + aRandom * 3.14) * 0.3;
    float noiseZ = sin(pos.z * 0.6 + uTime * 0.15) * 0.2;

    pos.x += noiseX;
    pos.y += noiseY;
    pos.z += noiseZ;

    // Mouse interaction
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vOpacity = 0.4 + 0.6 * sin(uTime * 0.5 + aRandom * 6.28);
  }
`

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;

    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 1.5);

    gl_FragColor = vec4(vColor, strength * vOpacity);
  }
`

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const mouseRef = useMousePositionRef()
  const targetRotation = useRef({ x: 0, y: 0 })

  const { positions, sizes, randoms, colors } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const randoms = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#1a6bff'),
      new THREE.Color('#00d4ff'),
      new THREE.Color('#6b21ff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#4d9fff'),
    ]

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 5

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 1

      sizes[i] = Math.random() * 1.5 + 0.3
      randoms[i] = Math.random()

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    return { positions, sizes, randoms, colors }
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: 0 },
    uMousePos: { value: new THREE.Vector2(0, 0) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    uniforms.uTime.value = state.clock.elapsedTime

    const mouse = mouseRef.current
    targetRotation.current.x += (mouse.normalizedY * 0.3 - targetRotation.current.x) * 0.05
    targetRotation.current.y += (mouse.normalizedX * 0.3 - targetRotation.current.y) * 0.05

    meshRef.current.rotation.x = targetRotation.current.x
    meshRef.current.rotation.y = targetRotation.current.y + state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingGeometry() {
  const group = useRef<THREE.Group>(null)
  const mouseRef = useMousePositionRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = t * 0.06
    group.current.rotation.x = Math.sin(t * 0.08) * 0.1

    const mouse = mouseRef.current
    group.current.position.x += (mouse.normalizedX * 0.5 - group.current.position.x) * 0.02
    group.current.position.y += (mouse.normalizedY * 0.3 - group.current.position.y) * 0.02
  })

  return (
    <group ref={group}>
      {/* Camera lens geometry */}
      <mesh position={[0, 0, 0]} rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#1a6bff"
          emissive="#1a6bff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0.8, 0.2, 0.5]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Center sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

function LightRays() {
  const mouseRef = useMousePositionRef()
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (!lightRef.current) return
    const mouse = mouseRef.current
    lightRef.current.position.x += (mouse.normalizedX * 3 - lightRef.current.position.x) * 0.05
    lightRef.current.position.y += (mouse.normalizedY * 2 - lightRef.current.position.y) * 0.05
  })

  return (
    <>
      <pointLight ref={lightRef} color="#1a6bff" intensity={3} distance={8} />
      <pointLight position={[2, 2, 2]} color="#00d4ff" intensity={1.5} distance={6} />
      <pointLight position={[-2, -1, 1]} color="#6b21ff" intensity={1} distance={5} />
      <ambientLight intensity={0.1} />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <LightRays />
        <ParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
