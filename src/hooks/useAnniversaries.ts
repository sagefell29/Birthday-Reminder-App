import { useEffect, useState } from "react"
import type { Anniversary } from "@/types/anniversary"
import {
    getAnniversaries,
    deleteAnniversary,
} from "@/services/anniversaryService"
import { filterAnniversaries } from "@/utils/anniversaryUtils"

export function useAnniversaries() {

    const [anniversaries,
        setAnniversaries] =
        useState<Anniversary[]>([])

    useEffect(() => {
        loadAnniversaries()
    }, [])

    async function loadAnniversaries() {
        const data =
            await getAnniversaries()

        setAnniversaries(data)
    }

    async function deleteAnniversaryById(
        id: number
    ) {
        await deleteAnniversary(id)

        await loadAnniversaries()
    }

    const [search, setSearch] =
        useState("")

    const [month, setMonth] =
        useState("All")

    const filteredAnniversaries =
        filterAnniversaries(
            anniversaries,
            { search, month }
        )

    const [editingAnniversary, setEditingAnniversary] =
        useState<Anniversary | null>(null)

    const clearEditing = () => {
        setEditingAnniversary(null)
    }

    const clearFilters = () => {
        setSearch("")
        setMonth("All")
    }

    return {
        anniversaries,
        loadAnniversaries,
        deleteAnniversaryById,
        search,
        setSearch,
        month,
        setMonth,
        filteredAnniversaries,
        editingAnniversary,
        setEditingAnniversary,
        clearEditing,
        clearFilters,
    }
}