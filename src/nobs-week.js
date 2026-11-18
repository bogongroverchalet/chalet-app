import winterWeeks from './winter-weeks.yaml'

const YEAR = String(winterWeeks.year)
const SELECTED_WEEK_KEY = `nobs-selected-week-${YEAR}`
// Summer events, in calendar order; names from bogongroverchalet.org.au's key dates (+ Anzac).
// Not dated: they move each year, and reports for them file under the current calendar year.
export const SUMMER_EVENTS = [
  'December working bee',
  'Summer week',
  'Australia Day working bee',
  'Labour Day working bee',
  'Easter working bee',
  'Anzac working bee',
  'Food working bee',
]

const isKnownWeek = (name) => SUMMER_EVENTS.includes(name) || winterWeeks.weeks.some((w) => w.name === name)

function detectCurrentWeek() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date())
  return winterWeeks.weeks.find(({ start, end }) => today >= start && today <= end)?.name
}

export function getDefaultWeek() {
  try {
    const saved = localStorage.getItem(SELECTED_WEEK_KEY)
    if (saved && isKnownWeek(saved)) return saved
  } catch {}
  return detectCurrentWeek() ?? winterWeeks.weeks[0].name
}

export function saveSelectedWeek(weekName) {
  localStorage.setItem(SELECTED_WEEK_KEY, weekName)
}

// Dropbox folder + year for a week: winter weeks file as `<winter year>/Week N`, others under the current year.
export function weekFolder(weekName) {
  const idx = winterWeeks.weeks.findIndex((w) => w.name === weekName)
  if (idx >= 0) return { year: YEAR, folder: `Week ${idx + 1}` }
  const year = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne', year: 'numeric' }).format(new Date())
  return { year, folder: weekName }
}
