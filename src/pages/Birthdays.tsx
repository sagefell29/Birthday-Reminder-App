import { useState } from "react"
import AddBirthdayForm from "@/components/AddBirthdayForm"
import BirthdayCard from "@/components/BirthdayCard"
import BirthdayFilters from "@/components/BirthdayFilters"
import type { Birthday } from "@/types/birthday"
import {
    filterBirthdays,
} from "@/utils/birthdayUtils"
import { useBirthdays } from "@/hooks/useBirthday"

export default function Birthdays() {

    const [editingBirthday, setEditingBirthday] =
        useState<Birthday | null>(null)

    const [search, setSearch] =
        useState("")

    const [month, setMonth] =
        useState("All")

    const [minAge, setMinAge] =
        useState("")

    const [maxAge, setMaxAge] =
        useState("")

    const {
        birthdays,
        loadBirthdays,
        deleteBirthdayById,
    } = useBirthdays()

    const filteredBirthdays =
        filterBirthdays(
            birthdays,
            {
                search,
                month,
                minAge,
                maxAge,
            }
        )

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <section
                className="
        rounded-xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
    "
            >

                <h1
                    className="
            text-3xl
            font-bold
        "
                >
                    Birthday Management
                </h1>

                <p
                    className="
            mt-2
            text-neutral-400
        "
                >
                    Add, edit, import, export,
                    and manage all saved birthdays.
                </p>

            </section>

            <AddBirthdayForm
                onBirthdayAdded={
                    loadBirthdays
                }
                editingBirthday={
                    editingBirthday
                }
                clearEditing={() =>
                    setEditingBirthday(null)
                }
            />

            <BirthdayFilters
                search={search}
                setSearch={setSearch}
                month={month}
                setMonth={setMonth}
                minAge={minAge}
                setMinAge={setMinAge}
                maxAge={maxAge}
                setMaxAge={setMaxAge}
            />

            <div
                className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        border-neutral-800
        px-4
        py-3
    "
            >

                <span
                    className="text-neutral-400"
                >
                    Showing
                    {" "}
                    {filteredBirthdays.length}
                    {" "}
                    of
                    {" "}
                    {birthdays.length}
                    {" "}
                    birthdays
                </span>

            </div>

            {filteredBirthdays.length === 0 ? (

                <div
                    className="
            rounded-xl
            border
            border-neutral-800
            p-6
            text-center
            text-neutral-400
        "
                >
                    No birthdays match
                    the selected filters.
                </div>

            ) : (

                <div className="grid gap-4">

                    {filteredBirthdays.map(
                        (birthday) => (
                            <BirthdayCard
                                key={birthday.id}
                                birthday={birthday}
                                onDelete={
                                    deleteBirthdayById
                                }
                                onEdit={
                                    setEditingBirthday
                                }
                            />
                        )
                    )}

                </div>
            )}

        </div>
    )
}