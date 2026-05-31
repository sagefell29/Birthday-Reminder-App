import type { Birthday } from "@/types/birthday"

import {
    getAge,
    getBirthMonth,
} from "./dateUtils"

export interface BirthdayFilters {
    search: string
    month: string
    minAge: string
    maxAge: string
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function filterBirthdays(
    birthdays: Birthday[],
    filters: BirthdayFilters
) {
    const {
        search,
        month,
        minAge,
        maxAge,
    } = filters

    return birthdays.filter(
        (birthday) => {

            const searchMatch =
                birthday.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

            const monthMatch =
                month === "All"
                    ? true
                    : getBirthMonth(
                        birthday.birthdate
                    ) ===
                    MONTHS.indexOf(month)

            const age =
                getAge(
                    birthday.birthdate
                )

            const minAgeMatch =
                !minAge ||
                age >= Number(minAge)

            const maxAgeMatch =
                !maxAge ||
                age <= Number(maxAge)

            return (
                searchMatch &&
                monthMatch &&
                minAgeMatch &&
                maxAgeMatch
            )
        }
    )
}