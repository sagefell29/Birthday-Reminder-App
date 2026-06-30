interface Props {
    search: string
    setSearch: (value: string) => void

    month: string
    setMonth: (value: string) => void
}

const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

export default function AnniversaryFilters({
    search,
    setSearch,
    month,
    setMonth,
}: Props) {

    return (

        <div className="rounded-lg border border-neutral-800 p-4 space-y-4">

            <h2 className="text-lg font-semibold">
                Filters
            </h2>

            <input
                type="text"
                placeholder="Search anniversaries..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                className="w-full rounded-md bg-neutral-900 p-2"
            />

            <select
                value={month}
                onChange={(e) =>
                    setMonth(
                        e.target.value
                    )
                }
                className="w-full rounded-md bg-neutral-900 p-2"
            >
                {months.map((month) => (

                    <option
                        key={month}
                        value={month}
                    >
                        {month}
                    </option>

                ))}
            </select>

        </div>

    )
}