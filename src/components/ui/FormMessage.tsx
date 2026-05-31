interface Props {
    successMessage?: string
    errorMessage?: string
}

export default function FormMessage({
    successMessage,
    errorMessage,
}: Props) {

    if (!successMessage &&
        !errorMessage) {
        return null
    }

    return (
        <>
            {successMessage && (
                <div
                    className="
            rounded-md
            border
            border-green-500/30
            bg-green-500/10
            p-3
            text-sm
            text-green-400
          "
                >
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div
                    className="
            rounded-md
            border
            border-red-500/30
            bg-red-500/10
            p-3
            text-sm
            text-red-400
          "
                >
                    {errorMessage}
                </div>
            )}
        </>
    )
}