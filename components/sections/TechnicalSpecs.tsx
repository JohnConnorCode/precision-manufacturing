"use client";

import { motion } from 'framer-motion';
import { Gauge, Cpu, Shield, Target, Award, Clock, Activity, Zap } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

export default function TechnicalSpecs() {
  const metrics = [
    {
      icon: Gauge,
      value: "±0.0001\"",
      label: "PRECISION",
      description: "Ultra-tight tolerances",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Cpu,
      value: "5-AXIS",
      label: "CNC CAPABILITY",
      description: "Simultaneous machining",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Shield,
      value: "AS9100D",
      label: "CERTIFIED",
      description: "Aerospace quality",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Activity,
      value: "99.97%",
      label: "FIRST PASS YIELD",
      description: "Quality rate",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "PRODUCTION",
      description: "Continuous operation",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Target,
      value: "99.8%",
      label: "ON-TIME",
      description: "Delivery performance",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Zap,
      value: "12,000",
      label: "RPM",
      description: "Spindle speed",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: Award,
      value: "ITAR",
      label: "REGISTERED",
      description: "Defense compliant",
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-indigo-950/20" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Precision By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Numbers</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400">
            Industry-leading capabilities backed by decades of aerospace and defense manufacturing expertise
          </p>
        </AnimatedSection>

        {/* Metrics Grid - Premium Card Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <AnimatedSection
                key={metric.label}
                delay={index * 0.05}
                className="group relative"
              >
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-blue-600/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:bg-slate-900/70">
                  {/* Gradient Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${metric.gradient} blur-3xl -z-10`} />

                  {/* Icon */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${metric.gradient} p-[1px] mb-4`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Metric Value */}
                  <div className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                    {metric.value}
                  </div>

                  {/* Label */}
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">
                    {metric.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-slate-500 leading-relaxed">
                    {metric.description}
                  </div>

                  {/* Subtle Animation Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${metric.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA - More Elegant */}
        <AnimatedSection
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-2">Ready to experience precision manufacturing excellence?</p>
          <p className="text-2xl font-bold text-white">
            Call <a href="tel:+15032319093" className="text-blue-500 hover:text-blue-400 transition-colors underline decoration-blue-500/30 underline-offset-4 hover:decoration-blue-400">503-231-9093</a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}