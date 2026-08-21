import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm.tsx";
import RegisterForm from "../features/auth/components/RegisterForm.tsx";
import RequireAuth from "../shared/components/RequireAuth.tsx";
import Layout from "../shared/components/Layout.tsx";
import DashboardPage from "../shared/components/DashboardPage.tsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginForm/>
    },
    {
        path: '/register',
        element: <RegisterForm/>
    },
    {
        element: <RequireAuth/>,
        children: [
            {
                element: <Layout/>,
                children: [
                    {
                        path: '/dashboard',
                        element: <DashboardPage/>
                    }
                ]
            }
        ]
    }
])

function Router() {
    return <RouterProvider router={router}/>
}

export default Router