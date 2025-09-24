"use client";

import { motion } from 'framer-motion';
import { Gauge, Shield, Cpu, Target, Layers, Activity, Zap, Award } from 'lucide-react';

export default function TechnicalSpecs() {
  const specs = [
    {
      icon: Gauge,
      metric: "±0.0001\"",
      label: "TOLERANCE",
      description: "Ultra-precision machining",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Cpu,
      metric: "5-AXIS",
      label: "SIMULTANEOUS",
      description: "Complex geometry capability",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Shield,
      metric: "AS9100D",
      label: "CERTIFIED",
      description: "Aerospace quality system",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Target,
      metric: "0.17%",
      label: "REJECT RATE",
      description: "Six Sigma performance",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Layers,
      metric: "24/7",
      label: "PRODUCTION",
      description: "Continuous operations",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: Activity,
      metric: "99.8%",
      label: "ON-TIME",
      description: "Delivery performance",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Zap,
      metric: "12,000",
      label: "RPM",
      description: "High-speed machining",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Award,
      metric: "ITAR",
      label: "REGISTERED",
      description: "Defense compliant",
      color: "from-yellow-500 to-green-500"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Animated Scanning Line */}
      <motion.div
        className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Section Purpose */}
          <p className="text-cyan-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">
            WHY CHOOSE PRECISION MANUFACTURING
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 uppercase">
            PROVEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">PERFORMANCE</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium mb-4">
            Every metric tells a story of precision, reliability, and excellence
          </p>

          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            These aren't just numbers – they represent our commitment to delivering
            mission-critical components that exceed the most demanding specifications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  {/* Icon with Gradient Background */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${spec.color} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {spec.metric}
                  </div>

                  {/* Label */}
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-[0.15em] mb-2">
                    {spec.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-slate-500">
                    {spec.description}
                  </div>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-2">Need precise manufacturing solutions?</p>
          <p className="text-2xl font-bold text-white">
            Call <a href="tel:+15032319093" className="text-cyan-400 hover:text-cyan-300 transition-colors">503-231-9093</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}