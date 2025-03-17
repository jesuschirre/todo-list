import { createBrowserRouter } from "react-router-dom";
import Login from './views/login';
import App from "./App";


export const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/main",
            element: <App />,
        }
    
    ])

