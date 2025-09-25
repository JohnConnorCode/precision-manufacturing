"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  start?: boolean
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  start = true
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView && start) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView, start])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals))
    })
    return unsubscribe
  }, [springValue, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {displayValue}
      </motion.span>
      {suffix}
    </span>
  )
}

interface StatsCounterProps {
  stats: {
    value: number
    label: string
    prefix?: string
    suffix?: string
    decimals?: number
  }[]
  className?: string
}

export function StatsCounter({ stats, className = "" }: StatsCounterProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-black mb-2">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
            />
          </div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}