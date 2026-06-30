import { notify } from "@/services/notificationService"
import type { Anniversary } from "@/types/anniversary"
import type { Birthday } from "@/types/birthday"
import { buildTodayMessage, markNotificationSent, wasNotificationSentToday } from "@/utils/notificationUtils"
import { useEffect } from "react"

export function useBirthdayNotifications(
    todaysBirthdays: Birthday[],
    todaysAnniversaries: Anniversary[]
) {

    useEffect(() => {

        if (
            todaysBirthdays.length === 0 && todaysAnniversaries.length === 0
        ) {
            return
        }

        if (
            wasNotificationSentToday()
        ) {
            return
        }

        const message =
            buildTodayMessage(
                todaysBirthdays,
                todaysAnniversaries
            )

        if (!message) {
            return
        }

        notify(
            "Today's Birthdays",
            message
        )

        markNotificationSent()

    }, [todaysBirthdays])
}