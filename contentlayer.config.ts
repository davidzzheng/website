import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: { type: 'string', description: 'The description of the post' },
    image: { type: 'string', description: 'The image of the post' },
    date: {
      type: 'date',
      description: 'The published date of the post',
      required: true,
    },
    isPublished: {
      type: 'boolean',
      description: 'Whether the post is published',
      default: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => `/${project._raw.flattenedPath}`,
    },
  },
}))

export const Position = defineDocumentType(() => ({
  name: 'Position',
  filePathPattern: `positions/**/*.md`,
  fields: {
    company: { type: 'string', required: true },
    logo: { type: 'string', required: true },
    title: { type: 'string', required: true },
    start: { type: 'string', required: true },
    end: { type: 'string', required: true },
    link: { type: 'string', required: true },
  },
}))

const options = {
  theme: {
    dark: 'rose-pine-moon',
    light: 'rose-pine-dawn',
  },
} as Options

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Project, Position],
  date: { timezone: 'America/Vancouver' },
  mdx: {
    remarkPlugins: [remarkGfm],
    // @ts-ignore
    rehypePlugins: [[rehypePrettyCode, options]],
  },
})
