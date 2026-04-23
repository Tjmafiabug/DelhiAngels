import type { Attendee, AttendeeRole, LookingFor } from './types'

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function isAdminEmail(email: string, adminEmailsEnv: string): boolean {
  if (!adminEmailsEnv) return false
  return adminEmailsEnv.split(',').map(e => e.trim()).includes(email)
}

export function filterAttendees(
  attendees: Attendee[],
  query: string,
  role: AttendeeRole | null,
  lookingFor: LookingFor | null
): Attendee[] {
  return attendees.filter(a => {
    const q = query.toLowerCase()
    const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.company.toLowerCase().includes(q)
    const matchesRole = !role || a.role === role
    const matchesLookingFor = !lookingFor || a.looking_for.includes(lookingFor)
    return matchesQuery && matchesRole && matchesLookingFor
  })
}
