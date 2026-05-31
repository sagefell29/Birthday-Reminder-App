import Database from "@tauri-apps/plugin-sql"

let dbInstance: Database | null = null

export async function getDB() {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:birthdays.db")
  }

  return dbInstance
}