import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import AppLogo from "./AppLogo";

function initialsOf(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .map(part => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2);
}

function Sidebar() {
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);

    return (
        <div className="flex h-screen w-64 flex-col border-r border-sepia-200 bg-sepia-100">
            <AppLogo />
            <nav className="flex flex-col gap-1 px-2 py-4">
                <span className="px-2 text-xs font-medium uppercase text-sepia-500">Platform</span>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `rounded-md px-2 py-2 text-sm font-medium ${
                            isActive ? "bg-sepia-200 text-sepia-900" : "text-sepia-700 hover:bg-sepia-200/60"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
            </nav>
            <div className="mt-auto flex items-center gap-2 border-t border-sepia-200 px-3 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sepia-800 text-sm font-medium text-sepia-50">
                    {user ? initialsOf(user.name) : "?"}
                </div>
                <span className="flex-1 truncate text-sm font-medium text-sepia-900">{user?.name}</span>
                <button
                    onClick={logout}
                    className="text-xs font-medium text-sepia-500 underline hover:text-sepia-700"
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
}

export default Sidebar;