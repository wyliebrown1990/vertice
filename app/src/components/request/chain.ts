import type { ChainState } from './RequestShell'

/** Derive chain states from an ordered step list and the index of the active step. */
export const chainStates = (count: number, activeIdx: number, completed: boolean): ChainState[] =>
  Array.from({ length: count }, (_, i) => (completed || i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'pending'))
