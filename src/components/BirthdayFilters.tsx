import LoadingButton from "./ui/LoadingButton"

interface Props {
  search: string
  setSearch: (value: string) => void

  month: string
  setMonth: (value: string) => void

  minAge: string
  setMinAge: (value: string) => void

  maxAge: string
  setMaxAge: (value: string) => void

  clearFilters: () => void
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

export default function BirthdayFilters({
  search,
  setSearch,
  month,
  setMonth,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  clearFilters,
}: Props) {

  const hasActiveFilters =
    search !== "" ||
    month !== "All" ||
    minAge !== "" ||
    maxAge !== ""

  return (
    <div className="rounded-lg border border-neutral-800 p-4">
      <div className="grid gap-4 md:grid-cols-2">

        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded-md bg-neutral-900 p-2"
        />

        <select
          value={month}
          onChange={(e) =>
            setMonth(e.target.value)
          }
          className="rounded-md bg-neutral-900 p-2"
        >
          {months.map((monthName) => (
            <option
              key={monthName}
              value={monthName}
            >
              {monthName}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Age"
          value={minAge}
          onChange={(e) =>
            setMinAge(e.target.value)
          }
          className="rounded-md bg-neutral-900 p-2"
        />

        <input
          type="number"
          placeholder="Max Age"
          value={maxAge}
          onChange={(e) =>
            setMaxAge(e.target.value)
          }
          className="rounded-md bg-neutral-900 p-2"
        />

        {hasActiveFilters && <div>
        <LoadingButton
                type="button"
                loading={false}
                isValid={true}
                onClick={clearFilters}
                className="
                bg-neutral-700
                text-white
                hover:bg-neutral-600
                align-center
                "
            >
                Clear Filters
            </LoadingButton>
            </div>
            }

      </div>
    </div>
  )
}