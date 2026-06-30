import { useEffect, useState } from "react"

import {
    addAnniversary,
    updateAnniversary,
} from "@/services/anniversaryService"

import type { Anniversary } from "@/types/anniversary"

interface Props {
    editingAnniversary?: Anniversary | null
    clearEditing: () => void
    onAnniversaryAdded: () => Promise<void>
}

export function useAnniversaryForm({
    editingAnniversary,
    clearEditing,
    onAnniversaryAdded,
}: Props) {

    const [title, setTitle] =
        useState("")

    const [date, setDate] =
        useState("")

    const [notes, setNotes] =
        useState("")

    const [loading, setLoading] =
        useState(false)

    const [successMessage,
        setSuccessMessage] =
        useState("")

    const [errorMessage,
        setErrorMessage] =
        useState("")

    useEffect(() => {

        if (!editingAnniversary) {
            return
        }

        setTitle(
            editingAnniversary.title
        )

        setDate(
            editingAnniversary.date
        )

        setNotes(
            editingAnniversary.notes ?? ""
        )

    }, [editingAnniversary])

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault()

        try {

            setLoading(true)

            setSuccessMessage("")
            setErrorMessage("")

            if (
                !title ||
                !date
            ) {
                throw new Error(
                    "Title and date are required."
                )
            }

            if (editingAnniversary) {

                await updateAnniversary({
                    id: editingAnniversary.id,
                    title,
                    date,
                    notes,
                })

                clearEditing()

                setSuccessMessage(
                    "Anniversary updated."
                )

            } else {

                await addAnniversary({
                    title,
                    date,
                    notes,
                })

                setSuccessMessage(
                    "Anniversary added."
                )
            }

            setTitle("")
            setDate("")
            setNotes("")

            await onAnniversaryAdded()

        } catch (error) {

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            )

        } finally {

            setLoading(false)

        }
    }

    function cancelEdit() {

        clearEditing()

        setTitle("")
        setDate("")
        setNotes("")
    }

    return {

        title,
        setTitle,

        date,
        setDate,

        notes,
        setNotes,

        loading,

        successMessage,
        errorMessage,
        setSuccessMessage,
        setErrorMessage,

        handleSubmit,
        cancelEdit
    }
}