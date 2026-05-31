import { useEffect, useState } from "react"

import type { Birthday } from "@/types/birthday"

import {
    getBirthdays,
    deleteBirthday,
} from "@/services/birthdayService"

export function useBirthdays() {
    const [birthdays, setBirthdays] =
        useState<Birthday[]>([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState<string | null>(null)

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

    return {
        birthdays,

        loading,
        error,

        loadBirthdays,
        deleteBirthdayById,
    }
}