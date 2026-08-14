import {useState} from "react";
import * as React from "react";

function App() {

  const [username, setUsername] = useState("bruce@wayne.com");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">Renote</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="login" className="text-sm font-medium text-slate-600">
              Identifiant
            </label>
            <input
              id="login"
              type="text"
              name="Login"
              value={username}
              onChange={handleUsernameChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-600">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="Password"
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-slate-800 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )

}
export default App
