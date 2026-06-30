import type { EventItem }
    from "@/types/eventItem"

import {
    getAge,
    daysUntilEvent,
} from "@/utils/dateUtils"

interface Props {
    event: EventItem
}

export default function UpcomingEventCard({
    event,
}: Props) {

    const isBirthday =
        event.type === "birthday"

    return (
        <div className="rounded-lg border border-neutral-800 p-4">

            <div className="flex items-start justify-between">

                <div>

                    <div className="mb-1 flex items-center gap-2">

                        <h3 className="font-semibold">
                            {event.title}
                        </h3>

                        <span
                            className={
                                isBirthday
                                    ? "rounded bg-green-500/15 px-2 py-0.5 text-xs text-green-400"
                                    : "rounded bg-blue-500/15 px-2 py-0.5 text-xs text-blue-400"
                            }
                        >
                            {isBirthday
                                ? "Birthday"
                                : "Anniversary"}
                        </span>

                    </div>

                    <p className="text-sm text-neutral-400">

                        {isBirthday
                            ? `Turning ${getAge(event.date) + 1}`
                            : `${new Date().getFullYear() - new Date(event.date).getFullYear()} years together`
                        }

                    </p>

                </div>

                <div className="text-right">

                    <p className="font-semibold">
                        {daysUntilEvent(
                            event.date
                        )} days
                    </p>

                </div>

            </div>

        </div>
    )
}