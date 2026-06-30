import BirthdayCard from "@/components/BirthdayCard"
import StatsCard from "@/components/StatsCard"
import UpcomingEventCard from "@/components/UpcomingEventCard"

import { useDashboard } from "@/hooks/useDashboard"

import type { Birthday } from "@/types/birthday"
import type { EventItem } from "@/types/eventItem"

export default function Dashboard() {

    const {
        // Birthdays
        todaysBirthdays,
        totalBirthdays,
        averageAge,
        mostCommonBirthdayMonth,

        // Anniversaries
        totalAnniversaries,
        mostCommonAnniversaryMonth,

        // Combined Events
        totalEvents,
        mostCommonEventMonth,
        upcomingEventsThisWeek,
        upcomingEventsThisMonth,
    } = useDashboard()

    return (
        <div className="space-y-6">

            <section>

                <h2 className="mb-4 text-2xl font-semibold">
                    Overview
                </h2>

                <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">

                    <StatsCard
                        title="Total Events"
                        value={totalEvents}
                    />

                    <StatsCard
                        title="Total Birthdays"
                        value={totalBirthdays}
                    />

                    <StatsCard
                        title="Total Anniversaries"
                        value={totalAnniversaries}
                    />

                    {/* <StatsCard
                        title="Average Age"
                        value={averageAge}
                    /> */}

                    <StatsCard
                        title="Most Events"
                        value={mostCommonEventMonth}
                    />

                    <StatsCard
                        title="Most Birthdays"
                        value={mostCommonBirthdayMonth}
                    />

                    <StatsCard
                        title="Most Anniversaries"
                        value={mostCommonAnniversaryMonth}
                    />

                </div>

            </section>

            <section>

                <h2 className="mb-4 text-2xl font-semibold">
                    Today's Birthdays
                </h2>

                {todaysBirthdays.length === 0 ? (

                    <div className="rounded-lg border border-neutral-800 p-4">
                        No birthdays today.
                    </div>

                ) : (

                    <div className="grid gap-4">

                        {todaysBirthdays.map(
                            (birthday: Birthday) => (

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
                    Upcoming Events in the next 7 days:
                    {" "}
                    {upcomingEventsThisWeek.length}
                </h2>

                {upcomingEventsThisWeek.length === 0 ? (

                    <div className="rounded-lg border border-neutral-800 p-4">
                        No upcoming events in the next 7 days.
                    </div>

                ) : (

                    <div className="grid gap-4">

                        {upcomingEventsThisWeek.map(
                            (event: EventItem) => (

                                <UpcomingEventCard
                                    key={`${event.type}-${event.id}`}
                                    event={event}
                                />

                            )
                        )}

                    </div>

                )}

            </section>

            <section>

                <h2 className="mb-4 text-2xl font-semibold">
                    Upcoming Events in the next 30 days:
                    {" "}
                    {upcomingEventsThisMonth.length}
                </h2>

                {upcomingEventsThisMonth.length === 0 ? (

                    <div className="rounded-lg border border-neutral-800 p-4">
                        No upcoming events in the next 30 days.
                    </div>

                ) : (

                    <div className="grid gap-4">

                        {upcomingEventsThisMonth.map(
                            (event: EventItem) => (

                                <UpcomingEventCard
                                    key={`${event.type}-${event.id}`}
                                    event={event}
                                />

                            )
                        )}

                    </div>

                )}

            </section>

        </div>
    )
}