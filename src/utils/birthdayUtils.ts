import type { Birthday } from "@/types/birthday"

import {
    getAge,
    getEventMonth,
    isEventToday,
    isEventWithinDays,
    isEventWithinRange,
    daysUntilEvent,
    MONTHS
} from "./dateUtils"

export interface BirthdayFilters {
    search: string
    month: string
    minAge: string
    maxAge: string
}

export function getTodaysBirthdays(
    birthdays: Birthday[]
) {
    return birthdays.filter(
        (birthday) =>
            isEventToday(
                birthday.date
            )
    )
}

export function getUpcomingBirthdays(
    birthdays: Birthday[]
) {
    return birthdays.filter(
            (birthday) =>
                !isEventToday(
                    birthday.date
                )
        )
        .sort(
            (a, b) =>
                daysUntilEvent(
                    a.date
                ) -
                daysUntilEvent(
                    b.date
                )
        )
        .slice(0, 5)
}

export function getBirthdaysThisWeek(
    birthdays: Birthday[]
) {
    return birthdays.filter((birthday) =>
        isEventWithinDays(
            birthday.date,
            7
        )
    )
}

export function getBirthdaysThisMonth(
    birthdays: Birthday[]
) {
    return birthdays
        .filter((birthday) =>
            isEventWithinRange(
                birthday.date,
                8,
                30
            )
        )
        .sort(
            (a, b) =>
                daysUntilEvent(
                    a.date
                ) -
                daysUntilEvent(
                    b.date
                )
        )
}

export function getBirthdaySummary(
    birthdays: Birthday[]
) {

    const todaysBirthdays = getTodaysBirthdays(birthdays)

    const upcomingBirthdays = getUpcomingBirthdays(birthdays)

    const upcomingThisWeek = getBirthdaysThisWeek(birthdays)

    const upcomingThisMonth = getBirthdaysThisMonth(birthdays)

    const totalBirthdays = birthdays.length

    const birthdaysThisMonth = upcomingThisMonth.length

    const birthdaysThisWeek = upcomingThisWeek.length

    const averageAge =
        birthdays.length === 0
            ? 0
            : Math.round(
                birthdays.reduce(
                    (sum, birthday) =>
                        sum +
                        getAge(birthday.date),
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
            getAge(current.date) >
                getAge(oldest.date)
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
            getAge(current.date) <
                getAge(youngest.date)
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
                    birthday.date
                ).getMonth()

            monthCounts[month]++
        }
    )

    const maxCount =
        Math.max(...monthCounts)

    const monthIndex =
        monthCounts.indexOf(maxCount)

    return MONTHS[monthIndex]
}

export function filterBirthdays(
    birthdays: Birthday[],
    filters: BirthdayFilters
) {
    const {
        search,
        month,
        minAge,
        maxAge,
    } = filters

    return birthdays.filter(
        (birthday) => {

            const searchMatch =
                birthday.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

            const monthMatch =
                month === "All"
                    ? true
                    : getEventMonth(
                        birthday.date
                    ) ===
                    MONTHS.indexOf(month)

            const age =
                getAge(
                    birthday.date
                )

            const minAgeMatch =
                !minAge ||
                age >= Number(minAge)

            const maxAgeMatch =
                !maxAge ||
                age <= Number(maxAge)

            return (
                searchMatch &&
                monthMatch &&
                minAgeMatch &&
                maxAgeMatch
            )
        }
    )
}