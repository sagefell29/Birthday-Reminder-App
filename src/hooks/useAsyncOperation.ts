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

    async function execute<T>(
        operation: () => Promise<T>
    ): Promise<T | undefined> {

        setLoading(true)

        setErrorMessage("")
        setSuccessMessage("")

        try {

            const result =
                await operation()

            return result

        } catch (error) {

            console.error(error)

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            )

            return undefined

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