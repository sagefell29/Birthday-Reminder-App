import { useEffect } from "react"

import { initializeDatabase } from "@/database/setup"
import { useNotificationTimer } from "@/hooks/useNotificationTimer"

export function useAppInitializer() {

    useNotificationTimer()

    useEffect(() => {

        async function initialize() {

            await initializeDatabase()

        }

        initialize()

    }, [])
}