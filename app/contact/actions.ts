'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  interest: z.enum(['general', 'quote', 'partnership', 'supplier', 'career']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    phone: formData.get('phone') || undefined,
    interest: formData.get('interest'),
    message: formData.get('message'),
  };

  try {
    const validatedData = contactSchema.parse(rawData);

    // Here you would typically:
    // 1. Save to Sanity CMS
    // 2. Send email notification
    // 3. Add to CRM

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, just log the data
    console.error('Contact form submission:', validatedData);

    return {
      success: true,
      message: 'Thank you for your inquiry. We will respond within 24 hours.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your form inputs',
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}