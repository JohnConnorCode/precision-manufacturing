'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { submitContactForm } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Building2,
  Shield,
  Zap,
  Users
} from 'lucide-react';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  interest: z.enum(['general', 'quote', 'partnership', 'supplier', 'career', 'technical']),
  projectType: z.enum(['aerospace', 'defense', 'medical', 'energy', 'other']).optional(),
  timeline: z.enum(['immediate', '1-3months', '3-6months', '6months+']).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const interest = watch('interest');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const result = await submitContactForm(formData);
    setSubmitResult(result);
    setIsSubmitting(false);

    if (result.success) {
      reset();
    }
  };

  // Sequential fade-in animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen bg-slate-950">
      {/* Hero Section with Parallax */}
      <section className="relative h-[60vh] flex items-center">
        <ParallaxImagePro
          src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80"
          alt="Precision manufacturing facility"
          gradient="dark"
          speed={0.3}
        />

        <div className="container relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Building2 className="w-8 h-8 text-cyan-400" />
              <span className="text-cyan-400 uppercase tracking-wider text-sm font-medium">
                Get In Touch
              </span>
            </div>

            <h1 className={cn(styles.pageTitle, "mb-6")}>
              Start Your Precision Manufacturing Project
            </h1>

            <p className={cn(theme.typography.lead, "text-slate-300")}>
              Connect with Integrated Inspection Systems' engineering team for custom solutions,
              quotes, and technical consultations. 30 years of excellence in aerospace manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-8 bg-gradient-to-b from-slate-950 to-slate-900 border-y border-slate-800"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-sm text-slate-500">Response Time</div>
                <div className="font-semibold text-white">&lt; 2 Hours</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-sm text-slate-500">Production</div>
                <div className="font-semibold text-white">24/7 Operation</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-sm text-slate-500">Clients Served</div>
                <div className="font-semibold text-white">500+ Companies</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-sm text-slate-500">Quality Rate</div>
                <div className="font-semibold text-white">99.99%</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
          >
            {/* Contact Form */}
            <motion.div variants={staggerItem} className="lg:col-span-2">
              <Card className="bg-slate-950/50 border-slate-800 p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Project Inquiry Form</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={staggerItem}>
                      <Label htmlFor="name" className="text-slate-300">Full Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="John Doe"
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="john@company.com"
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={staggerItem}>
                      <Label htmlFor="company" className="text-slate-300">Company *</Label>
                      <Input
                        id="company"
                        {...register('company')}
                        placeholder="Acme Aerospace"
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      />
                      {errors.company && (
                        <p className="text-sm text-red-400 mt-1">{errors.company.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={staggerItem}>
                    <Label htmlFor="interest" className="text-slate-300">Inquiry Type *</Label>
                    <Select onValueChange={(value) => setValue('interest', value as any)}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-cyan-500">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="quote">Request Quote</SelectItem>
                        <SelectItem value="technical">Technical Consultation</SelectItem>
                        <SelectItem value="partnership">Strategic Partnership</SelectItem>
                        <SelectItem value="supplier">Supplier Inquiry</SelectItem>
                        <SelectItem value="career">Career Opportunities</SelectItem>
                        <SelectItem value="general">General Information</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.interest && (
                      <p className="text-sm text-red-400 mt-1">{errors.interest.message}</p>
                    )}
                  </motion.div>

                  {(interest === 'quote' || interest === 'technical') && (
                    <>
                      <motion.div
                        variants={staggerItem}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <Label htmlFor="projectType" className="text-slate-300">Industry/Project Type</Label>
                        <Select onValueChange={(value) => setValue('projectType', value as any)}>
                          <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-cyan-500">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700">
                            <SelectItem value="aerospace">Aerospace</SelectItem>
                            <SelectItem value="defense">Defense</SelectItem>
                            <SelectItem value="medical">Medical Devices</SelectItem>
                            <SelectItem value="energy">Energy</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        variants={staggerItem}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <Label htmlFor="timeline" className="text-slate-300">Project Timeline</Label>
                        <Select onValueChange={(value) => setValue('timeline', value as any)}>
                          <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-cyan-500">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700">
                            <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
                            <SelectItem value="1-3months">1-3 Months</SelectItem>
                            <SelectItem value="3-6months">3-6 Months</SelectItem>
                            <SelectItem value="6months+">6+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </>
                  )}

                  <motion.div variants={staggerItem}>
                    <Label htmlFor="message" className="text-slate-300">Project Details *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Please describe your requirements, specifications, or questions..."
                      rows={6}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>
                    )}
                  </motion.div>

                  {submitResult && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        "p-4 rounded-lg",
                        submitResult.success
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      )}
                    >
                      {submitResult.message}
                    </motion.div>
                  )}

                  <motion.div variants={staggerItem}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              <motion.div variants={staggerItem}>
                <Card className="bg-slate-950/50 border-slate-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Corporate Headquarters</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Main Facility</p>
                        <p className="text-sm text-slate-400">
                          Integrated Inspection Systems, Inc.<br />
                          12345 Precision Way<br />
                          Torrance, CA 90501<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Contact Numbers</p>
                        <p className="text-sm text-slate-400">
                          Main: +1 (310) 555-0100<br />
                          Engineering: +1 (310) 555-0150<br />
                          24/7 Production: +1 (310) 555-0199
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Email Departments</p>
                        <p className="text-sm text-slate-400">
                          Sales: sales@iismet.com<br />
                          Engineering: engineering@iismet.com<br />
                          Quality: quality@iismet.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Operating Hours</p>
                        <p className="text-sm text-slate-400">
                          Office: Mon-Fri 7:00 AM - 6:00 PM PST<br />
                          Production: 24/7/365<br />
                          Emergency Line: Always Available
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">Priority Response</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    For urgent aerospace and defense projects requiring immediate attention:
                  </p>
                  <p className="text-2xl font-bold text-white mb-2">+1 (310) 555-0911</p>
                  <p className="text-xs text-slate-400">Average response time: 15 minutes</p>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="bg-slate-950/50 border-slate-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Certifications & Compliance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">AS9100D Aerospace Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">ISO 9001:2015 Quality Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">ITAR Registered (DDTC)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">NADCAP Accredited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">FDA Registered Facility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">ISO 14001 Environmental</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="bg-slate-950/50 border-slate-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Global Reach</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Serving aerospace and defense contractors worldwide with facilities in:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                    <div>• United States</div>
                    <div>• United Kingdom</div>
                    <div>• Germany</div>
                    <div>• Japan</div>
                    <div>• Canada</div>
                    <div>• Australia</div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative h-96 bg-slate-950"
      >
        <ParallaxImagePro
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
          alt="Manufacturing facility location"
          gradient="dark"
          speed={0.2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Card className="bg-slate-950/90 border-slate-800 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Visit Our Facility</h3>
            <p className="text-slate-400 mb-4">Schedule a tour of our 150,000 sq ft manufacturing center</p>
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              Schedule Facility Tour
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </motion.section>
    </main>
  );
}