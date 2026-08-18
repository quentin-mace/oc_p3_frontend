import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm.tsx";
import RegisterForm from "../features/auth/components/RegisterForm.tsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginForm/>
    },
    {
        path: '/register',
        element: <RegisterForm/>
    }
])

function Router() {
    return <RouterProvider router={router}/>
}

export default Router