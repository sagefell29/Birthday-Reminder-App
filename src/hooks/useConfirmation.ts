import { useState } from "react"

export function useConfirmation() {

    const [isOpen, setIsOpen] =
        useState(false)

    const [selectedId, setSelectedId] =
        useState<number | null>(null)

    function open(id: number) {
        setSelectedId(id)
        setIsOpen(true)
    }

    function close() {
        setSelectedId(null)
        setIsOpen(false)
    }

    return {
        isOpen,
        selectedId,
        open,
        close,
    }
}