import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: me } = await supabase
    .from('attendees')
    .select('name')
    .eq('email', user!.email!)
    .single()

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-900 px-6 py-3 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur z-10">
        <span className="font-semibold text-sm">Delhi Angels · D2C Summit Noida</span>
        <span className="text-xs text-gray-500">Hi, {me?.name?.split(' ')[0] ?? 'there'}</span>
      </nav>
      {children}
    </div>
  )
}
