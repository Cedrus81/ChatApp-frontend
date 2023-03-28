import {  createBrowserRouter,  RouterProvider} from "react-router-dom"
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
  return (
    <RouterProvider router={router}/>
  )
}

export default App
