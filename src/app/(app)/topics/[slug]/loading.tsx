import { Layout } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-6">
        <Skeleton className="h-32 w-full mb-4" />
      </Layout.Main>
    </Layout>
  )
}
