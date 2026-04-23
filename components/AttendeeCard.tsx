import Link from 'next/link'
import { getInitials } from '@/lib/utils'
import type { Attendee } from '@/lib/types'

const TAG_COLOURS: Record<string, string> = {
  Funding:      'bg-indigo-950 border-indigo-700 text-indigo-300',
  'Co-founder': 'bg-purple-950 border-purple-700 text-purple-300',
  Partnerships: 'bg-blue-950  border-blue-700  text-blue-300',
  Hiring:       'bg-red-950   border-red-700   text-red-300',
  Networking:   'bg-zinc-800  border-zinc-600  text-zinc-300',
}

export function AttendeeCard({ attendee }: { attendee: Attendee }) {
  return (
    <Link href={`/portal/${attendee.id}`}
      className="block bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        {attendee.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={attendee.photo_url} alt={attendee.name}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {getInitials(attendee.name)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{attendee.name}</p>
          <p className="text-xs text-gray-500 truncate">{attendee.role} · {attendee.company}</p>
        </div>
      </div>
      {attendee.bio && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{attendee.bio}</p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {attendee.looking_for.slice(0, 3).map(tag => (
          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border ${TAG_COLOURS[tag] ?? TAG_COLOURS.Networking}`}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
