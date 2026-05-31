import {
    exportBirthdays,
    importBirthdays,
} from "@/services/importExportService"

import { useAsyncOperation }
    from "@/hooks/useAsyncOperation"

export function useImportExport(
    reloadBirthdays: () => Promise<void>
) {

    const exportOperation =
        useAsyncOperation()

    const importOperation =
        useAsyncOperation()

    async function handleExport() {

        const result =
            await exportOperation.execute(
                exportBirthdays
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
                importBirthdays
            )

        if (!result?.success) {
            return
        }

        importOperation.setSuccessMessage(
            result.message
        )

        await reloadBirthdays()
    }

    return {

        handleImport,
        handleExport,

        exportOperation,
        importOperation,
    }
}