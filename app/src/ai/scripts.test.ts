import { describe, expect, test } from 'bun:test'
import { checkpoint, initialState, startRenewal } from '../domain/transitions'
import type { ChatBlock } from '../domain/types'
import { intents, matchPrompt } from './scripts'

const idOf = (p: string) => {
  const m = matchPrompt(p)
  return m.kind === 'intent' ? m.intent.id : m.kind
}

const actionIds = (blocks: ChatBlock[]) =>
  blocks.flatMap((b) => (b.kind === 'actions' ? b.items.map((a) => (typeof a.id === 'string' ? a.id : 'open')) : []))

const allText = (blocks: ChatBlock[]) =>
  blocks.map((b) => (b.kind === 'text' ? b.text : b.kind === 'table' ? b.rows.flat().join(' ') : b.kind === 'metrics' ? b.items.map((i) => i.value).join(' ') : '')).join(' ')

describe('intent matching', () => {
  test('chips select exact intents', () => {
    for (const i of intents) expect(idOf(i.chip)).toBe(i.id)
  })

  test('typed variants and typos', () => {
    expect(idOf('how can we save money on salesforce?')).toBe('s1-savings')
    expect(idOf('Sales force renwal savigns')).toBe('s1-savings')
    expect(idOf('which contracts are up for renewal soon')).toBe('s1-renewals')
    expect(idOf('show me upcoming renewals')).toBe('s1-renewals')
    expect(idOf('do we have overlapping tools')).toBe('s2-overlap')
  })

  test('never answers another vendor with Salesforce numbers', () => {
    expect(idOf('what savings can we get on Gong?')).toBe('other-vendor')
    expect(idOf('How much can we save on Gong?')).toBe('other-vendor')
    expect(idOf('negotiate the HubSpot renewal price')).toBe('other-vendor')
  })

  test('unknown prompts fall back honestly', () => {
    expect(idOf('what is the weather in London')).toBe('unknown')
  })
})

describe('stage-aware answers', () => {
  const savings = intents.find((i) => i.id === 's1-savings')!

  test('before the renewal: potential reduction + start action', () => {
    const blocks = savings.build(initialState())
    expect(allText(blocks)).toContain('$274,400')
    expect(allText(blocks)).toContain('$117,600')
    expect(actionIds(blocks)).toEqual(['view-benchmark', 'start-renewal'])
  })

  test('during the renewal: view, never start a duplicate', () => {
    expect(actionIds(savings.build(startRenewal(initialState())))).toEqual(['view-benchmark', 'view-renewal'])
  })

  test('after completion: reports the signed outcome', () => {
    const blocks = savings.build(checkpoint('outcome'))
    expect(allText(blocks)).toContain('already secured')
    expect(actionIds(blocks)).toEqual(['view-outcome'])
  })

  test('renewals table distinguishes 3-day notices from Salesforce', () => {
    const blocks = intents.find((i) => i.id === 's1-renewals')!.build(initialState())
    const text = allText(blocks)
    expect(text).toContain('ZoomInfo')
    expect(text).toContain('Gong')
    expect(text).toContain('Salesforce')
    expect(text).toContain('Dec 2 · 50d')
    expect(text).toContain('Oct 16 · 3d')
  })
})
