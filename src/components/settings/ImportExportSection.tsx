import LoadingButton from "@/components/ui/LoadingButton"
import FormMessage from "@/components/ui/FormMessage"

import { useImportExport } from "@/hooks/useImportExport"

interface Props {
    reloadBirthdays: () => Promise<void>
}

export default function ImportExportSection({
    reloadBirthdays,
}: Props) {

    const {
        handleImport,
        handleExport,
        importOperation,
        exportOperation,
    } = useImportExport(
        reloadBirthdays
    )

    return (
        <div className="space-y-4">

            <div className="flex gap-3">

                <LoadingButton
                    loading={
                        exportOperation.loading
                    }
                    onClick={handleExport}
                    className="
                    bg-green-600
                    text-white
                    hover:bg-green-700"
                >
                    Export Birthdays
                </LoadingButton>

                <LoadingButton
                    loading={
                        importOperation.loading
                    }
                    onClick={handleImport}
                    className="
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Import Birthdays
                </LoadingButton>

            </div>

            <FormMessage
                successMessage={
                    exportOperation.successMessage
                }
                errorMessage={
                    exportOperation.errorMessage
                }
            />

            <FormMessage
                successMessage={
                    importOperation.successMessage
                }
                errorMessage={
                    importOperation.errorMessage
                }
            />

        </div>
    )
}