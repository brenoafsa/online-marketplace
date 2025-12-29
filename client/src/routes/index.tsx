import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: App,
})

interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
}

function App() {

  const query = useQuery<User[]>({ 
    queryKey: ['users'],
    queryFn: getUsers 
  })

  return (
    <div className='bg-amber-200'>
      {query.data?.map((each: User) => (
        <p className='p-2' key={each.id}>{each.name}: {each.username}: {each.phone}</p>
      ))}
    </div>
  )
}

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  return res.json();
}