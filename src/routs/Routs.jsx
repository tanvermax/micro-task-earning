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
import Maysubmission from "../Privet/Dashbord/Worker/Maysubmission";
import WithdrawPage from "../Privet/Dashbord/Worker/WithdrawPage";
import ManageTask from "../Privet/Dashbord/ManageTask";
import AdminHome from "../Privet/Dashbord/AdminHome";
import AdminRouts from "../Axios/Hook/AdminRouts";
import Paymenhistory from "../Privet/Dashbord/Buyer/Paymenhistory";
import Aboutus from "../Home/Aboutus";
import Erro from "./Erro";

export const Routs = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement:<Erro></Erro>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        errorElement:<Erro></Erro>,
      },
      {
        path: "dashbord",
        element: (
          <PrivetRoute>
            <Dashbord></Dashbord>
          </PrivetRoute>

        ),
        errorElement:<Erro></Erro>,
        children: [
          {
            path: "users",
            element: <AdminRouts><Users></Users></AdminRouts>,
            errorElement:<Erro></Erro>,
          },{
            path:'adminhome',
            element:<AdminRouts><AdminHome></AdminHome></AdminRouts>,
            errorElement:<Erro></Erro>,
          },
          {
            path:'managetask',
            element:<ManageTask></ManageTask>,
            errorElement:<Erro></Erro>,
          },
          {
            path: "buyerhome",
            element: <BuyerHome></BuyerHome>,
            errorElement:<Erro></Erro>,
          },{
            path:'workerhome',
            element:<WorkerHome></WorkerHome>,
            errorElement:<Erro></Erro>,
          },
          {
            path: "manageuser",
            element: <Manageuser></Manageuser>,
            errorElement:<Erro></Erro>,
          },
          {
            path: "tasklist",
            element: <TaskList></TaskList>,
            errorElement:<Erro></Erro>,
          },

          {
            path: "addtask",
            element: <Addtask></Addtask>,
            errorElement:<Erro></Erro>,
          },
          {
            path: "mytask",
            element: <Mytask></Mytask>,
            errorElement:<Erro></Erro>,
          },{
            path:"paymnethistory",
            element:<Paymenhistory></Paymenhistory>,
            errorElement:<Erro></Erro>,
          },
          {
            path: "purchase",
            element: <Purchase></Purchase>,
            errorElement:<Erro></Erro>,
          },{
            path:'maysubmissioin',
            element:<Maysubmission></Maysubmission>,
            errorElement:<Erro></Erro>,
            loader: ()=> fetch('https://micro-tasking-server.vercel.app/submitCount')
          },
          {
            path: "mytask",
            element: <Mytask></Mytask>,
            errorElement:<Erro></Erro>,
          },{
            path:'withdraw',
            element:<WithdrawPage></WithdrawPage>,
            errorElement:<Erro></Erro>,
          },
          {
            path: "taskupdate/:id",
            element: <Taskupdate></Taskupdate>,
            errorElement:<Erro></Erro>,
            loader: ({ params }) =>
              fetch(`https://micro-tasking-server.vercel.app/task/${params.id}`),
          },
          {
            path: "taskdetails/:id",
            element: <Taskdetails></Taskdetails>,
            errorElement:<Erro></Erro>,
            loader: ({ params }) =>
              fetch(`https://micro-tasking-server.vercel.app/task/${params.id}`),
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
        errorElement:<Erro></Erro>,
      },
      {
        path: "register",
        element: <Register></Register>,
        errorElement:<Erro></Erro>,
      },
      {
        path:"aboutus",
        element:<Aboutus></Aboutus>,
        errorElement:<Erro></Erro>,
      }
    ],
  },
]);
