import AddAnniversaryForm
    from "@/components/AddAnniversaryForm"
import AnniversaryCard
    from "@/components/AnniversaryCard"
import { useAnniversaries }
    from "@/hooks/useAnniversaries"

import AnniversaryFilters
    from "@/components/AnniversaryFilters"
import ConfirmDialog from "@/components/ui/ConfirmModal"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"
import { useConfirmation } from "@/hooks/useConfirmation"

export default function Anniversaries() {

    const {
        // anniversaries,
        loadAnniversaries,
        deleteAnniversaryById,
        search,
        setSearch,
        month,
        setMonth,
        filteredAnniversaries,
        editingAnniversary,
        clearEditing,
        // handleEdit,
        setEditingAnniversary,
        clearFilters,
    } = useAnniversaries()

    const confirmation =
        useConfirmation()

    const deleteOperation =
        useAsyncOperation()

    return (
        <div className="space-y-6">

            <section
                className="
                rounded-xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    "
                >
                    Anniversary Management
                </h1>

                <p
                    className="
                    mt-2
                    text-neutral-400
                    "
                >
                    Add, edit, import, export,
                    and manage all saved anniversaries.
                </p>

            </section>

            <AddAnniversaryForm
                onAnniversaryAdded={
                    loadAnniversaries
                }
                editingAnniversary={
                    editingAnniversary
                }
                clearEditing={
                    clearEditing
                }
            />

            <AnniversaryFilters
                search={search}
                setSearch={setSearch}
                month={month}
                setMonth={setMonth}
                clearFilters={clearFilters}
            />

            <div className="grid gap-4">

                {filteredAnniversaries.length === 0 ? (

                    <div className="rounded-lg border border-neutral-800 p-6 text-center text-neutral-400">

                        No anniversaries match the current filters.

                    </div>

                ) : (

                    <div className="grid gap-4">

                        {filteredAnniversaries.map((anniversary) => (
                            <AnniversaryCard
                                key={anniversary.id}
                                anniversary={anniversary}
                                onDelete={async (id) => confirmation.open(id)}
                                onEdit={setEditingAnniversary}
                            />
                        ))}

                    </div>

                )}

            </div>

            <ConfirmDialog
                open={confirmation.isOpen}
                title="Delete Anniversary"
                message="Are you sure you want to permanently delete this anniversary?"
                loading={deleteOperation.loading}
                onCancel={confirmation.close}
                onConfirm={async () => {

                    if (confirmation.selectedId == null) {
                        return
                    }

                    await deleteOperation.execute(() =>
                        deleteAnniversaryById(
                            confirmation.selectedId!
                        )
                    )

                    confirmation.close()
                }}
            />

        </div>
    )
}