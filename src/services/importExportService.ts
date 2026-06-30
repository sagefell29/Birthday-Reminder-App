import { save, open } from "@tauri-apps/plugin-dialog"

import {
    readTextFile,
    writeTextFile,
} from "@tauri-apps/plugin-fs"

import {
    getBirthdays,
    addBirthday,
} from "@/services/birthdayService"

import { getAnniversaries, addAnniversary } from "./anniversaryService"
import type { BackupFile } from "@/types/backup"
import { isBackupFile } from "@/utils/backupUtils"

export async function exportEvents() {
    try {
        const birthdays =
            await getBirthdays()

        const anniversaries =
            await getAnniversaries()

        const backup: BackupFile = {
            version: 1,
            exportedAt:
                new Date().toISOString(),
            birthdays,
            anniversaries,
        }

        const today =
            new Date()
                .toISOString()
                .split("T")[0]

        const filePath =
            await save({
                defaultPath:
                    `event-backup-${today}.json`,
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
                backup,
                null,
                2
            )
        )

        return {
            success: true,
            message:
                "Events exported successfully",
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

export async function importEvents() {
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

        const parsed: unknown =
            JSON.parse(fileContent)

        let backup: BackupFile

        if (Array.isArray(parsed)) {

            backup = {
                version: 0,
                exportedAt: "",
                birthdays: parsed,
                anniversaries: [],
            }

        } else if (isBackupFile(parsed)) {backup = parsed} 
        
        else {
            throw new Error("Invalid backup file.")
        }

        //Birthdays Section
        if (!Array.isArray(backup.birthdays)) {
            return {
                success: false,
                message: "Invalid backup file format",
            }
        }

        const birthdays = backup.birthdays ?? []

        const existingBirthdays =
            await getBirthdays()

        let importedBirthdaysCount = 0
        let skippedBirthdaysCount = 0

        for (const birthday of birthdays) {

            const duplicate =
                existingBirthdays.some(
                    (existingBirthday) =>
                        existingBirthday.title
                            .trim()
                            .toLowerCase() ===
                        birthday.title
                            .trim()
                            .toLowerCase() &&
                        existingBirthday.date ===
                        birthday.date
                )

            if (duplicate) {
                skippedBirthdaysCount++
                continue
            }

            await addBirthday({
                title: birthday.title,
                date:
                    birthday.date,
                notes:
                    birthday.notes ?? "",
            })

            importedBirthdaysCount++

            existingBirthdays.push({
                ...birthday,
            })
        }

        //Anniversaries Section
        if (!Array.isArray(backup.anniversaries)) {
            return {
                success: false,
                message: "Invalid backup file format",
            }
        }

        const anniversaries = backup.anniversaries ?? []

        const existingAnniversaries =
            await getAnniversaries()

        let importedAnniversariesCount = 0
        let skippedAnniversariesCount = 0

        for (const anniversary of anniversaries) {
            const duplicate =
                existingAnniversaries.some(
                    (existingAnniversary) =>
                        existingAnniversary.title
                            .trim()
                            .toLowerCase() ===
                        anniversary.title
                            .trim()
                            .toLowerCase() &&
                        existingAnniversary.date ===
                        anniversary.date
                )

            if (duplicate) {
                skippedAnniversariesCount++
                continue
            }

            await addAnniversary({
                title: anniversary.title,
                date:
                    anniversary.date,
                notes:
                    anniversary.notes ?? "",
            })

            importedAnniversariesCount++

            existingAnniversaries.push({
                ...anniversary,
            })
        }

        return {
            success: true,
            message:
                `Imported ${importedBirthdaysCount} birthdays. Skipped ${skippedBirthdaysCount} duplicates.\n` +
                `Imported ${importedAnniversariesCount} anniversaries. Skipped ${skippedAnniversariesCount} duplicates.`,
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