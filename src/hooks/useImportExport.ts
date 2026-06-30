import {
    exportEvents,
    importEvents,
} from "@/services/importExportService"

import { useAsyncOperation }
    from "@/hooks/useAsyncOperation"

export function useImportExport(
    reloadData: () => Promise<void>
) {

    const exportOperation =
        useAsyncOperation()

    const importOperation =
        useAsyncOperation()

    async function handleExport() {

        const result =
            await exportOperation.execute(
                exportEvents
            )

        if (!result?.success) {
            return
        }

        exportOperation.setSuccessMessage(
            result.message
        )
    }

    async function handleImport() {

        const result =
            await importOperation.execute(
                importEvents
            )

        if (!result?.success) {
            return
        }

        importOperation.setSuccessMessage(
            result.message
        )

        await reloadData()
    }

    return {

        handleImport,
        handleExport,

        exportOperation,
        importOperation,
    }
}