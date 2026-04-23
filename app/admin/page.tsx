import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { AdminRow } from '@/components/AdminRow'
import type { Attendee } from '@/lib/types'

interface Props {
  searchParams: Promise<{ tab?: string }>
}

export default async function AdminPage({ searchParams }: Props) {
  const { tab = 'pending' } = await searchParams
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('attendees')
    .select('*')
    .order('created_at', { ascending: false })

  const all = (data ?? []) as Attendee[]
  const pending  = all.filter(a => a.status === 'pending')
  const approved = all.filter(a => a.status === 'approved')
  const rejected = all.filter(a => a.status === 'rejected')
  const shown = tab === 'pending' ? pending : tab === 'approved' ? approved : rejected

  return (
    <main className="px-6 py-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Pending',  count: pending.length,  colour: 'text-yellow-400' },
          { label: 'Approved', count: approved.length, colour: 'text-green-400'  },
          { label: 'Rejected', count: rejected.length, colour: 'text-red-400'    },
        ].map(({ label, count, colour }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-center">
            <p className={`text-2xl font-bold ${colour}`}>{count}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6 border-b border-zinc-800">
        {(['pending', 'approved', 'rejected'] as const).map(t => (
          <a key={t} href={`/admin?tab=${t}`}
            className={`px-4 py-2 text-sm capitalize transition-colors ${tab === t ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {t} {t === 'pending' ? `(${pending.length})` : ''}
          </a>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">No {tab} submissions.</p>
      ) : (
        <div className="space-y-2">
          {shown.map(a => <AdminRow key={a.id} attendee={a} />)}
        </div>
      )}
    </main>
  )
}
