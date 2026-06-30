import type { Anniversary } from "@/types/anniversary"

import { MONTHS } from "./dateUtils"

import {
    daysUntilDate,
    isEventToday,
    daysUntilEvent,
    isEventWithinRange,
    isEventThisMonth,
    isEventWithinDays,
    getAge,
    getEventMonth
} from "@/utils/dateUtils"

export function getTodaysAnniversaries(
    anniversaries: Anniversary[]
) {
    return anniversaries.filter(
        (anniversary) =>
            isEventToday(
                anniversary.date
            )
    )
}

export function getUpcomingAnniversaries(
    anniversaries: Anniversary[],
    days: number
) {
    return anniversaries
        .filter(
            (anniversary) =>
                daysUntilDate(
                    anniversary.date
                ) <= days
        )
        .sort(
            (a, b) =>
                daysUntilDate(
                    a.date
                ) -
                daysUntilDate(
                    b.date
                )
        )
}

export function getAnniversaryStats(
    anniversaries: Anniversary[]
) {

    const todaysAnniversaries = getTodaysAnniversaries(anniversaries)

    const upcomingAnniversaries = getUpcomingAnniversaries(
        anniversaries,360).slice(0, 5)

    const upcomingThisWeek = getUpcomingAnniversaries(anniversaries, 7)

    const upcomingThisMonth = getUpcomingAnniversaries(anniversaries, 31)

    const totalAnniversaries = anniversaries.length

    const anniversariesThisMonth = upcomingThisMonth.length

    const anniversariesThisWeek = upcomingThisWeek.length

    const mostCommonAnniversaryMonth = getMostCommonAnniversaryMonth(anniversaries)

    const averageAge =
        anniversaries.length === 0
            ? 0
            : Math.round(
                anniversaries.reduce(
                    (sum, anniversary) =>
                        sum +
                        getAge(
                            anniversary.date
                        ),
                    0
                ) / anniversaries.length
            )

    return {
        todaysAnniversaries,
        upcomingAnniversaries,
        upcomingThisWeek,
        upcomingThisMonth,
        totalAnniversaries,
        anniversariesThisMonth,
        anniversariesThisWeek,
        averageAge,
        mostCommonAnniversaryMonth
    }
}

export function getMostCommonAnniversaryMonth(
    anniversaries: Anniversary[]
) {

    if (anniversaries.length === 0) {
        return "-"
    }

    const counts = new Array(12).fill(0)

    anniversaries.forEach((event) => {
        counts[
            getEventMonth(event.date)
        ]++
    })

    const max =
        Math.max(...counts)

    return MONTHS[
        counts.indexOf(max)
    ]
}

interface FilterOptions {
    search: string
    month: string
}

export function sortAnniversariesByDate(
    anniversaries: Anniversary[]
) {
    return [...anniversaries].sort(
        (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
    )
}

export function searchAnniversaries(
    anniversaries: Anniversary[],
    search: string
) {
    return anniversaries.filter(
        (anniversary) =>
            anniversary.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    )
}

export function filterAnniversaries(
    anniversaries: Anniversary[],
    filters: FilterOptions
) {
    const {
        search,
        month,
    } = filters

    return anniversaries.filter((anniversary) => {

        const searchMatch =
            anniversary.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        const monthMatch =
            month === "All"
                ? true
                : getEventMonth(
                    anniversary.date
                ) === MONTHS.indexOf(month)

        return (
            searchMatch &&
            monthMatch
        )
    })
}