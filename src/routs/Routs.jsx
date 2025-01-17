import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";

export const Routs = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>
  },
]);
