export type AttendeeRole = 'Founder' | 'Co-founder' | 'Investor' | 'Operator' | 'Other'
export type AttendeeStatus = 'pending' | 'approved' | 'rejected'
export type LookingFor = 'Funding' | 'Co-founder' | 'Partnerships' | 'Hiring' | 'Networking'

export interface Attendee {
  id: string
  email: string
  name: string
  company: string
  role: AttendeeRole
  phone: string | null
  linkedin_url: string | null
  photo_url: string | null
  bio: string | null
  looking_for: LookingFor[]
  consent: boolean
  status: AttendeeStatus
  created_at: string
}
