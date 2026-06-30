import type { Birthday } from "@/types/birthday"
import {
    getAge,
    daysUntilEvent,
} from "@/utils/dateUtils"

interface Props {
    birthday: Birthday
}

export default function UpcomingBirthdayCard({
    birthday,
}: Props) {

    return (
        <div className="rounded-lg border border-neutral-800 p-4">

            <div className="flex justify-between">

                <div>
                    <h3 className="font-semibold">
                        {birthday.title}
                    </h3>

                    <p className="text-sm text-neutral-400">
                        Turning {getAge(
                            birthday.date
                        ) + 1}
                    </p>
                </div>

                <div className="text-right">
                    <p className="font-semibold">
                        {daysUntilEvent(
                            birthday.date
                        )} days
                    </p>
                </div>

            </div>

        </div>
    )
}