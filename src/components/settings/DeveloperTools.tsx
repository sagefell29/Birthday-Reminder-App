import LoadingButton from "@/components/ui/LoadingButton"
import FormMessage from "@/components/ui/FormMessage"

import { useAsyncOperation } from "@/hooks/useAsyncOperation"

export default function DeveloperTools() {

    const resetOperation =
        useAsyncOperation()

    async function handleReset() {

        const result =
            await resetOperation.execute(
                async () => {

                    await new Promise(
                        (resolve) =>
                            setTimeout(
                                resolve,
                                300
                            )
                    )

                    localStorage.removeItem(
                        "birthday_notification_date"
                    )

                    return true
                }
            )

        if (result) {

            resetOperation
                .setSuccessMessage(
                    "Notification state reset successfully."
                )
        }
    }

    return (
        <div className="space-y-4">

            <LoadingButton
                loading={
                    resetOperation.loading
                }
                onClick={handleReset}
                className="
                    bg-red-600
                    text-white
                "
            >
                Reset Notification State
            </LoadingButton>

            <FormMessage
                successMessage={
                    resetOperation.successMessage
                }
                errorMessage={
                    resetOperation.errorMessage
                }
                clearSuccess={() => resetOperation.setSuccessMessage("")}
                clearError={() => resetOperation.setErrorMessage("")}
            />

        </div>
    )
}