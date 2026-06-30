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
import Settings from "./pages/Settings"
import Anniversaries from "./pages/Anniversaries"
import { useNotificationTimer } from "./hooks/useNotificationTimer"
import { useAppInitializer } from "./hooks/useAppInitializer"

function App() {

  useAppInitializer()

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

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/anniversaries"
              element={<Anniversaries />}
            />

          </Routes>

        </main>

      </div>

    </HashRouter>
  )
}

export default App