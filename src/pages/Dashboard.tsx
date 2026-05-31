import BirthdayCard from "@/components/BirthdayCard"
import StatsCard from "@/components/StatsCard"
import { useDashboard } from "@/hooks/useDashboard"
import { notify } from "@/services/notificationService"
import UpcomingBirthdayCard from "@/components/UpcomingBirthdayCard"
import { useBirthdayNotifications } from "@/hooks/useBirthdayNotifications"

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

    useBirthdayNotifications(todaysBirthdays)

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
                        {upcomingThisWeek.map((birthday) => (
                            <UpcomingBirthdayCard
                                key={birthday.id}
                                birthday={birthday}
                            />
                        ))}
                    </div>
                )}

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
                        {upcomingThisMonth.map((birthday) => (
                            <UpcomingBirthdayCard
                                key={birthday.id}
                                birthday={birthday}
                            />
                        ))}
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