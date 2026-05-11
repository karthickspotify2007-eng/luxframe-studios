'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useMousePositionRef } from '@/hooks/useMousePosition'

function CameraBody({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePositionRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y += Math.sin(t * 0.5 + position[0]) * 0.002
    groupRef.current.rotation.y += 0.003
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Camera body */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.9, 0.6]} />
        <meshStandardMaterial
          color="#0a1628"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Lens */}
      <mesh position={[0, 0, 0.45]}>
        <cylinderGeometry args={[0.28, 0.32, 0.5, 32]} />
        <meshStandardMaterial
          color="#050a14"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={3}
        />
      </mesh>

      {/* Lens glass */}
      <mesh position={[0, 0, 0.72]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial
          color="#1a6bff"
          transparent
          opacity={0.7}
          metalness={0.1}
          roughness={0}
          emissive="#00d4ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Viewfinder bump */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#080f1e" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Accent lines */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.55]} />
        <meshStandardMaterial
          color="#1a6bff"
          emissive="#1a6bff"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

function PhotoFrame({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + index * 1.5) * 0.15
    ref.current.rotation.y = Math.sin(t * 0.2 + index) * 0.15
    ref.current.rotation.z = Math.cos(t * 0.15) * 0.05
  })

  const color = ['#1a6bff', '#00d4ff', '#6b21ff'][index % 3]

  return (
    <group ref={ref} position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[1.4, 1.8, 0.04]} />
        <meshStandardMaterial
          color="#0a1628"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Image area */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[1.2, 1.6, 0.01]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Edge glow */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.45, 1.85, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}

function GlowingSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3
    ref.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.1)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <MeshDistortMaterial
        color="#1a6bff"
        emissive="#00d4ff"
        emissiveIntensity={0.6}
        distort={0.5}
        speed={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function Scene() {
  const mouseRef = useMousePositionRef()
  const cameraGroupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!cameraGroupRef.current) return
    const mouse = mouseRef.current
    cameraGroupRef.current.rotation.y += (mouse.normalizedX * 0.1 - cameraGroupRef.current.rotation.y) * 0.03
    cameraGroupRef.current.rotation.x += (-mouse.normalizedY * 0.05 - cameraGroupRef.current.rotation.x) * 0.03
  })

  return (
    <group ref={cameraGroupRef}>
      <CameraBody position={[-2, 0.5, 0]} rotation={[0.1, 0.3, -0.1]} />
      <CameraBody position={[2.5, -0.5, -1]} rotation={[-0.1, -0.4, 0.05]} />

      <PhotoFrame position={[-3.5, 0, -2]} index={0} />
      <PhotoFrame position={[0, 1, -3]} index={1} />
      <PhotoFrame position={[3.5, -0.5, -2]} index={2} />

      <GlowingSphere position={[0, -1.5, 0]} />

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const theta = (i / 30) * Math.PI * 2
        const r = 3 + Math.random() * 2
        return (
          <Float
            key={i}
            speed={1 + Math.random()}
            rotationIntensity={0.3}
            floatIntensity={0.5}
          >
            <mesh
              position={[
                r * Math.cos(theta),
                (Math.random() - 0.5) * 4,
                r * Math.sin(theta) - 2,
              ]}
            >
              <sphereGeometry args={[0.02 + Math.random() * 0.04, 8, 8]} />
              <meshStandardMaterial
                color={['#1a6bff', '#00d4ff', '#6b21ff'][i % 3]}
                emissive={['#1a6bff', '#00d4ff', '#6b21ff'][i % 3]}
                emissiveIntensity={2}
              />
            </mesh>
          </Float>
        )
      })}

      <Environment preset="city" />
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} color="#1a6bff" intensity={4} />
      <pointLight position={[-3, -2, 2]} color="#00d4ff" intensity={3} />
      <pointLight position={[0, 0, 5]} color="#6b21ff" intensity={2} />
    </group>
  )
}

export default function ThreeScene() {
  return (
    <section className="relative w-full min-h-screen bg-lux-black overflow-hidden flex items-center">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-lux-black via-lux-navy to-lux-black" />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text side */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#1a6bff] uppercase mb-6">
              — Our Process
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-none mb-6">
              <span className="text-white">BEYOND</span>
              <br />
              <span className="gradient-text">THE LENS</span>
            </h2>
            <p className="text-[#a8b3cf] font-light leading-relaxed max-w-md">
              Every session is engineered as a cinematic experience. We blend
              technical precision with artistic vision to create imagery that
              stops time and commands attention.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              {
                icon: '◎',
                title: 'Pre-Production',
                desc: 'Conceptual development, mood board creation, location scouting',
              },
              {
                icon: '▶',
                title: 'The Shoot',
                desc: 'Cinematic lighting rigs, motion capture, multi-camera setups',
              },
              {
                icon: '✦',
                title: 'Post-Production',
                desc: 'Cinematic color grading, retouching, compositing, delivery',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-5 p-5 glass rounded-xl hover:glass-blue transition-all duration-400 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl text-[#1a6bff] group-hover:text-[#00d4ff] transition-colors mt-1">
                  {step.icon}
                </span>
                <div>
                  <h3 className="text-white font-semibold text-sm tracking-wider mb-1">{step.title}</h3>
                  <p className="text-[#a8b3cf]/70 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Canvas side */}
        <motion.div
          className="relative h-[600px] lg:h-[700px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Glow behind canvas */}
          <div className="absolute inset-0 bg-glow-radial opacity-40 pointer-events-none" />

          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 7], fov: 55 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent', borderRadius: '20px' }}
          >
            <AdaptiveDpr pixelated />
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>

          {/* Overlay labels */}
          <div className="absolute top-6 left-6 glass px-4 py-2 rounded-lg pointer-events-none">
            <p className="text-[9px] tracking-[0.3em] text-[#00d4ff] uppercase">Interactive 3D</p>
          </div>
          <div className="absolute bottom-6 right-6 glass px-4 py-2 rounded-lg pointer-events-none">
            <p className="text-[9px] tracking-[0.3em] text-[#a8b3cf]/60 uppercase">Move mouse to explore</p>
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a6bff]/30 to-transparent" />
    </section>
  )
}
