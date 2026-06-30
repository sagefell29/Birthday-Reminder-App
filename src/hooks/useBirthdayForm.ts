import { useEffect, useState } from "react"

import {
    addBirthday,
    updateBirthday,
} from "@/services/birthdayService"

import {
    useAsyncOperation
} from "@/hooks/useAsyncOperation"

import type { Birthday } from "@/types/birthday"

interface UseBirthdayFormProps {
    editingBirthday?: Birthday | null
    clearEditing: () => void
    onBirthdayAdded: () => Promise<void>
}

export function useBirthdayForm({
    editingBirthday,
    clearEditing,
    onBirthdayAdded,
}: UseBirthdayFormProps) {

    const [name, setName] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [notes, setNotes] = useState("")

    const {
        loading,
        successMessage,
        errorMessage,
        execute,
        setSuccessMessage,
        setErrorMessage
    } = useAsyncOperation()

    useEffect(() => {

        if (!editingBirthday) {
            return
        }

        setName(editingBirthday.title)
        setBirthdate(
            editingBirthday.date
        )
        setNotes(
            editingBirthday.notes || ""
        )

    }, [editingBirthday])

    function resetForm() {

        setName("")
        setBirthdate("")
        setNotes("")
    }

    function cancelEdit() {

        clearEditing()

        resetForm()
    }

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault()

        if (!name || !birthdate) {

            setErrorMessage(
                "Name and birthdate are required."
            )

            return
        }

        await execute(
            async () => {

                if (editingBirthday) {

                    await updateBirthday({
                        id: editingBirthday.id,
                        title: name,
                        date: birthdate,
                        notes,
                    })

                    clearEditing()

                } else {

                    await addBirthday({
                        title: name,
                        date: birthdate,
                        notes,
                    })
                }

                resetForm()

                await onBirthdayAdded()

            },
            editingBirthday
                ? "Birthday updated successfully."
                : "Birthday added successfully."
        )
    }

    const isValid =
        name.trim().length > 0 &&
        birthdate.length > 0

    return {

        name,
        birthdate,
        notes,

        setName,
        setBirthdate,
        setNotes,

        loading,

        successMessage,
        errorMessage,
        setErrorMessage,
        setSuccessMessage,

        handleSubmit,
        cancelEdit,
        isValid
    }
}