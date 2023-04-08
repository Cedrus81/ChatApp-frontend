import { useEffect } from "react";
import {  createBrowserRouter,  RouterProvider, Outlet, useNavigate} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./hooks";
import { initialTheme } from "./store/slices/styleSlice";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Header from "./cmps/Header";
import { User } from "./types";

function Layout(){
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user.loggedInUser)
  useEffect(() =>{
    if (!user) navigate('/login')
  },[user])
  return (
    <>
      <Header user={ user } />
      <Outlet context={{ user }} />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/login",
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
        path: "/",
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
