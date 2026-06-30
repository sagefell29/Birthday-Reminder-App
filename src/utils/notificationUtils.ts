import type { Anniversary } from "@/types/anniversary"

import type { Birthday } from "@/types/birthday"

import {getTodaysBirthdays} from "@/utils/birthdayUtils"

import {getTodaysAnniversaries} from "@/utils/anniversaryUtils"

export function buildTodayMessage(
    birthdays: Birthday[],
    anniversaries: Anniversary[]
) {
    const birthdaysToday =
        getTodaysBirthdays(birthdays)

    const anniversariesToday =
        getTodaysAnniversaries(anniversaries)

    const lines: string[] = []

    if (birthdaysToday.length > 0) {

        lines.push("🎂 Birthdays")

        birthdaysToday.forEach((birthday) =>
            lines.push(`• ${birthday.title}`)
        )
    }

    if (anniversariesToday.length > 0) {

        if (lines.length > 0) {
            lines.push("")
        }

        lines.push("💍 Anniversaries")

        anniversariesToday.forEach((anniversary) =>
            lines.push(`• ${anniversary.title}`)
        )
    }

    return lines.join("\n")
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