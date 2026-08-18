import { Link } from "react-router-dom";

function LoginForm() {

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-sepia-50">
                <div className="w-full max-w-sm rounded-xl border border-sepia-200 bg-sepia-100 p-8 shadow-md shadow-sepia-300/40">
                    <h1 className="mb-2 text-center font-serif text-2xl font-bold text-sepia-900">Renote</h1>
                    <h2 className="mb-6 text-center font-serif text-lg text-sepia-900">Se connecter</h2>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="login" className="text-sm font-medium text-sepia-700">
                                E-mail
                            </label>
                            <input
                                id="login"
                                type="text"
                                name="Login"
                                className="rounded-md border border-sepia-300 bg-sepia-50 px-3 py-2 text-sepia-900 focus:border-sepia-600 focus:outline-none focus:ring-2 focus:ring-sepia-300"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium text-sepia-700">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="Password"
                                className="rounded-md border border-sepia-300 bg-sepia-50 px-3 py-2 text-sepia-900 focus:border-sepia-600 focus:outline-none focus:ring-2 focus:ring-sepia-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-2 rounded-md bg-sepia-800 px-4 py-2 font-medium text-sepia-50 transition-colors hover:bg-sepia-700"
                        >
                            Se connecter
                        </button>
                        <Link to={"/register"} className={"text-sm text-center font-medium text-sepia-500 underline"}>Créer un compte</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm