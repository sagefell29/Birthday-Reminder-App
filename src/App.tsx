import { useEffect } from "react"
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from "@/components/Navbar"

import Dashboard from "@/pages/Dashboard"
import Birthdays from "@/pages/Birthdays"

import { initializeDatabase } from "@/database/setup"

function App() {

  useEffect(() => {
    async function setup() {
      await initializeDatabase()
    }

    setup()
  }, [])

  return (
    <HashRouter>

      <div className="min-h-screen bg-neutral-950 text-white">

        <header className="border-b border-neutral-800 p-4">
          <h1 className="text-3xl font-bold">
            Birthday Reminder
          </h1>
        </header>

        <Navbar />

        <main className="mx-auto max-w-6xl p-6">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/birthdays"
              element={<Birthdays />}
            />

          </Routes>

        </main>

      </div>

    </HashRouter>
  )
}

export default App