import LoadingButton from "@/components/ui/LoadingButton"
import FormMessage from "@/components/ui/FormMessage"

import { useImportExport } from "@/hooks/useImportExport"

interface Props {
    reloadData: () => Promise<void>
}

export default function ImportExportSection({
    reloadData,
}: Props) {

    const {
        handleImport,
        handleExport,
        importOperation,
        exportOperation,
    } = useImportExport(
        reloadData
    )

    return (
        <div className="space-y-4">

            <div className="flex gap-3">

                <LoadingButton
                    loading={exportOperation.loading}
                    onClick={handleExport}
                    isValid={true}
                    className="
                    bg-green-600
                    text-white
                    hover:bg-green-700"
                >
                    Export Events
                </LoadingButton>

                <LoadingButton
                    loading={importOperation.loading}
                    onClick={handleImport}
                    isValid={true}
                    className="
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Import Events
                </LoadingButton>

            </div>

            <FormMessage
                successMessage={
                    exportOperation.successMessage
                }
                errorMessage={
                    exportOperation.errorMessage
                }
                clearSuccess={() => exportOperation.setSuccessMessage("")}
                clearError={() => exportOperation.setErrorMessage("")}
            />

            <FormMessage
                successMessage={
                    importOperation.successMessage
                }
                errorMessage={
                    importOperation.errorMessage
                }
                clearSuccess={() => importOperation.setSuccessMessage("")}
                clearError={() => importOperation.setErrorMessage("")}
            />

        </div>
    )
}