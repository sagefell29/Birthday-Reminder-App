import { getDB } from "@/database/db"
import type { Birthday } from "@/types/birthday"

export async function addBirthday(data: Birthday) {
  const db = await getDB()

  await db.execute(
    `
    INSERT INTO birthdays (name, birthdate, notes)
    VALUES (?, ?, ?)
    `,
    [data.name, data.birthdate, data.notes || ""]
  )
}

export async function getBirthdays(): Promise<Birthday[]> {
  const db = await getDB()

  return await db.select(
    `
    SELECT *
    FROM birthdays
    ORDER BY birthdate ASC
    `
  )
}

export async function deleteBirthday(id: number) {
  const db = await getDB()

  await db.execute(
    `
    DELETE FROM birthdays
    WHERE id = ?
    `,
    [id]
  )
}

export async function updateBirthday(data: Birthday) {
  const db = await getDB()

  await db.execute(
    `
    UPDATE birthdays
    SET
      name = ?,
      birthdate = ?,
      notes = ?
    WHERE id = ?
    `,
    [
      data.name,
      data.birthdate,
      data.notes || "",
      data.id,
    ]
  )
}