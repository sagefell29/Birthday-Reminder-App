import type { Birthday }
    from "@/types/birthday"

import {
    isBirthdayToday,
} from "@/utils/dateUtils"

export function buildTodayMessage(
    birthdays: Birthday[]
) {
    const todays =
        birthdays.filter(
            (birthday) =>
                isBirthdayToday(
                    birthday.birthdate
                )
        )

    if (todays.length === 0) {
        return null
    }

    if (todays.length === 1) {
        return `${todays[0].name} has a birthday today 🎉`
    }

    return `${todays.length} birthdays today: ${todays
        .map((b) => b.name)
        .join(", ")} 🎉`
}

export function getTodayKey() {
    return new Date()
        .toISOString()
        .split("T")[0]
}

const STORAGE_KEY =
    "birthday_notification_date"

export function wasNotificationSentToday() {
    const lastSent =
        localStorage.getItem(
            STORAGE_KEY
        )

    return lastSent === getTodayKey()
}

export function markNotificationSent() {
    localStorage.setItem(
        STORAGE_KEY,
        getTodayKey()
    )
}