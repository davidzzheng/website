import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import {
  BlocksFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      LinkFeature({
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['noopener', 'noreferrer', 'nofollow'],
            admin: {
              description:
                'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
            },
          },
        ],
      }),
      UploadFeature({
        collections: {
          uploads: {
            fields: [
              {
                name: 'caption',
                type: 'richText',
                editor: lexicalEditor(),
              },
            ],
          },
        },
      }),
      HTMLConverterFeature({}),
    ],
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
        },
        lexicalHTML('content', { name: 'contentHtml' }),
      ],
    },
    {
      slug: 'tags',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        { name: 'id', type: 'text', unique: true },
      ],
      admin: {
        useAsTitle: 'name',
      },
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      slug: 'work',
      fields: [
        {
          name: 'company',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'startDate',
          type: 'date',
        },
        {
          name: 'endDate',
          type: 'date',
        },
        {
          name: 'workType',
          label: 'Work Type',
          type: 'select',
          options: [
            { label: 'Full Time', value: 'fulltime' },
            { label: 'Project', value: 'project' },
          ],
        },
        {
          name: 'technologies',
          type: 'relationship',
          relationTo: 'technologies',
          hasMany: true,
        },
        lexicalHTML('description', { name: 'descriptionHtml' }),
      ],
    },
    {
      slug: 'technologies',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'codeSnippets',
      labels: {
        singular: 'Code Snippet',
        plural: 'Code Snippets',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'code',
          type: 'code',
          required: true,
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI ?? '',
    },
  }),
  i18n: {
    supportedLanguages: { en },
  },
  onInit: async (payload) => {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: process.env.DEFAULT_EMAIL ?? '',
          password: process.env.DEFAULT_PASSWORD,
        },
      })
    }
  },
  sharp,
})
