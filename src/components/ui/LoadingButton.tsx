interface Props {
    loading?: boolean
    children: React.ReactNode
    onClick?: () => void
    type?: "button" | "submit"
    disabled?: boolean
}

export default function LoadingButton({
    loading = false,
    children,
    onClick,
    type = "button",
    disabled = false,
}: Props) {

    return (
        <div className="space-y-2">

            <button
                type={type}
                onClick={onClick}
                disabled={loading || disabled}
                className="
          w-full rounded-md
          bg-white px-4 py-2
          text-black
          transition-all duration-200

          hover:bg-neutral-300

          disabled:cursor-not-allowed
          disabled:opacity-60
        "
            >

                {loading
                    ? "Loading..."
                    : children}

            </button>

            {loading && (
                <div className="h-1 w-full overflow-hidden rounded bg-neutral-800">
                    <div className="h-full animate-pulse bg-white" />
                </div>
            )}

        </div>
    )
}