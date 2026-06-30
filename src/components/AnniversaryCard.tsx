import type { Anniversary } from "@/types/anniversary"
import { formatEventDate } from "@/utils/dateUtils"

interface Props {
    anniversary: Anniversary
    onDelete: (
        id: number
    ) => Promise<void>

    onEdit: (
        anniversary: Anniversary
    ) => void
}

export default function AnniversaryCard({
    anniversary,
    onDelete,
    onEdit
}: Props) {

    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">

            <div className="flex justify-between">

                <div>

                    <h3 className="font-semibold">
                        {anniversary.title}
                    </h3>

                    <p className="text-sm text-neutral-400">
                        {formatEventDate(anniversary.date)}
                    </p>

                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            anniversary.id &&
                            onDelete(
                                anniversary.id
                            )
                        }
                        className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                        Delete
                    </button>

                    <button
                        onClick={() =>{
                            console.log("edit anniversary", anniversary)
                            onEdit(anniversary)
                        }}
                        className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                        Edit
                    </button>

                </div>

            </div>


            {anniversary.notes && (
                <p className="mt-3 text-sm text-neutral-300">
                    {anniversary.notes}
                </p>
            )}
            
        </div>
    )
}