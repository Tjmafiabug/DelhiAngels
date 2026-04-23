export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-900 px-6 py-3 flex justify-between items-center">
        <span className="font-semibold text-sm">Delhi Angels · Admin</span>
      </nav>
      {children}
    </div>
  )
}
