"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"

function Particles({ count = 200, theme }) {
  const mesh = useRef()
  const isDark = theme === "dark"

  const particlePositions = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 20,
    y: (Math.random() - 0.5) * 20,
    z: (Math.random() - 0.5) * 5,
    speed: Math.random() * 0.01,
  }))

  useFrame(() => {
    if (!mesh.current) return

    const positions = mesh.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Move particles up slowly
      positions[i3 + 1] += particlePositions[i].speed

      // Reset position when particle goes out of view
      if (positions[i3 + 1] > 10) {
        positions[i3 + 1] = -10
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(particlePositions.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={isDark ? "#ffffff" : "#000000"} transparent opacity={0.3} />
    </points>
  )
}

export default function ThreeDBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Particles theme={theme} />
    </Canvas>
  )
}
