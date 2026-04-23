'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function sendMagicLink(formData: FormData) {
  const email = (formData.get('email') as string).toLowerCase().trim()
  const next = (formData.get('next') as string) || '/portal'

  const adminSupabase = createSupabaseAdminClient()
  const { data: attendee } = await adminSupabase
    .from('attendees')
    .select('status')
    .eq('email', email)
    .single()

  const isAdmin = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim()).includes(email)

  if (!isAdmin && (!attendee || attendee.status !== 'approved')) {
    redirect('/login?sent=1')
  }

  const supabase = await createSupabaseServerClient()
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${next}`,
    },
  })

  redirect('/login?sent=1')
}
