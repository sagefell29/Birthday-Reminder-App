import { useEffect, useState } from "react"

import type { Birthday } from "@/types/birthday"

import {
    getBirthdays,
    deleteBirthday,
} from "@/services/birthdayService"

export function useBirthdays() {
    const [loading, setLoading] =
        useState(true)

    const [search, setSearch] =
        useState("")

    const [month, setMonth] =
        useState("All")

    const [minAge, setMinAge] =
        useState("")

    const [maxAge, setMaxAge] =
        useState("")

    const [error, setError] =
        useState<string | null>(null)

    const [editingBirthday, setEditingBirthday] =
        useState<Birthday | null>(null)

    const [birthdays, setBirthdays] =
        useState<Birthday[]>([])

    function clearFilters() {
        setSearch("")
        setMonth("All")
        setMinAge("")
        setMaxAge("")
    }

    async function loadBirthdays() {
        try {
            setLoading(true)
            setError(null)

            const data =
                await getBirthdays()

            setBirthdays(data)

        } catch (err) {
            console.error(err)

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load birthdays"
            )
        } finally {
            setLoading(false)
        }
    }

    async function deleteBirthdayById(
        id: number
    ) {
        try {
            await deleteBirthday(id)

            await loadBirthdays()

        } catch (err) {
            console.error(err)

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete birthday"
            )
        }
    }

    useEffect(() => {
        loadBirthdays()
    }, [])

    const hasActiveFilters =
    search !== "" ||
    month !== "All" ||
    minAge !== "" ||
    maxAge !== ""

    return {
        birthdays,
        loading,
        error,
        loadBirthdays,
        deleteBirthdayById,
        editingBirthday,
        setEditingBirthday,
        search,
        setSearch,
        month,
        setMonth,
        minAge,
        setMinAge,
        maxAge,
        setMaxAge,
        clearFilters,
        hasActiveFilters,
    }
}