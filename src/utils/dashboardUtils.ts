import type { Birthday } from "@/types/birthday"

import {
    isBirthdayToday,
    isBirthdayThisMonth,
    isBirthdayWithinDays,
    isBirthdayWithinRange,
    daysUntilBirthday,
    getAge,
} from "./dateUtils"

export function getDashboardData(
    birthdays: Birthday[]
) {

    const todaysBirthdays =
        birthdays.filter((birthday) =>
            isBirthdayToday(
                birthday.birthdate
            )
        )

    const upcomingBirthdays =
        birthdays
            .filter(
                (birthday) =>
                    !isBirthdayToday(
                        birthday.birthdate
                    )
            )
            .sort(
                (a, b) =>
                    daysUntilBirthday(
                        a.birthdate
                    ) -
                    daysUntilBirthday(
                        b.birthdate
                    )
            )
            .slice(0, 5)

    const upcomingThisWeek =
        birthdays
            .filter((birthday) =>
                isBirthdayWithinRange(
                    birthday.birthdate,
                    1,
                    7
                )
            )
            .sort(
                (a, b) =>
                    daysUntilBirthday(
                        a.birthdate
                    ) -
                    daysUntilBirthday(
                        b.birthdate
                    )
            )

    const upcomingThisMonth =
        birthdays
            .filter((birthday) =>
                isBirthdayWithinRange(
                    birthday.birthdate,
                    8,
                    30
                )
            )
            .sort(
                (a, b) =>
                    daysUntilBirthday(
                        a.birthdate
                    ) -
                    daysUntilBirthday(
                        b.birthdate
                    )
            )

    const totalBirthdays =
        birthdays.length

    const birthdaysThisMonth =
        birthdays.filter((birthday) =>
            isBirthdayThisMonth(
                birthday.birthdate
            )
        ).length

    const birthdaysThisWeek =
        birthdays.filter((birthday) =>
            isBirthdayWithinDays(
                birthday.birthdate,
                7
            )
        ).length

    const averageAge =
        birthdays.length === 0
            ? 0
            : Math.round(
                birthdays.reduce(
                    (sum, birthday) =>
                        sum +
                        getAge(
                            birthday.birthdate
                        ),
                    0
                ) / birthdays.length
            )

    return {
        todaysBirthdays,
        upcomingBirthdays,
        upcomingThisWeek,
        upcomingThisMonth,

        totalBirthdays,
        birthdaysThisMonth,
        birthdaysThisWeek,
        averageAge,
    }
}

export function getOldestContact(
  birthdays: Birthday[]
) {
  if (birthdays.length === 0) {
    return null
  }

  return birthdays.reduce(
    (oldest, current) =>
      getAge(current.birthdate) >
      getAge(oldest.birthdate)
        ? current
        : oldest
  )
}

export function getYoungestContact(
  birthdays: Birthday[]
) {
  if (birthdays.length === 0) {
    return null
  }

  return birthdays.reduce(
    (youngest, current) =>
      getAge(current.birthdate) <
      getAge(youngest.birthdate)
        ? current
        : youngest
  )
}

export function getMostCommonMonth(
  birthdays: Birthday[]
) {

  const monthCounts =
    Array(12).fill(0)

  birthdays.forEach(
    (birthday) => {
      const month =
        new Date(
          birthday.birthdate
        ).getMonth()

      monthCounts[month]++
    }
  )

  const maxCount =
    Math.max(...monthCounts)

  const monthIndex =
    monthCounts.indexOf(maxCount)

  const months = [
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

  return months[monthIndex]
}