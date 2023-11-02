import { createBrowserRouter } from "react-router-dom";
import Root from "../../layouts/Root";
import Home from "./pages/home/Home";
import axios from "axios";
import URL from "../../url/URL";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[
            {
                path:"/",
                element:<Home/>,
                loader: ()=> axios(`${URL}/products`)
                // loader:()=>fetch
            }
        ]
    }
])

export default router