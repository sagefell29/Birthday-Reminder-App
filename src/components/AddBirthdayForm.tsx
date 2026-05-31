import { useEffect, useState } from "react"
import {
  addBirthday,
  updateBirthday,
} from "@/services/birthdayService"
import type { Birthday } from "@/types/birthday"
import LoadingButton from "@/components/ui/LoadingButton"

interface Props {
  onBirthdayAdded: () => Promise<void>

  editingBirthday?: Birthday | null

  clearEditing: () => void
}

export default function AddBirthdayForm({
  onBirthdayAdded,
  editingBirthday,
  clearEditing,
}: Props) {

  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] =
    useState("")
  const [errorMessage, setErrorMessage] =
    useState("")

  useEffect(() => {
    if (editingBirthday) {
      setName(editingBirthday.name)
      setBirthdate(editingBirthday.birthdate)
      setNotes(editingBirthday.notes || "")
    }
  }, [editingBirthday])

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setSuccessMessage("")
    setErrorMessage("")

    try {

      if (!name || !birthdate) {
        setErrorMessage(
          "Name and birthdate are required."
        )
        return
      }

      setLoading(true)

      // Simulate small UX delay
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      )

      // EDIT MODE
      if (editingBirthday) {

        await updateBirthday({
          id: editingBirthday.id,
          name,
          birthdate,
          notes,
        })

        clearEditing()

        setSuccessMessage(
          "Birthday updated successfully."
        )

      } else {

        // CREATE MODE
        await addBirthday({
          name,
          birthdate,
          notes,
        })

        setSuccessMessage(
          "Birthday added successfully."
        )
      }

      setName("")
      setBirthdate("")
      setNotes("")

      await onBirthdayAdded()

    } catch (error) {

      console.error(error)

      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(
          "Something went wrong."
        )
      }

    } finally {

      setLoading(false)

    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-neutral-800 p-4"
    >

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          {editingBirthday
            ? "Edit Birthday"
            : "Add Birthday"}
        </h2>

        {editingBirthday && (
          <button
            type="button"
            onClick={() => {
              clearEditing()

              setName("")
              setBirthdate("")
              setNotes("")
            }}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
        )}

      </div>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full rounded-md bg-neutral-900 p-2"
      />

      <input
        type="date"
        value={birthdate}
        onChange={(e) =>
          setBirthdate(e.target.value)
        }
        className="w-full rounded-md bg-neutral-900 p-2"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="w-full rounded-md bg-neutral-900 p-2"
      />

      <LoadingButton
        type="submit"
        loading={loading}
      >
        {editingBirthday
          ? "Update Birthday"
          : "Save Birthday"}
      </LoadingButton>

      {successMessage && (
        <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

    </form>
  )
}