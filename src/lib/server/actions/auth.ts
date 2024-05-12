'use server'

import { deleteSession } from '@/lib/server/session/index'
import { redirect } from 'next/navigation'
 
export async function logout() {
  deleteSession()
  redirect('/')
}