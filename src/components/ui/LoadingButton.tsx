interface Props {
    children: React.ReactNode
    loading: boolean
    type?: "button" | "submit" | "reset"
    onClick?: () => void
    className?: string
    isValid?: boolean
}

export default function LoadingButton({
    children,
    loading,
    isValid = true,
    type = "button",
    onClick,
    className = "",
}: Props) {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || !isValid}
            className={`
                rounded-md px-4 py-2
                transition-all duration-200
                disabled:cursor-not-allowed
                disabled:opacity-60
                hover:brightness-90
                ${className}
            `}
        >
            {loading ? "Loading..." : children}
        </button>
    )
}