import { defineType, defineArrayMember } from 'sanity';

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
    defineArrayMember({
      name: 'statLine',
      title: 'Stat Line',
      type: 'object',
      fields: [
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'suffix', title: 'Suffix', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
              { title: 'Error', value: 'error' },
            ],
          },
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'body',
          title: 'Body',
          type: 'text',
        },
      ],
    }),
    defineArrayMember({
      name: 'twoColumn',
      title: 'Two Column',
      type: 'object',
      fields: [
        {
          name: 'left',
          title: 'Left Column',
          type: 'blockContent',
        },
        {
          name: 'right',
          title: 'Right Column',
          type: 'blockContent',
        },
      ],
    }),
    defineArrayMember({
      name: 'mediaBand',
      title: 'Media Band',
      type: 'object',
      fields: [
        {
          name: 'media',
          title: 'Media',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Full Width', value: 'full' },
              { title: 'Contained', value: 'contained' },
              { title: 'Wide', value: 'wide' },
            ],
          },
        },
      ],
    }),
    defineArrayMember({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title/Company',
          type: 'string',
        },
      ],
    }),
  ],
});