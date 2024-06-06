import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashBoardLayout";
import BookPage from "./pages/BookPage";
import AuthLayout from "./layout/AuthLayout";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";


export const router=createBrowserRouter([
    {
        path:'',
        element:<Navigate to='/dashboard'/>
    },
    {
        path:'/dashboard',
        element:<DashboardLayout/>,
        children:[
            {
                path:'/dashboard/home',
                element:<HomePage/>
            },
            {
                path:'books',
                element:<BookPage/>
            },
            {
                path:'books/create',
                element:<CreateBook/>
            },
            {
                path:'books/update/:id',
                element:<EditBook/>
            }

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