'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import type { AttendeeRole, LookingFor } from '@/lib/types'

export async function registerAttendee(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const adminSupabase = createSupabaseAdminClient()

  const email = (formData.get('email') as string).toLowerCase().trim()
  const name = (formData.get('name') as string).trim()
  const company = (formData.get('company') as string).trim()
  const role = formData.get('role') as AttendeeRole
  const phone = (formData.get('phone') as string | null)?.trim() || null
  const linkedin_url = (formData.get('linkedin_url') as string | null)?.trim() || null
  const bio = (formData.get('bio') as string | null)?.trim() || null
  const looking_for = formData.getAll('looking_for') as LookingFor[]
  const consent = formData.get('consent') === 'on'

  if (!consent) throw new Error('Consent is required')

  let photo_url: string | null = null
  const photo = formData.get('photo') as File
  if (photo && photo.size > 0) {
    const ext = photo.name.split('.').pop() ?? 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error: uploadError } = await adminSupabase.storage
      .from('Avatars')
      .upload(fileName, photo, { contentType: photo.type })
    if (!uploadError && data) {
      const { data: { publicUrl } } = adminSupabase.storage.from('Avatars').getPublicUrl(data.path)
      photo_url = publicUrl
    }
  }

  const { error } = await supabase.from('attendees').insert({
    email, name, company, role, phone, linkedin_url, bio, looking_for, consent,
    photo_url, status: 'pending',
  })

  if (error) {
    if (error.code === '23505') {
      redirect('/register/success')
    }
    throw new Error('Registration failed. Please try again.')
  }

  redirect('/register/success')
}
