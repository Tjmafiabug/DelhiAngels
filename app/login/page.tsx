import { sendMagicLink } from './actions'

interface Props {
  searchParams: Promise<{ sent?: string; next?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-1">Delhi Angels</p>
          <h1 className="text-xl font-semibold">Access the Portal</h1>
        </div>

        {params.sent ? (
          <div className="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-2xl mb-3">📧</div>
            <p className="text-sm text-gray-300">If your email is on our approved list, check your inbox for a login link.</p>
          </div>
        ) : (
          <form action={sendMagicLink} className="space-y-4">
            <input type="hidden" name="next" value={params.next ?? '/portal'} />
            {params.error && (
              <p className="text-xs text-red-400 text-center">Authentication failed. Please try again.</p>
            )}
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input name="email" type="email" required placeholder="you@example.com"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500" />
            </div>
            <button type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl text-sm transition-colors">
              Send Login Link →
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
