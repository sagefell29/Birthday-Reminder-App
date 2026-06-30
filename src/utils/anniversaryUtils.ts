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

export function getAnniversarySummary(
    anniversaries: Anniversary[]
) {

    const todaysAnniversaries =
        anniversaries.filter((anniversary) =>
            isEventToday(
                anniversary.date
            )
        )

    const upcomingAnniversaries =
        anniversaries
            .filter(
                (anniversary) =>
                    !isEventToday(
                        anniversary.date
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

    const upcomingThisWeek =
        anniversaries
            .filter((anniversary) =>
                isEventWithinRange(
                    anniversary.date,
                    1,
                    7
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

    const upcomingThisMonth =
        anniversaries
            .filter((anniversary) =>
                isEventWithinRange(
                    anniversary.date,
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

    const totalAnniversaries =
        anniversaries.length

    const anniversariesThisMonth =
        anniversaries.filter((anniversary) =>
            isEventThisMonth(
                anniversary.date
            )
        ).length

    const anniversariesThisWeek =
        anniversaries.filter((anniversary) =>
            isEventWithinDays(
                anniversary.date,
                7
            )
        ).length

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
    }
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