'use client'

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei"
import type { Mesh } from "three"

function Crystal() {
  const mesh = React.useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.18
    mesh.current.rotation.y += delta * 0.24
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.25, 1]} />
        <MeshDistortMaterial
          color="#e8954a"
          emissive="#c2611a"
          emissiveIntensity={0.18}
          roughness={0.22}
          metalness={0.65}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
      {/* wireframe shell for depth */}
      <mesh scale={1.55}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial color="#2f8f8a" wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  )
}

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} castShadow />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#2f8f8a" />
      <Crystal />
      <Environment preset="sunset" />
    </Canvas>
  )
}
