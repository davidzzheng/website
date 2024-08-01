import { getPayload } from '@/lib/payload'
import { HTMLConverter, SerializedRelationshipNode } from '@payloadcms/richtext-lexical'

export const RelationHTMLConverter: HTMLConverter<SerializedRelationshipNode> = {
  converter: async ({ converters, node, parent }) => {
    const payload = await getPayload()
    const related = await payload.findByID({
      collection: node.relationTo,
      id: node.value,
    })
    switch (node.relationTo) {
      case 'posts':
        return `<a href="/blog/${related.id}" class="text-link inline" rel="noopener noreferrer" target="_blank">${related.title}</a>`
      default:
        return `<p>${related.id}</p>`
    }
  },
  nodeTypes: ['relationship'],
}
