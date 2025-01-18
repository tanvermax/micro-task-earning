import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Register from "../Login/Register";
import Dashbord from "../Privet/Dashbord/Dashbord";

export const Routs = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },{
        path: "dashbord",
        element: <Dashbord></Dashbord>
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
