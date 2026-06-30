import { useEffect } from "react"

import { notify } from "@/services/notificationService"

import { getBirthdays } from "@/services/birthdayService"
import { getTodaysBirthdays } from "@/utils/birthdayUtils"

import { getAnniversaries } from "@/services/anniversaryService"
import { getTodaysAnniversaries } from "@/utils/anniversaryUtils"

import {
    buildTodayMessage,
    wasNotificationSentToday,
    markNotificationSent,
} from "@/utils/notificationUtils"

const CHECK_INTERVAL = 60 * 1000 // 1 minute

export async function useNotificationTimer() {

    const birthdays = getBirthdays()
    const todaysBirthdays = getTodaysBirthdays(await birthdays)

    const anniversaries = getAnniversaries()
    const todaysAnniversaries = getTodaysAnniversaries(await anniversaries)

    useEffect(() => {

        function checkNotifications() {

            if (wasNotificationSentToday()) {
                return
            }

            const message = buildTodayMessage(
                todaysBirthdays,
                todaysAnniversaries
            )

            if (!message) {
                return
            }

            notify(
                "Today's Events",
                message
            )

            markNotificationSent()
        }

        checkNotifications()

        const interval = setInterval(
            checkNotifications,
            CHECK_INTERVAL
        )

        return () => clearInterval(interval)

    }, [
        todaysBirthdays,
        todaysAnniversaries,
    ])
}