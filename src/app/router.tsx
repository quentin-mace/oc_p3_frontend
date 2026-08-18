import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm.tsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginForm/>
    }
])

function Router() {
    return <RouterProvider router={router}/>
}

export default Router