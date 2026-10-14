import { S1, S1_REQUEST_ID } from '../data/scenario'
import { vendorById } from '../data/vendors'
import type { DemoState } from './types'

export interface Task {
  id: string
  title: string
  context: string
  vendorId: string
  assignee: string
  /** Display chip, e.g. "Notice in 3 days". */
  due: string
  dueTone: 'danger' | 'warning' | 'info' | 'neutral'
  to: string
  mine: boolean
}

/** A few believable seeded tasks with deliberate destinations (all read-only contracts). */
const seeded: Task[] = [
  {
    id: 'task-zoominfo',
    title: 'Decide: renew or give notice',
    context: 'ZoomInfo SalesOS renewal',
    vendorId: 'zoominfo',
    assignee: 'Alex Morgan',
    due: 'Notice in 3 days',
    dueTone: 'danger',
    to: '/contracts/zoominfo/overview',
    mine: true,
  },
  {
    id: 'task-gong',
    title: 'Confirm seat count with Sales',
    context: 'Gong renewal',
    vendorId: 'gong',
    assignee: 'Alex Morgan',
    due: 'Notice in 3 days',
    dueTone: 'danger',
    to: '/contracts/gong/overview',
    mine: true,
  },
]

/** The S1 request's current task, if it has one. */
export const s1Task = (s: DemoState): Task | null => {
  const r = s.request
  if (!r) return null
  const to = `/intelligent-workflows/requests/${S1_REQUEST_ID}/overview`
  const base = { vendorId: S1.vendorId, context: 'Salesforce renewal', to }
  switch (r.stage) {
    case 'requirements':
      return { ...base, id: 's1-req', title: 'Requirements gathering', assignee: 'Alex Morgan', due: 'Notice in 50 days', dueTone: 'warning', mine: true }
    case 'negotiation':
      return { ...base, id: 's1-neg', title: 'Vertice-led negotiation', assignee: 'Julian Hayes (Vertice)', due: 'In progress', dueTone: 'info', mine: false }
    case 'approval':
      return { ...base, id: 's1-appr', title: 'Approve final offer', assignee: 'Alex Morgan', due: 'Action needed', dueTone: 'warning', mine: true }
    case 'contracting':
      return { ...base, id: 's1-con', title: 'Contracting', assignee: 'Vertice', due: 'Approved', dueTone: 'info', mine: false }
    default:
      return null
  }
}

export const allTasks = (s: DemoState): Task[] => {
  const t = s1Task(s)
  return t ? [t, ...seeded] : seeded
}

export const myOpenTasks = (s: DemoState) => allTasks(s).filter((t) => t.mine)

export const taskVendor = (t: Task) => vendorById(t.vendorId)!
