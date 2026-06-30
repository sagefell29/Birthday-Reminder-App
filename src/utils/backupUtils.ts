import type { BackupFile } from "@/types/backup"

export function isBackupFile(
    value: unknown
): value is BackupFile {
    return (
        typeof value === "object" &&
        value !== null &&
        "birthdays" in value &&
        "anniversaries" in value
    )
}