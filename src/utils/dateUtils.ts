export function isBirthdayToday(
  dateString: string
) {
  const today = new Date()
  const birthday = new Date(dateString)

  return (
    today.getDate() === birthday.getDate() &&
    today.getMonth() === birthday.getMonth()
  )
}

export function formatBirthdayDate(
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
  birthdate: string
) {
  const today = new Date()
  const birth = new Date(birthdate)

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

export function getBirthMonth(
  birthdate: string
) {
  return new Date(birthdate).getMonth()
}

export function daysUntilBirthday(
  birthdate: string
) {
  const today = new Date()

  const birthday = new Date(birthdate)

  const nextBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  )

  if (nextBirthday < today) {
    nextBirthday.setFullYear(
      today.getFullYear() + 1
    )
  }

  const diff =
    nextBirthday.getTime() -
    today.getTime()

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  )
}

export function isBirthdayThisMonth(
  birthdate: string
) {
  const today = new Date()

  return (
    new Date(birthdate).getMonth() ===
    today.getMonth()
  )
}

export function isBirthdayWithinDays(
  birthdate: string,
  days: number
) {
  return (
    daysUntilBirthday(birthdate) <= days
  )
}

export function isBirthdayWithinRange(
  birthdate: string,
  minDays: number,
  maxDays: number
) {
  const days = daysUntilBirthday(
    birthdate
  )

  return (
    days >= minDays &&
    days <= maxDays
  )
}