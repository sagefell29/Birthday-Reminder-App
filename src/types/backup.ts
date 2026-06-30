import type { Birthday } from "./birthday"
import type { Anniversary } from "./anniversary"

export interface BackupFile {
    version: number
    exportedAt: string
    birthdays: Birthday[]
    anniversaries: Anniversary[]
}