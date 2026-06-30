import type { Birthday } from "@/types/birthday"
import LoadingButton from "@/components/ui/LoadingButton"
import { useBirthdayForm }
  from "@/hooks/useBirthdayForm"
import FormMessage
  from "@/components/ui/FormMessage"

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

  const {
    name,
    birthdate,
    notes,
    setName,
    setBirthdate,
    setNotes,
    loading,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
    handleSubmit,
    cancelEdit,
    isValid
  } = useBirthdayForm({
    editingBirthday,
    clearEditing,
    onBirthdayAdded
  })

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
            onClick={cancelEdit}
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
        isValid={isValid}
        className="
          bg-green-600
          text-white
          hover:bg-green-700
          disabled:cursor-not-allowed
          disabled:opacity-50"
          
      >
        {editingBirthday
          ? "Update Birthday"
          : "Save Birthday"}
      </LoadingButton>

      <FormMessage
        successMessage={successMessage}
        errorMessage={errorMessage}
        clearSuccess={() => setSuccessMessage("")}
        clearError={() => setErrorMessage("")}
      />

    </form>
  )
}