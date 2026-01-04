import { createFileRoute } from '@tanstack/react-router'
import { SignInPage } from '@/features/signin/components/signInPage'

export const Route = createFileRoute('/signin')({
  component: SignInPage,
})
