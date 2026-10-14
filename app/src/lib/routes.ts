import { S1_REQUEST_ID } from '../data/scenario'

export const requestPath = `/intelligent-workflows/requests/${S1_REQUEST_ID}/overview`
export const contractPath = (id: string, tab: 'overview' | 'benchmark' | 'outcomes' = 'overview') => `/contracts/${id}/${tab}`
