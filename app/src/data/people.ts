export interface Person {
  id: string
  name: string
  title: string
  org: 'Northwind' | 'Vertice'
}

export const people: Person[] = [
  { id: 'alex-morgan', name: 'Alex Morgan', title: 'Head of Procurement', org: 'Northwind' },
  { id: 'jordan-reyes', name: 'Jordan Reyes', title: 'VP Revenue Operations', org: 'Northwind' },
  { id: 'priya-shah', name: 'Priya Shah', title: 'Director, FP&A', org: 'Northwind' },
  { id: 'julian-hayes', name: 'Julian Hayes', title: 'Senior Buyer, Vertice', org: 'Vertice' },
]

export const CURRENT_USER_ID = 'alex-morgan'

export const personById = (id: string) => {
  const p = people.find((x) => x.id === id)
  if (!p) throw new Error(`Unknown person ${id}`)
  return p
}

export const initials = (name: string) =>
  name
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
