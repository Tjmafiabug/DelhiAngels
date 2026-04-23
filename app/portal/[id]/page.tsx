import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getInitials } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Attendee } from '@/lib/types'

const TAG_COLOURS: Record<string, string> = {
  Funding:      'bg-indigo-950 border-indigo-700 text-indigo-300',
  'Co-founder': 'bg-purple-950 border-purple-700 text-purple-300',
  Partnerships: 'bg-blue-950  border-blue-700  text-blue-300',
  Hiring:       'bg-red-950   border-red-700   text-red-300',
  Networking:   'bg-zinc-800  border-zinc-600  text-zinc-300',
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('attendees')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single()

  if (!data) notFound()
  const attendee = data as Attendee

  return (
    <main className="px-6 py-8 max-w-xl mx-auto">
      <Link href="/portal" className="text-xs text-gray-500 hover:text-white mb-6 inline-block">← Back to directory</Link>

      <div className="flex items-center gap-5 mb-6">
        {attendee.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={attendee.photo_url} alt={attendee.name}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {getInitials(attendee.name)}
          </div>
        )}
        <div>
          <h1 className="text-xl font-semibold">{attendee.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">{attendee.role} · {attendee.company}</p>
        </div>
      </div>

      {attendee.bio && (
        <p className="text-sm text-gray-300 leading-relaxed mb-6">{attendee.bio}</p>
      )}

      <div className="space-y-3 mb-6">
        {attendee.phone && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-20">Phone</span>
            <span className="text-sm text-white">{attendee.phone}</span>
          </div>
        )}
        {attendee.linkedin_url && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-20">LinkedIn</span>
            <a href={attendee.linkedin_url.startsWith('http') ? attendee.linkedin_url : `https://${attendee.linkedin_url}`}
              target="_blank" rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 truncate">
              {attendee.linkedin_url.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        )}
      </div>

      {attendee.looking_for.length > 0 && (
        <div className="mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Looking for</p>
          <div className="flex flex-wrap gap-2">
            {attendee.looking_for.map(tag => (
              <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${TAG_COLOURS[tag] ?? TAG_COLOURS.Networking}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {attendee.phone && (
        <a href={`https://wa.me/91${attendee.phone.replace(/\D/g, '').slice(-10)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.851L.054 23.385a.75.75 0 0 0 .931.93l5.582-1.46A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.953-1.352l-.355-.211-3.678.963.981-3.593-.232-.371A9.722 9.722 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
          Message on WhatsApp
        </a>
      )}
    </main>
  )
}
