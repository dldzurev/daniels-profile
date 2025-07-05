"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"

interface Mouse {
  x: number
  y: number
}

function Particles({ count = 200, theme, mouse }: { count?: number; theme: string; mouse: Mouse }) {
  const mesh = useRef()
  const isDark = theme === "dark"
  const color = isDark ? "#ADD8E6" : "#5AA4CF"

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

    // Rotate based on mouse position for interactivity
    mesh.current.rotation.x = mouse.y * 0.5
    mesh.current.rotation.y = mouse.x * 0.5
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
      <pointsMaterial size={0.05} color={color} transparent opacity={0.5} />
    </points>
  )
}

export default function ThreeDBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        setMouse({ x, y })
      }}
    >
      <Particles theme={theme ?? "light"} mouse={mouse} />
    </Canvas>
  )
}