import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '@/components/layout/Header'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <>
      <Header/>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
