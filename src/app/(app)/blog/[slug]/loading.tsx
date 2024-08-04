import { Layout } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Layout>
      <Layout.Main className="rounded-lg bg-background/75 p-6 space-y-4">
        <Skeleton className="h-12 w-2/5" />
        <Skeleton className="h-4 w-full" />
      </Layout.Main>
      <Layout.Main className="rounded-lg bg-background/75 p-6 space-y-4">
        <Skeleton className="h-12 w-2/5" />
        <Skeleton className="h-48 w-full" />
      </Layout.Main>
    </Layout>
  )
}
