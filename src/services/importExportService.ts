import { save, open } from "@tauri-apps/plugin-dialog"

import {
    readTextFile,
    writeTextFile,
} from "@tauri-apps/plugin-fs"

import {
    getBirthdays,
    addBirthday,
} from "@/services/birthdayService"

import type { Birthday } from "@/types/birthday"

export async function exportBirthdays() {
    try {
        const birthdays =
            await getBirthdays()

        const filePath =
            await save({
                defaultPath:
                    "birthdays-backup.json",
                filters: [
                    {
                        name: "JSON",
                        extensions: ["json"],
                    },
                ],
            })

        if (!filePath) {
            return {
                success: false,
                message: "Export cancelled",
            }
        }

        await writeTextFile(
            filePath,
            JSON.stringify(
                birthdays,
                null,
                2
            )
        )

        return {
            success: true,
            message:
                "Birthdays exported successfully",
        }

    } catch (error) {

        console.error(error)

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Export failed",
        }
    }
}

export async function importBirthdays() {
    try {

        const filePath =
            await open({
                multiple: false,
                filters: [
                    {
                        name: "JSON",
                        extensions: ["json"],
                    },
                ],
            })

        if (!filePath) {
            return {
                success: false,
                message:
                    "Import cancelled",
            }
        }

        const fileContent =
            await readTextFile(
                filePath as string
            )

        const importedBirthdays =
            JSON.parse(
                fileContent
            ) as Birthday[]

        const existingBirthdays =
            await getBirthdays()

        let importedCount = 0
        let skippedCount = 0

        for (const birthday of importedBirthdays) {

            const duplicate =
                existingBirthdays.some(
                    (existingBirthday) =>
                        existingBirthday.name
                            .trim()
                            .toLowerCase() ===
                        birthday.name
                            .trim()
                            .toLowerCase() &&
                        existingBirthday.birthdate ===
                        birthday.birthdate
                )

            if (duplicate) {
                skippedCount++
                continue
            }

            await addBirthday({
                name: birthday.name,
                birthdate:
                    birthday.birthdate,
                notes:
                    birthday.notes ?? "",
            })

            importedCount++

            existingBirthdays.push({
                ...birthday,
            })
        }

        return {
            success: true,
            message:
                `Imported ${importedCount} birthdays. Skipped ${skippedCount} duplicates.`,
        }

    } catch (error) {

        console.error(error)

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Import failed",
        }
    }
}