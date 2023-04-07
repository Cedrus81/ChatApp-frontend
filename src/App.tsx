import { useEffect } from "react";
import {  createBrowserRouter,  RouterProvider, Outlet} from "react-router-dom"
import { useAppDispatch } from "./hooks";
import { initialTheme } from "./store/slices/styleSlice";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Header from "./cmps/Header";

function Layout(){
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
 
  {
    element: <Layout />,
    children: [
      {
        path: "/profile",
        element: <Profile />
      },
    ]
  }
]);


function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialTheme())
  }, [])
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
