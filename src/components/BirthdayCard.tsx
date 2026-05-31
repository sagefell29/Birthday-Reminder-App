import { type Birthday } from "@/types/birthday"
import {
  formatBirthdayDate,
} from "@/utils/dateUtils"

interface Props {
  birthday: Birthday
  onDelete: (id: number) => Promise<void>
  onEdit: (birthday: Birthday) => void
}

export default function BirthdayCard({
  birthday,
  onDelete,
  onEdit,
}: Props) {
  async function handleDelete() {
    if (!birthday.id) return

    await onDelete(birthday.id)
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            {birthday.name}
          </h3>

          <p className="text-sm text-neutral-400">
            {formatBirthdayDate(birthday.birthdate)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() => onEdit(birthday)}
            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            Edit
          </button>
        </div>

      </div>

      {birthday.notes && (
        <p className="mt-3 text-sm text-neutral-300">
          {birthday.notes}
        </p>
      )}
    </div>
  )
}