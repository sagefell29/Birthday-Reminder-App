import { useEffect, useState } from "react"

interface Props {
    successMessage: string
    errorMessage: string
    clearSuccess?: () => void
    clearError?: () => void
}

const MESSAGE_TIMEOUT = 4500
const FADE_DURATION = 1250

export default function FormMessage({
    successMessage,
    errorMessage,
    clearSuccess,
    clearError,
}: Props) {

    const [showSuccess, setShowSuccess] =
        useState(true)

    const [showError, setShowError] =
        useState(true)

    useEffect(() => {
        if (successMessage) {
            setShowSuccess(true)
        }
    }, [successMessage])

    useEffect(() => {
        if (errorMessage) {
            setShowError(true)
        }
    }, [errorMessage])

    useEffect(() => {

        if (!successMessage) {
            return
        }

        const fadeTimer =
            setTimeout(() => {
                setShowSuccess(false)
            }, MESSAGE_TIMEOUT - FADE_DURATION)

        const clearTimer =
            setTimeout(() => {
                clearSuccess?.()
            }, MESSAGE_TIMEOUT)

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(clearTimer)
        }

    }, [successMessage, clearSuccess])

    useEffect(() => {

        if (!errorMessage) {
            return
        }

        const fadeTimer =
            setTimeout(() => {
                setShowError(false)
            }, MESSAGE_TIMEOUT - FADE_DURATION)

        const clearTimer =
            setTimeout(() => {
                clearError?.()
            }, MESSAGE_TIMEOUT)

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(clearTimer)
        }

    }, [errorMessage, clearError])

    return (
        <>
            {successMessage && (
                <div
                    className={`
                        rounded-md
                        border
                        border-green-500/30
                        bg-green-500/10
                        p-3
                        text-sm
                        text-green-400
                        transition-opacity
                        duration-1000
                        ${showSuccess
                            ? "opacity-100"
                            : "opacity-0"}
                    `}
                >
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div
                    className={`
                        rounded-md
                        border
                        border-red-500/30
                        bg-red-500/10
                        p-3
                        text-sm
                        text-red-400
                        transition-opacity
                        duration-1000
                        ${showError
                            ? "opacity-100"
                            : "opacity-0"}
                    `}
                >
                    {errorMessage}
                </div>
            )}
        </>
    )
}