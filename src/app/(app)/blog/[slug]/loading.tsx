import { Layout } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Layout>
      <Layout.Top className="space-y-4 rounded-lg bg-background/75 p-6">
        <Skeleton className="h-16 w-2/5" />
        <Skeleton className="h-8 w-full" />
      </Layout.Top>
      <Layout.Main className="space-y-4 rounded-lg bg-background/75 p-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="mb-16 h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </Layout.Main>
    </Layout>
  )
}
