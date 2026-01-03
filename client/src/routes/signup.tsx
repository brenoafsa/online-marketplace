import { createFileRoute } from '@tanstack/react-router'
import { SignUpPage } from '@/features/signup/components/signUpPage'

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})
