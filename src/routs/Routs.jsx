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
import Mytask from "../Privet/Dashbord/Buyer/Mytask";
import Taskupdate from "../Privet/Dashbord/Buyer/Taskupdate";
import Purchase from "../Privet/Dashbord/Buyer/Purchase";
import Taskdetails from "../Privet/Dashbord/Worker/Taskdetails";
import BuyerHome from "../Privet/Dashbord/Buyer/BuyerHome";
import WorkerHome from "../Privet/Dashbord/Worker/WorkerHome";

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
            path: "buyerhome",
            element: <BuyerHome></BuyerHome>,
          },{
            path:'workerhome',
            element:<WorkerHome></WorkerHome>
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
            path: "mytask",
            element: <Mytask></Mytask>,
          },
          {
            path: "taskupdate/:id",
            element: <Taskupdate></Taskupdate>,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/task/${params.id}`),
          },
          {
            path: "taskdetails/:id",
            element: <Taskdetails></Taskdetails>,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/task/${params.id}`),
          },
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
