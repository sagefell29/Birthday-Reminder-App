import { getDB } from "./db"

export async function initializeDatabase() {
  const db = await getDB()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS birthdays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS anniversaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        notes TEXT
    )
`)
}