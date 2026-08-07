"use client"

import type { ReactNode } from "react"

type SectionTransitionProps = {
  children: ReactNode
  bgClass?: string
}

export default function SectionTransition({ children, bgClass = "" }: SectionTransitionProps) {
  return <div className={`circuit-board ${bgClass}`}>{children}</div>
}
