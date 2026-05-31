import { useState } from "react"


export function useAsyncOperation() {

    const [loading, setLoading] =
        useState(false)

    const [successMessage,
        setSuccessMessage] =
        useState("")

    const [errorMessage,
        setErrorMessage] =
        useState("")

    async function execute(
        operation: () => Promise<void>,
        successMessage?: string
    ) {

        setLoading(true)

        setErrorMessage("")
        setSuccessMessage("")

        try {

            await operation()

            if (successMessage) {
                setSuccessMessage(
                    successMessage
                )
            }

        } catch (error) {

            console.error(error)

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            )

        } finally {

            setLoading(false)

        }
    }

    return {

        loading,

        successMessage,
        errorMessage,

        setSuccessMessage,
        setErrorMessage,

        execute,
    }
}