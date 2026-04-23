import { registerAttendee } from './actions'

const ROLES = ['Founder', 'Co-founder', 'Investor', 'Operator', 'Other'] as const
const LOOKING_FOR = ['Funding', 'Co-founder', 'Partnerships', 'Hiring', 'Networking'] as const

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-1">Delhi Angels × D2C Summit</p>
          <h1 className="text-2xl font-semibold mb-2">Noida Chapter — Networking</h1>
          <p className="text-sm text-gray-400">Join the attendee directory to connect with founders & investors</p>
        </div>

        <form action={registerAttendee} encType="multipart/form-data" className="space-y-5">
          <div className="flex items-center gap-4 p-4 bg-zinc-900 border border-dashed border-zinc-700 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center text-zinc-500 text-xl flex-shrink-0">
              👤
            </div>
            <div>
              <label htmlFor="photo" className="text-sm text-gray-300 cursor-pointer hover:text-white">
                Upload your photo
              </label>
              <p className="text-xs text-gray-600 mt-0.5">Helps people recognise you at the event</p>
              <input id="photo" name="photo" type="file" accept="image/*" className="hidden" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input name="name" required placeholder="Your name"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
              <input name="email" type="email" required placeholder="you@example.com"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Company *</label>
              <input name="company" required placeholder="Your startup / firm"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Role *</label>
              <select name="role" required
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500">
                <option value="">Select role…</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
              <input name="phone" type="tel" placeholder="+91 98765 43210"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
              <input name="linkedin_url" type="url" placeholder="linkedin.com/in/…"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">One-liner bio</label>
            <textarea name="bio" rows={2} maxLength={160} placeholder="Building a D2C brand in Noida…"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 resize-none" />
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">I'm looking for</label>
            <div className="flex flex-wrap gap-2">
              {LOOKING_FOR.map(tag => (
                <label key={tag} className="cursor-pointer">
                  <input type="checkbox" name="looking_for" value={tag} className="peer hidden" />
                  <span className="px-3 py-1.5 rounded-full text-xs border border-zinc-700 text-zinc-400 peer-checked:border-indigo-500 peer-checked:bg-indigo-950 peer-checked:text-indigo-300 transition-colors">
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer">
            <input name="consent" type="checkbox" required
              className="mt-0.5 w-4 h-4 rounded accent-indigo-500 flex-shrink-0" />
            <span className="text-xs text-gray-400 leading-relaxed">
              I consent to sharing my contact details with other verified attendees of the Delhi Angels D2C Summit Noida Chapter.
            </span>
          </label>

          <button type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl text-sm transition-colors">
            Join the Attendee Directory →
          </button>
        </form>
      </div>
    </main>
  )
}
