'use server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function approveAttendee(id: string, email: string) {
  const supabase = createSupabaseAdminClient()
  await supabase.from('attendees').update({ status: 'approved' }).eq('id', id)
  await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/portal`,
  })
  revalidatePath('/admin')
}

export async function rejectAttendee(id: string) {
  const supabase = createSupabaseAdminClient()
  await supabase.from('attendees').update({ status: 'rejected' }).eq('id', id)
  revalidatePath('/admin')
}

export async function revokeAttendee(id: string) {
  const supabase = createSupabaseAdminClient()
  await supabase.from('attendees').update({ status: 'rejected' }).eq('id', id)
  revalidatePath('/admin')
}
