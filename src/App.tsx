import { useEffect } from "react";
import {  createBrowserRouter,  RouterProvider} from "react-router-dom"
import { useAppDispatch } from "./hooks";
import { initialTheme, setTheme } from "./store/slices/styleSlice";
import Login from "./views/Login";
import Signup from "./views/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
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
