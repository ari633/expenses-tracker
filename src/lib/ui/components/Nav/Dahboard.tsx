'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/lib/server/actions/auth'
 
export function Links() {
  const pathname = usePathname()
  const style = `hover:text-blue-700`
  return (
    <nav className="flex justify-center space-x-4">
      <Link href="/dashboard" className={`${style} ${pathname === '/dashboard' ? 'text-blue-700' : 'text-blue-500'}`}>Dashboard</Link>
      <Link href="/dashboard/expenses" className={`${style} ${pathname === '/dashboard/expenses' ? 'text-blue-700' : 'text-blue-500'}`}>Expenses</Link>
      <Link href="/dashboard/categories" className={`${style} ${pathname === '/dashboard/categories' ? 'text-blue-700' : 'text-blue-500'}`}>Categories</Link>
      <form action={logout}>
        <button type="submit">Sign Out</button>
      </form>
    </nav>
  )
}