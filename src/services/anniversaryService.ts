import { getDB } from "@/database/db"
import type { Anniversary } from "@/types/anniversary"

export async function getAnniversaries() {
    const db = await getDB()

    return await db.select<Anniversary[]>(
        `
        SELECT *
        FROM anniversaries
        ORDER BY title
        `
    )
}

export async function addAnniversary(
    anniversary: Omit<Anniversary, "id">
) {
    const db = await getDB()

    await db.execute(
        `
        INSERT INTO anniversaries (
            title,
            date,
            notes
        )
        VALUES (?, ?, ?)
        `,
        [
            anniversary.title,
            anniversary.date,
            anniversary.notes ?? "",
        ]
    )
}

export async function updateAnniversary(
    anniversary: Anniversary
) {
    const db = await getDB()

    await db.execute(
        `
        UPDATE anniversaries
        SET
            title = ?,
            date = ?,
            notes = ?
        WHERE id = ?
        `,
        [
            anniversary.title,
            anniversary.date,
            anniversary.notes ?? "",
            anniversary.id,
        ]
    )
}

export async function deleteAnniversary(
    id: number
) {
    const db = await getDB()

    await db.execute(
        `
        DELETE FROM anniversaries
        WHERE id = ?
        `,
        [id]
    )
}