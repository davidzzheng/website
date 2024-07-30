import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export const getPayload = async () =>
	await getPayloadHMR({
		config: configPromise,
	})
