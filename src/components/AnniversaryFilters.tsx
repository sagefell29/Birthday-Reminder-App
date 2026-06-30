import LoadingButton from "./ui/LoadingButton"
import {MONTHS} from "../utils/dateUtils"

interface Props {
    search: string
    setSearch: (value: string) => void

    month: string
    setMonth: (value: string) => void

    clearFilters: () => void
}

export default function AnniversaryFilters({
    search,
    setSearch,
    month,
    setMonth,
    clearFilters,
}: Props) {

    const hasActiveFilters = search !== "" || month !== "All" 

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
                {MONTHS.map((month) => (

                    <option
                        key={month}
                        value={month}
                    >
                        {month}
                    </option>

                ))}
            </select>
            
            {hasActiveFilters &&
                <LoadingButton
                type="button"
                loading={false}
                isValid={true}
                onClick={clearFilters}
                className="
                    bg-neutral-700
                    text-white
                    hover:bg-neutral-600
                    "
            >
                Clear Filters
            
            </LoadingButton> 
            }

        </div>

    )
}