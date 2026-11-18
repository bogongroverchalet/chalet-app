import { expect, test } from 'bun:test'
import { parseUpload } from './server.js'

const h = (o) => new Headers(o)
const url = (p) => new URL('http://x' + p)

test('done PDF goes to Week N/<Role folder>, merch under PA, unicode name kept', () => {
  const t = parseUpload(
    url('/api/reports/2026/7/merch/done'),
    h({ 'x-device-id': 'abcdef123456', 'x-reporter-name': encodeURIComponent('Zoë/../O’Brien') })
  )
  expect(t).toEqual({ kind: 'done', rel: '2026/Week 7/PA/Merch Report Week 7 - Zoë .. O Brien (abcdef).pdf' })
})

test('draft goes to week root as json', () => {
  expect(parseUpload(url('/api/reports/2026/1/tl/draft'), h({ 'x-device-id': 'abcdef123456' })).rel).toBe(
    '2026/Week 1/tl-abcdef123456.json'
  )
})

test('rejects unknown role, bad device id, traversal', () => {
  expect(parseUpload(url('/api/reports/2026/1/xx/done'), h({ 'x-device-id': 'abcdef123456' }))).toBeNull()
  expect(parseUpload(url('/api/reports/2026/1/pl/done'), h({ 'x-device-id': '../../etc' }))).toBeNull()
  expect(parseUpload(url('/api/reports/2026/../pl/done'), h({ 'x-device-id': 'abcdef123456' }))).toBeNull()
})

test('summer week and named working bee folders; legacy numeric week', () => {
  const dev = h({ 'x-device-id': 'abcdef123456', 'x-reporter-name': 'Sam' })
  expect(parseUpload(url('/api/reports/2027/Summer%20week/pl/done'), dev).rel).toBe(
    '2027/Summer week/PL/PL Report Summer week - Sam (abcdef).pdf'
  )
  expect(
    parseUpload(url(`/api/reports/2027/${encodeURIComponent('Australia Day working bee')}/qm/draft`), dev).rel
  ).toBe('2027/Australia Day working bee/qm-abcdef123456.json')
  expect(parseUpload(url('/api/reports/2026/Week%207/tl/done'), dev).rel).toMatch(/^2026\/Week 7\/Tow\//)
  expect(parseUpload(url('/api/reports/2026/7/tl/done'), dev).rel).toMatch(/^2026\/Week 7\/Tow\//)
})

test('rejects other week folder names', () => {
  const dev = h({ 'x-device-id': 'abcdef123456' })
  for (const w of ['Random', '..', 'Working bee - ..', '.. working bee', '%E0%A4%A', 'Week 123'])
    expect(parseUpload(url(`/api/reports/2026/${w}/pl/done`), dev)).toBeNull()
})
