import AddAnniversaryForm
    from "@/components/AddAnniversaryForm"
import AnniversaryCard
    from "@/components/AnniversaryCard"
import { useAnniversaries }
    from "@/hooks/useAnniversaries"

import AnniversaryFilters
    from "@/components/AnniversaryFilters"

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
        setEditingAnniversary
    } = useAnniversaries()

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
                                onDelete={deleteAnniversaryById}
                                onEdit={setEditingAnniversary}
                            />
                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}