import { Outlet, createRootRoute, redirect, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createContext, useContext } from 'react'
import { Toaster } from '@/components/ui/sonner'
import api from '@/lib/http'

export const queryClient = new QueryClient()

interface AuthContext {
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContext | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

const fetchUser = async (): Promise<AuthContext> => {
  try {
    const resp = await api.get('/auth');
    return { isAuthenticated: resp.status === 200 };
  } catch (error) {
    return { isAuthenticated: false };
  }
};

const publicRoutes = ['/signin', '/signup'];

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));

    const auth = await queryClient.fetchQuery({
      queryKey: ['auth'],
      queryFn: fetchUser,
      staleTime: 1000 * 60 * 15
    });

    if (!isPublicRoute) {
      if (!auth.isAuthenticated) {
        throw redirect({
          to: '/signin',
          search: { redirect: location.href },
        });
      }
      return { auth };
    } else {
      if (auth.isAuthenticated) {
        throw redirect({
          to: '/home',
          search: { redirect: location.href },
        });
      }
    }

    return { auth: { isAuthenticated: false } };
  },
  component: function RootComponent() {
    const { auth } = Route.useRouteContext();

    const pathname = useRouterState({
      select: (s) => s.location.pathname,
    });
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    return (
      <AuthContext.Provider value={auth}>
        <QueryClientProvider client={queryClient}>
          {!isPublicRoute && <Header />}
          <Outlet />
          {!isPublicRoute && <Footer />}
          <Toaster />

          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </QueryClientProvider>
      </AuthContext.Provider>
    );
  },
});