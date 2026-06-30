import LoadingButton from "@/components/ui/LoadingButton"

interface Props {
    open: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    loading?: boolean

    onConfirm: () => void | Promise<void>
    onCancel: () => void
}

export default function ConfirmModal({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: Props) {

    if (!open) {
        return null
    }

    return (

        <div className="
            fixed inset-0
            z-50
            flex items-center justify-center
            bg-black/60
            backdrop-blur-sm
        ">

            <div className="
                w-full
                max-w-md
                rounded-xl
                border
                border-neutral-700
                bg-neutral-900
                p-6
                shadow-xl
            ">

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <p className="mt-3 text-neutral-400">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            rounded-md
                            border
                            border-neutral-700
                            px-4
                            py-2
                            hover:bg-neutral-800
                        "
                    >
                        {cancelText}
                    </button>

                    <LoadingButton
                        loading={loading}
                        className="
                            bg-red-600
                            text-white
                            hover:bg-red-700
                        "
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </LoadingButton>

                </div>

            </div>

        </div>
    )
}