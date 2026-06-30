import type { Birthday } from "@/types/birthday"
import type { Anniversary } from "@/types/anniversary"
import type { EventItem } from "@/types/eventItem"
import { MONTHS, 
    getEventMonth,
    daysUntilEvent,} from "@/utils/dateUtils"

export function combineEvents(
    birthdays: Birthday[],
    anniversaries: Anniversary[]
): EventItem[] {

    return [

        ...birthdays.map((birthday) => ({
            ...birthday,
            type: "birthday" as const,
        })),

        ...anniversaries.map((anniversary) => ({
            ...anniversary,
            type: "anniversary" as const,
        })),
    ]
}

export function getTotalEvents(
    events: EventItem[]
) {
    return events.length
}

export function getMostCommonEventMonth(
    events: EventItem[]
) {

    if (events.length === 0) {
        return "-"
    }

    const counts = new Array(12).fill(0)

    events.forEach((event) => {
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

export function getUpcomingEvents(
    events: EventItem[],
    days: number
) {

    return events
        .filter((event) => {

            const remaining =
                daysUntilEvent(
                    event.date
                )

            return (
                remaining > 0 &&
                remaining <= days
            )

        })
        .sort(
            (a, b) =>
                daysUntilEvent(a.date) -
                daysUntilEvent(b.date)
        )
}

export function getTodaysEvents(
    events: EventItem[]
) {

    return events.filter(
        (event) =>
            daysUntilEvent(
                event.date
            ) === 0
    )
}