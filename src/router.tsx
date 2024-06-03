import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashBoardLayout";
import BookPage from "./pages/BookPage";
import AuthLayout from "./layout/AuthLayout";


export const router=createBrowserRouter([
    {
        path:'/dashboard',
        element:<DashboardLayout/>,
        children:[
            {
                path:'/dashboard',
                element:<HomePage/>
            },
            {
                path:'books',
                element:<BookPage/>
            },

        ]
    },
    {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
            {
                path:'login',
                element:<LoginPage/>
            },
            {
                path:'register',
                element:<RegisterPage/>
            },
        ]
    },
   
])