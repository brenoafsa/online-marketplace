import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Link to='/home'>
      <div className='pt-18'>
        HOME PAGE
      </div>  
    </Link>
  )
}