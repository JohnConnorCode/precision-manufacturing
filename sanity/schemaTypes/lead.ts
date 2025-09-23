import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'interest',
      title: 'Interest Area',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Quote Request', value: 'quote' },
          { title: 'Partnership', value: 'partnership' },
          { title: 'Supplier', value: 'supplier' },
          { title: 'Career', value: 'career' },
        ],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
  ],
});