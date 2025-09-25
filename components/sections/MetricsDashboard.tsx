"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AnimatedCounter, StatsCounter } from '@/components/ui/animated-counter'
import { Activity, TrendingUp, Zap, Shield, Cpu, Package, Clock, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function MetricsDashboard() {
  const [activeJobs, setActiveJobs] = useState(47)
  const [utilization, setUtilization] = useState(92)
  const [quality, setQuality] = useState(99.97)
  const [onTime, setOnTime] = useState(98.5)

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJobs(prev => prev + Math.floor(Math.random() * 3 - 1))
      setUtilization(prev => Math.min(100, Math.max(85, prev + Math.random() * 4 - 2)))
      setQuality(prev => Math.min(100, Math.max(99.5, prev + Math.random() * 0.1 - 0.05)))
      setOnTime(prev => Math.min(100, Math.max(95, prev + Math.random() * 2 - 1)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      value: activeJobs,
      label: "Active Jobs",
      prefix: "",
      suffix: "",
      decimals: 0
    },
    {
      value: utilization,
      label: "Machine Utilization",
      prefix: "",
      suffix: "%",
      decimals: 1
    },
    {
      value: quality,
      label: "Quality Rate",
      prefix: "",
      suffix: "%",
      decimals: 2
    },
    {
      value: onTime,
      label: "On-Time Delivery",
      prefix: "",
      suffix: "%",
      decimals: 1
    }
  ]

  const liveMetrics = [
    {
      icon: Cpu,
      label: "CNC-01",
      status: "Running",
      progress: 67,
      eta: "2:34:12",
      color: "cyan"
    },
    {
      icon: Cpu,
      label: "CNC-02",
      status: "Running",
      progress: 89,
      eta: "0:45:30",
      color: "blue"
    },
    {
      icon: Cpu,
      label: "CNC-03",
      status: "Setup",
      progress: 0,
      eta: "Starting",
      color: "yellow"
    },
    {
      icon: Cpu,
      label: "CMM-01",
      status: "Inspection",
      progress: 45,
      eta: "1:12:45",
      color: "green"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-cyan" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900"
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold text-cyan-400">LIVE METRICS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Real-Time Production
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Dashboard</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Monitor our precision manufacturing operations in real-time with live metrics and KPIs
          </p>
        </motion.div>

        {/* Stats Counter */}
        <StatsCounter stats={stats} className="mb-12" />

        {/* Live Machine Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Machine Status
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="p-6 bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${metric.color}-500/10 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                        </div>
                        <div>
                          <div className="font-bold text-white">{metric.label}</div>
                          <div className={`text-xs text-${metric.color}-400`}>{metric.status}</div>
                        </div>
                      </div>
                      {metric.status === "Running" && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{metric.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-500`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.progress}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">ETA</span>
                      <span className="text-sm font-semibold text-white">{metric.eta}</span>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Performance Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h4 className="font-bold text-white">Quality Assurance</h4>
            </div>
            <div className="text-3xl font-black text-green-400 mb-2">0 Defects</div>
            <p className="text-sm text-slate-400">Last 30 days • Zero defect goal achieved</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-white">Average Lead Time</h4>
            </div>
            <div className="text-3xl font-black text-blue-400 mb-2">4.2 Days</div>
            <p className="text-sm text-slate-400">15% faster than industry average</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-cyan-400" />
              <h4 className="font-bold text-white">Parts Delivered</h4>
            </div>
            <div className="text-3xl font-black text-cyan-400 mb-2">12,847</div>
            <p className="text-sm text-slate-400">This quarter • +23% YoY growth</p>
          </Card>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-slate-300">
              All metrics updated in real-time • ISO 9001:2015 Certified • AS9100D Compliant
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}