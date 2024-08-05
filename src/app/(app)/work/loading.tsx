import { Layout } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Layout>
      <Layout.Main className="space-y-4 rounded-lg bg-background/75 p-6">
        <Skeleton className="h-12 w-2/5" />
        <Skeleton className="h-32 w-full" />
      </Layout.Main>
    </Layout>
  )
}
