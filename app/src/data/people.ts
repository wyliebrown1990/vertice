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
  // Full-demo chapters (roadmap/FULL-DEMO-PLAN.md §5)
  { id: 'sam-okafor', name: 'Sam Okafor', title: 'Customer Support Lead', org: 'Northwind' },
  { id: 'dana-kim', name: 'Dana Kim', title: 'IT Security Manager', org: 'Northwind' },
  { id: 'leah-brooks', name: 'Leah Brooks', title: 'Senior Legal Counsel', org: 'Northwind' },
  { id: 'marcus-lee', name: 'Marcus Lee', title: 'Cloud Platform Lead', org: 'Northwind' },
  { id: 'olivia-grant', name: 'Olivia Grant', title: 'Chief Financial Officer', org: 'Northwind' },
  { id: 'nina-patel', name: 'Nina Patel', title: 'Procurement Expert, Vertice', org: 'Vertice' },
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
