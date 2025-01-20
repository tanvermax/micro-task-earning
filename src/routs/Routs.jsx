import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Register from "../Login/Register";
import Dashbord from "../Privet/Dashbord/Dashbord";
import Users from "../Privet/Dashbord/Users";
import Manageuser from "../Privet/Dpages/Manageuser";
import PrivetRoute from "./PrivetRoute";
import TaskList from "../Privet/Dashbord/Worker/TaskList";
import Addtask from "../Privet/Dashbord/Buyer/Addtask";
import Purchase from "../Privet/Dashbord/Worker/Purchase";
import Mytask from "../Privet/Dashbord/Buyer/Mytask";

export const Routs = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "dashbord",
        element: (
          <PrivetRoute>
            <Dashbord></Dashbord>
          </PrivetRoute>
        ),
        children: [
          {
            path: "users",
            element: <Users></Users>,
          },
          {
            path: "manageuser",
            element: <Manageuser></Manageuser>,
          },
          {
            path: "tasklist",
            element: <TaskList></TaskList>,
          },

          {
            path: "addtask",
            element: <Addtask></Addtask>,
          },
          {
            path: "mytask",
            element: <Mytask></Mytask>,
          },
          {
            path: "purchase",
            element: <Purchase></Purchase>,
          },
          {
            path:'mytask',
            element:<Mytask></Mytask>
          }
        ],
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
