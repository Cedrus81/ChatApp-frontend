import { useEffect } from "react";
import { createBrowserRouter,  RouterProvider, Outlet, useNavigate} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./hooks";
import { initialTheme } from "./store/slices/styleSlice";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Header from "./cmps/Header";
import ProfileEdit from "./views/ProfileEdit";

function Layout(){
  const user = useAppSelector(state => state.user.loggedInUser)
  return (
    <>
      <Header user={ user } />
      <Outlet context={{ user }} />
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
        path: "/my-profile",
        element: <Profile />,
      },
      {
        path: "/profile-edit",
        element: <ProfileEdit />
      }
    ]
  }
]);


function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialTheme())
  }, [])
  console.log('app.tsx re-rendered')
  return (
    <RouterProvider router={router}/>
  )
}

export default App
