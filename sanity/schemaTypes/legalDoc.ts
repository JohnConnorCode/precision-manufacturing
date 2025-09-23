import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'legalDoc',
  title: 'Legal Document',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Terms & Conditions', value: 'terms' },
          { title: 'Supplier Requirements', value: 'supplier_requirements' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Cookie Policy', value: 'cookies' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      description: 'Optional PDF version',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date',
    }),
  ],
});