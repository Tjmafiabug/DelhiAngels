import { createSupabaseServerClient } from '@/lib/supabase/server'
import { AttendeeCard } from '@/components/AttendeeCard'
import { filterAttendees } from '@/lib/utils'
import type { Attendee, AttendeeRole, LookingFor } from '@/lib/types'

const ROLES: AttendeeRole[] = ['Founder', 'Co-founder', 'Investor', 'Operator', 'Other']
const LOOKING_FOR_OPTIONS: LookingFor[] = ['Funding', 'Co-founder', 'Partnerships', 'Hiring', 'Networking']

interface Props {
  searchParams: Promise<{ q?: string; role?: string; looking_for?: string }>
}

export default async function PortalPage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('attendees')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: true })

  const attendees = (data ?? []) as Attendee[]
  const filtered = filterAttendees(
    attendees,
    params.q ?? '',
    (params.role as AttendeeRole) || null,
    (params.looking_for as LookingFor) || null
  )

  const counts = {
    total: attendees.length,
    founders: attendees.filter(a => a.role === 'Founder' || a.role === 'Co-founder').length,
    investors: attendees.filter(a => a.role === 'Investor').length,
    operators: attendees.filter(a => a.role === 'Operator').length,
  }

  return (
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form className="flex flex-col sm:flex-row gap-3 flex-1">
          <input name="q" defaultValue={params.q} placeholder="Search by name or company…"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
          <select name="role" defaultValue={params.role ?? ''}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option value="">All roles</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select name="looking_for" defaultValue={params.looking_for ?? ''}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500">
            <option value="">Looking for…</option>
            {LOOKING_FOR_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Filter
          </button>
          {(params.q || params.role || params.looking_for) && (
            <a href="/portal" className="text-xs text-gray-500 hover:text-white self-center">Clear</a>
          )}
        </form>
      </div>

      <p className="text-xs text-gray-600 mb-6">
        {counts.total} attendees · {counts.founders} founders · {counts.investors} investors · {counts.operators} operators
        {filtered.length !== attendees.length && ` · showing ${filtered.length}`}
      </p>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 py-12 text-center">No attendees match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(a => <AttendeeCard key={a.id} attendee={a} />)}
        </div>
      )}
    </main>
  )
}
