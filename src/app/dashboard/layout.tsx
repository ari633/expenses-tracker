import { Links } from '@/lib/ui/components/Nav/Dahboard'
import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="md:container md:mx-auto pt-24">
      <Links />
      <div className='pt-10'>{children}</div>
    </main>
  )
}