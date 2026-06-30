import type { Anniversary } from "@/types/anniversary"
import LoadingButton
    from "@/components/ui/LoadingButton"
import FormMessage
    from "@/components/ui/FormMessage"
import { useAnniversaryForm }
    from "@/hooks/useAnniversaryForm"

interface Props {
    onAnniversaryAdded: () => Promise<void>
    editingAnniversary?: Anniversary | null
    clearEditing: () => void
}

export default function AddAnniversaryForm({
    onAnniversaryAdded,
    editingAnniversary,
    clearEditing
}: Props) {

    const {
        title,
        setTitle,
        date,
        setDate,
        notes,
        setNotes,
        loading,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        handleSubmit,
        cancelEdit,
        isValid
    } = useAnniversaryForm({
        editingAnniversary,
        clearEditing,
        onAnniversaryAdded,
    })

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border border-neutral-800 p-4"
        >

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    {editingAnniversary
                        ? "Edit Anniversary"
                        : "Add Anniversary"}
                </h2>

                {editingAnniversary && (
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
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(
                        e.target.value
                    )
                }
                className="w-full rounded-md bg-neutral-900 p-2"
            />

            <input
                type="date"
                value={date}
                onChange={(e) =>
                    setDate(
                        e.target.value
                    )
                }
                className="w-full rounded-md bg-neutral-900 p-2"
            />

            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) =>
                    setNotes(
                        e.target.value
                    )
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
                hover:bg-green-700"
            >
                {editingAnniversary
                    ? "Update Anniversary"
                    : "Save Anniversary"}
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