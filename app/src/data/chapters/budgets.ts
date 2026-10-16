/**
 * Budget Management (Chapters B and D). FY2027 departmental software budgets,
 * derived from the strategic portfolio so they reconcile with Annualized spend:
 * budget = annual spend × 1.2 (rounded up to $10K); spend splits into paid,
 * invoiced and committed; the rest is free.
 */
import { vendors, type Department } from '../vendors'

export const FISCAL_YEAR = 'FY2027'
const HEADROOM = 1.2
const PAID_SHARE = 0.62
const INVOICED_SHARE = 0.13

export interface DeptBudget {
  department: Department
  owner: string
  budget: number
  paid: number
  invoiced: number
  committed: number
  free: number
}

const OWNERS: Partial<Record<Department, string>> = {
  Sales: 'Jordan Reyes',
  Support: 'Sam Okafor',
  Legal: 'Leah Brooks',
  Finance: 'Priya Shah',
  Security: 'Dana Kim',
  Engineering: 'Marcus Lee',
  IT: 'Chris Novak',
  People: 'Hannah Ruiz',
  Data: 'Omar Haddad',
  Marketing: 'Ella Fischer',
  Product: 'Ben Carter',
  Operations: 'Grace Liu',
}

const roundUp10k = (n: number) => Math.ceil(n / 10_000) * 10_000

export const departmentBudgets = (): DeptBudget[] => {
  const spend = new Map<Department, number>()
  for (const v of vendors) spend.set(v.department, (spend.get(v.department) ?? 0) + v.annualCost)
  return [...spend.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([department, s]) => {
      const budget = roundUp10k(s * HEADROOM)
      const paid = Math.round(s * PAID_SHARE)
      const invoiced = Math.round(s * INVOICED_SHARE)
      const committed = s - paid - invoiced
      return { department, owner: OWNERS[department] ?? 'Department head', budget, paid, invoiced, committed, free: budget - s }
    })
}

export const budgetFor = (d: Department) => departmentBudgets().find((b) => b.department === d)!

/** Effect of a new request on a department budget. */
export const budgetImpact = (d: Department, amount: number) => {
  const b = budgetFor(d)
  const used = b.paid + b.invoiced + b.committed
  return {
    budget: b,
    share: amount / b.budget,
    yearEndPct: (used + amount) / b.budget,
    inBudget: amount <= b.free,
    freeAfter: b.free - amount,
  }
}
