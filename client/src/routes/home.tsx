import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../features/home/components/homePage'

export const Route = createFileRoute('/home')({
  component: HomePage,
})
