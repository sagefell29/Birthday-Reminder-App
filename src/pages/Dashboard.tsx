import BirthdayCard from "@/components/BirthdayCard"
import StatsCard from "@/components/StatsCard"

import { getAge } from "@/utils/dateUtils"

import { daysUntilBirthday } from "@/utils/dateUtils"

import { useDashboard } from "@/hooks/useDashboard"

import { notify } from "@/services/notificationService"

import {
    buildTodayMessage,
    wasNotificationSentToday,
    markNotificationSent,
} from "@/utils/notificationUtils"
import { useEffect } from "react"

export default function Dashboard() {

    const {
        todaysBirthdays,
        upcomingThisWeek,
        upcomingThisMonth,
        totalBirthdays,
        averageAge,
        oldestContact,
        youngestContact,
        mostCommonMonth,
    } = useDashboard()

    useEffect(() => {

        if (
            todaysBirthdays.length === 0
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
                todaysBirthdays
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

    return (
        <div className="space-y-6">


            <section>

                <h2 className="mb-4 text-2xl font-semibold">
                    Overview
                </h2>

                <div className="grid gap-4 md:grid-cols-4">

                    <StatsCard
                        title="Total Birthdays"
                        value={totalBirthdays}
                    />

                    <StatsCard
                        title="Average Age"
                        value={averageAge}
                    />

                    {/* <StatsCard
                        title="Oldest Contact"
                        value={
                            oldestContact
                                ? `${oldestContact.name} (${getAge(oldestContact.birthdate)})`
                                : "-"
                        }
                    />

                    <StatsCard
                        title="Youngest Contact"
                        value={
                            youngestContact
                                ? `${youngestContact.name} (${getAge(youngestContact.birthdate)})`
                                : "-"
                        }
                    /> */}

                    <StatsCard
                        title="Most Common Month"
                        value={mostCommonMonth}
                    />

                </div>

            </section>


            <section>
                <h2 className="mb-4 text-2xl font-semibold">
                    Today's Birthdays
                </h2>

                {todaysBirthdays.length === 0 ? (
                    <p>No birthdays today.</p>
                ) : (
                    <div className="grid gap-4">
                        {todaysBirthdays.map(
                            (birthday) => (
                                <BirthdayCard
                                    key={birthday.id}
                                    birthday={birthday}
                                    onDelete={async () => { }}
                                    onEdit={() => { }}
                                />
                            )
                        )}
                    </div>
                )}
            </section>

            <section>
                <h2 className="mb-4 text-2xl font-semibold">
                    Upcoming in next 7 days ({upcomingThisWeek.length})
                </h2>

                {upcomingThisWeek.length === 0 ? (
                    <div className='rounded-lg border border-neutral-800 p-4'>
                        No upcoming birthdays in the next 7 days.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {upcomingThisWeek.map(
                            (birthday) => (
                                <div
                                    key={birthday.id}
                                    className="rounded-lg border border-neutral-800 p-4"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h3 className="font-semibold">
                                                {birthday.name}
                                            </h3>

                                            <p className="text-sm text-neutral-400">
                                                Turning{" "}
                                                {getAge(
                                                    birthday.birthdate
                                                ) + 1}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="font-semibold">
                                                {daysUntilBirthday(
                                                    birthday.birthdate
                                                )} days
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>)}
            </section>

            <section>
                <h2 className="mb-4 text-2xl font-semibold">
                    Upcoming in next 30 days ({upcomingThisMonth.length})
                </h2>

                {upcomingThisMonth.length === 0 ? (
                    <div className='rounded-lg border border-neutral-800 p-4'>
                        No upcoming birthdays in the next 30 days.
                    </div>
                ) : (

                    <div className="grid gap-4">

                        {upcomingThisMonth.map(
                            (birthday) => (
                                <div
                                    key={birthday.id}
                                    className="rounded-lg border border-neutral-800 p-4"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h3 className="font-semibold">
                                                {birthday.name}
                                            </h3>

                                            <p className="text-sm text-neutral-400">
                                                Turning{" "}
                                                {getAge(
                                                    birthday.birthdate
                                                ) + 1}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="font-semibold">
                                                {daysUntilBirthday(
                                                    birthday.birthdate
                                                )} days
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>)}
            </section>

            <button
                onClick={() =>
                    notify(
                        "Birthday Reminder",
                        "Test notification"
                    )
                }
            >
                Test Notification
            </button>

            <button
                onClick={() =>
                    localStorage.removeItem(
                        "birthday_notification_date"
                    )
                }
            >
                Reset Notification State
            </button>

        </div>
    )
}