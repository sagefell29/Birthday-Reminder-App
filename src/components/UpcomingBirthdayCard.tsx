import type { Birthday } from "@/types/birthday"
import {
    getAge,
    daysUntilBirthday,
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
                        {birthday.name}
                    </h3>

                    <p className="text-sm text-neutral-400">
                        Turning {getAge(
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
}