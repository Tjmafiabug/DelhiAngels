import { describe, it, expect } from 'vitest'
import { getInitials, isAdminEmail, filterAttendees } from './utils'
import type { Attendee } from './types'

describe('getInitials', () => {
  it('returns initials from full name', () => {
    expect(getInitials('Tanishq Jain')).toBe('TJ')
  })
  it('handles single name', () => {
    expect(getInitials('Madonna')).toBe('M')
  })
  it('handles three word name', () => {
    expect(getInitials('Rahul Raj Verma')).toBe('RR')
  })
})

describe('isAdminEmail', () => {
  it('returns true for admin email', () => {
    expect(isAdminEmail('admin@test.com', 'admin@test.com,other@test.com')).toBe(true)
  })
  it('returns false for non-admin email', () => {
    expect(isAdminEmail('user@test.com', 'admin@test.com')).toBe(false)
  })
  it('handles empty admin list', () => {
    expect(isAdminEmail('user@test.com', '')).toBe(false)
  })
})

describe('filterAttendees', () => {
  const attendees: Attendee[] = [
    { id: '1', name: 'Priya Sharma', company: 'NutriBox', role: 'Founder', email: 'p@n.com', phone: null, linkedin_url: null, photo_url: null, bio: 'D2C food', looking_for: ['Funding'], consent: true, status: 'approved', created_at: '' },
    { id: '2', name: 'Rahul Verma', company: 'Delhi Angels', role: 'Investor', email: 'r@d.com', phone: null, linkedin_url: null, photo_url: null, bio: 'Angel investing', looking_for: ['Networking'], consent: true, status: 'approved', created_at: '' },
  ]
  it('filters by search query on name', () => {
    expect(filterAttendees(attendees, 'priya', null, null)).toHaveLength(1)
  })
  it('filters by search query on company', () => {
    expect(filterAttendees(attendees, 'nutribox', null, null)).toHaveLength(1)
  })
  it('filters by role', () => {
    expect(filterAttendees(attendees, '', 'Investor', null)).toHaveLength(1)
  })
  it('filters by looking_for tag', () => {
    expect(filterAttendees(attendees, '', null, 'Funding')).toHaveLength(1)
  })
  it('returns all when no filters', () => {
    expect(filterAttendees(attendees, '', null, null)).toHaveLength(2)
  })
})
