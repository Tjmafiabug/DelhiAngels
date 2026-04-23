import { getInitials } from '@/lib/utils'
import { approveAttendee, rejectAttendee, revokeAttendee } from '@/app/admin/actions'
import type { Attendee } from '@/lib/types'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function AdminRow({ attendee }: { attendee: Attendee }) {
  return (
    <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
      {attendee.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={attendee.photo_url} alt={attendee.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          {getInitials(attendee.name)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{attendee.name}</p>
        <p className="text-xs text-gray-500 truncate">{attendee.role} · {attendee.company} · {attendee.email}</p>
      </div>
      <span className="text-xs text-gray-600 flex-shrink-0">{timeAgo(attendee.created_at)}</span>

      {attendee.status === 'pending' && (
        <div className="flex gap-2 flex-shrink-0">
          <form action={approveAttendee.bind(null, attendee.id, attendee.email)}>
            <button type="submit" className="text-xs px-3 py-1.5 bg-green-950 border border-green-800 text-green-400 rounded-lg hover:bg-green-900 transition-colors">
              ✓ Approve
            </button>
          </form>
          <form action={rejectAttendee.bind(null, attendee.id)}>
            <button type="submit" className="text-xs px-3 py-1.5 bg-red-950 border border-red-800 text-red-400 rounded-lg hover:bg-red-900 transition-colors">
              ✕ Reject
            </button>
          </form>
        </div>
      )}

      {attendee.status === 'approved' && (
        <form action={revokeAttendee.bind(null, attendee.id)} className="flex-shrink-0">
          <button type="submit" className="text-xs px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-700 transition-colors">
            Revoke
          </button>
        </form>
      )}
    </div>
  )
}
