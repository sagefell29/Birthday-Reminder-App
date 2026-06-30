import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="border-b border-neutral-800 p-4">

            <div className="flex gap-4">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-white"
                            : "text-neutral-400 hover:text-white"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/birthdays"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-white"
                            : "text-neutral-400 hover:text-white"
                    }
                >
                    Birthdays
                </NavLink>


                <NavLink
                    to="/anniversaries"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-white"
                            : "text-neutral-400 hover:text-white"
                    }
                >
                    Anniversaries
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-white"
                            : "text-neutral-400 hover:text-white"
                    }
                >
                    Settings
                </NavLink>


            </div>

        </nav>
    )
}