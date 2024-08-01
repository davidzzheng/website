import { getPayload } from '@/lib/payload'
import { HTMLConverter, SerializedUploadNode, UploadNode } from '@payloadcms/richtext-lexical'

export const UploadHTMLConverter: HTMLConverter<SerializedUploadNode> = {
  converter: async ({ node }) => {
    const payload = await getPayload()
    const media = await payload.findByID({
      collection: 'media',
      id: node.value,
    })

    if (!(media?.mimeType as string)?.startsWith('image')) {
      // Only images can be serialized as HTML
      return ``
    }

    return `<img src="${payload?.config?.serverURL + media.url}" alt="${
      media.text ?? media.filename
    }" loading="lazy" />`
  },
  nodeTypes: [UploadNode.getType()],
}
