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
import HeroSection from '@/components/ui/hero-section';
import { theme, styles, cn } from '@/lib/theme';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  Activity
} from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=2400&q=80"
        imageAlt="Contact our precision manufacturing team"
        badge={{
          text: "GET STARTED",
          icon: Activity
        }}
        title={
          <>
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Our Team</span>
          </>
        }
        description="Connect with Integrated Inspection Systems for precision manufacturing solutions, technical consultations, and project quotes."
        buttons={[
          {
            label: "Start Your Project",
            href: "#contact-form",
            variant: "primary"
          },
          {
            label: "Call Us Today",
            href: "tel:+15032319093",
            variant: "secondary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Main Content */}
      <section id="contact-form" className={styles.sectionDark}>
        <div className={theme.spacing.container}>
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className={cn(theme.typography.h3, "text-white mb-6")}>Get in Touch</h2>
                <p className={cn(theme.typography.body, "text-slate-400 mb-8")}>
                  Our engineering team is ready to discuss your precision manufacturing needs.
                </p>
              </div>

              {/* Contact Cards */}
              <Card className={cn(theme.components.card.form, "p-6")}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Headquarters</h3>
                      <p className={theme.typography.small}>
                        Integrated Inspection Systems, Inc.<br />
                        12345 Precision Way<br />
                        Torrance, CA 90501
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Phone</h3>
                      <a href="tel:+15032319093" className={cn(theme.typography.small, "hover:text-cyan-400 transition-colors")}>
                        (503) 231-9093
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Email</h3>
                      <a href="mailto:officemgr@iismet.com" className={cn(theme.typography.small, "hover:text-cyan-400 transition-colors")}>
                        officemgr@iismet.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Business Hours</h3>
                      <p className={theme.typography.small}>
                        Monday - Friday: 7:00 AM - 5:00 PM PST<br />
                        24/7 Production Facility
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Certifications */}
              <Card className={cn(theme.components.card.form, "p-6")}>
                <h3 className={cn(theme.typography.label, "text-white mb-4")}>Certifications</h3>
                <div className="space-y-3">
                  {['AS9100D', 'ISO 9001:2015', 'ITAR Registered', 'NADCAP'].map((cert) => (
                    <div key={cert} className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span className={theme.typography.small}>{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className={cn(theme.components.card.form, "p-8")}>
                <h2 className={cn(theme.typography.h3, "text-white mb-6")}>Send a Message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className={styles.form.label}>Full Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="John Doe"
                        className={cn(styles.form.input, "mt-1")}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className={styles.form.label}>Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="john@company.com"
                        className={cn(styles.form.input, "mt-1")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className={styles.form.label}>Company *</Label>
                      <Input
                        id="company"
                        {...register('company')}
                        placeholder="Acme Aerospace"
                        className={cn(styles.form.input, "mt-1")}
                      />
                      {errors.company && (
                        <p className="text-sm text-red-400 mt-1">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className={styles.form.label}>Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                        className={cn(styles.form.input, "mt-1")}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interest" className={styles.form.label}>Inquiry Type *</Label>
                    <Select onValueChange={(value) => setValue('interest', value as any)}>
                      <SelectTrigger className={cn(styles.form.select.trigger, "mt-1")}>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent className={styles.form.select.content}>
                        <SelectItem className={styles.form.select.item} value="quote">Request Quote</SelectItem>
                        <SelectItem className={styles.form.select.item} value="technical">Technical Consultation</SelectItem>
                        <SelectItem className={styles.form.select.item} value="partnership">Strategic Partnership</SelectItem>
                        <SelectItem className={styles.form.select.item} value="supplier">Supplier Inquiry</SelectItem>
                        <SelectItem className={styles.form.select.item} value="career">Career Opportunities</SelectItem>
                        <SelectItem className={styles.form.select.item} value="general">General Information</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.interest && (
                      <p className="text-sm text-red-400 mt-1">{errors.interest.message}</p>
                    )}
                  </div>

                  {(interest === 'quote' || interest === 'technical') && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="projectType" className={styles.form.label}>Industry</Label>
                        <Select onValueChange={(value) => setValue('projectType', value as any)}>
                          <SelectTrigger className={cn(styles.form.select.trigger, "mt-1")}>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent className={styles.form.select.content}>
                            <SelectItem className={styles.form.select.item} value="aerospace">Aerospace</SelectItem>
                            <SelectItem className={styles.form.select.item} value="defense">Defense</SelectItem>
                            <SelectItem className={styles.form.select.item} value="medical">Medical Devices</SelectItem>
                            <SelectItem className={styles.form.select.item} value="energy">Energy</SelectItem>
                            <SelectItem className={styles.form.select.item} value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeline" className={styles.form.label}>Timeline</Label>
                        <Select onValueChange={(value) => setValue('timeline', value as any)}>
                          <SelectTrigger className={cn(styles.form.select.trigger, "mt-1")}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent className={styles.form.select.content}>
                            <SelectItem className={styles.form.select.item} value="immediate">Immediate</SelectItem>
                            <SelectItem className={styles.form.select.item} value="1-3months">1-3 Months</SelectItem>
                            <SelectItem className={styles.form.select.item} value="3-6months">3-6 Months</SelectItem>
                            <SelectItem className={styles.form.select.item} value="6months+">6+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message" className={styles.form.label}>Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Please describe your project requirements..."
                      rows={6}
                      className={cn(styles.form.textarea, "mt-1")}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={cn(theme.typography.small, "text-xs text-slate-500")}>
                      * Required fields
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(styles.ctaPrimary, "group")}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>

                  {submitResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        submitResult.success
                          ? 'bg-green-500/10 border border-green-500/20'
                          : 'bg-red-500/10 border border-red-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 ${
                          submitResult.success ? 'text-green-400' : 'text-red-400'
                        }`} />
                        <p className={`text-sm ${
                          submitResult.success ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {submitResult.message}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Response within 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>30+ years of excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>ITAR compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}