import winterWeeks from './winter-weeks.yaml'

const YEAR = String(winterWeeks.year)
const SELECTED_WEEK_KEY = `nobs-selected-week-${YEAR}`

function detectCurrentWeek() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date())
  return winterWeeks.weeks.find(({ start, end }) => today >= start && today <= end)?.name
}

export function getDefaultWeek() {
  try {
    const saved = localStorage.getItem(SELECTED_WEEK_KEY)
    if (saved && winterWeeks.weeks.some((w) => w.name === saved)) return saved
  } catch {}
  return detectCurrentWeek() ?? winterWeeks.weeks[0].name
}

export function saveSelectedWeek(weekName) {
  localStorage.setItem(SELECTED_WEEK_KEY, weekName)
}
