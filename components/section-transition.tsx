"use client"

export default function SectionTransition({ children, bgClass = "bg-white dark:bg-gray-900" }) {
  return (
    <div className={`relative ${bgClass}`}>
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10"></div>
      {children}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>
    </div>
  )
}
