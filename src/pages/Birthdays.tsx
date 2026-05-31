import { useState } from "react"
import AddBirthdayForm from "@/components/AddBirthdayForm"
import BirthdayCard from "@/components/BirthdayCard"
import BirthdayFilters from "@/components/BirthdayFilters"
import type { Birthday } from "@/types/birthday"
import {
    filterBirthdays,
} from "@/utils/birthdayUtils"
import { useBirthdays } from "@/hooks/useBirthday"
import {
    exportBirthdays,
    importBirthdays,
} from "@/services/importExportService"

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
        <div className="space-y-6">

            <div className="flex gap-2">

                <button
                    onClick={async () => {

                        const result =
                            await exportBirthdays()

                        alert(
                            result?.message
                        )
                    }}
                    className="rounded-md bg-green-600 px-4 py-2"
                >
                    Export
                </button>

                <button
                    onClick={async () => {

                        const result =
                            await importBirthdays()

                        alert(
                            result?.message
                        )

                        await loadBirthdays()
                    }}
                    className="rounded-md bg-blue-600 px-4 py-2"
                >
                    Import
                </button>

            </div>

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

        </div>
    )
}