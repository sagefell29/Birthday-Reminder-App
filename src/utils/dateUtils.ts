export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function isEventToday(
  dateString: string
) {
  const today = new Date()
  const event = new Date(dateString)

  return (
    today.getDate() === event.getDate() &&
    today.getMonth() === event.getMonth()
  )
}

export function formatEventDate(
  dateString: string
) {
  const date = new Date(dateString)

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )
}

export function getAge(
  datestring: string
) {
  const today = new Date()
  const birth = new Date(datestring)

  let age =
    today.getFullYear() -
    birth.getFullYear()

  const monthDifference =
    today.getMonth() -
    birth.getMonth()

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birth.getDate()
    )
  ) {
    age--
  }

  return age
}

export function getEventMonth(
  dateString: string
) {
  return new Date(dateString).getMonth()
}

export function daysUntilEvent(
  dateString: string
) {
  const today = new Date()

  const event = new Date(dateString)

  const nextEvent = new Date(
    today.getFullYear(),
    event.getMonth(),
    event.getDate()
  )

  if (nextEvent < today) {
    nextEvent.setFullYear(
      today.getFullYear() + 1
    )
  }

  const diff =
    nextEvent.getTime() -
    today.getTime()

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  )
}

export function isEventThisMonth(
  dateString: string
) {
  const today = new Date()

  return (
    new Date(dateString).getMonth() ===
    today.getMonth()
  )
}

export function isEventWithinDays(
  dateString: string,
  days: number
) {
  return (
    daysUntilEvent(dateString) <= days
  )
}

export function isEventWithinRange(
  dateString: string,
  minDays: number,
  maxDays: number
) {
  const days = daysUntilEvent(
    dateString
  )

  return (
    days >= minDays &&
    days <= maxDays
  )
}

export function daysUntilDate(
  dateString: string
) {
  const today =
    new Date()

  const target =
    new Date(dateString)

  target.setFullYear(
    today.getFullYear()
  )

  if (target < today) {
    target.setFullYear(
      today.getFullYear() + 1
    )
  }

  const diff =
    target.getTime() -
    today.getTime()

  return Math.ceil(
    diff /
    (1000 *
      60 *
      60 *
      24)
  )
}