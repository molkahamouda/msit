import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";

import NotFound from "../components/NotFound";
import Layout from "../layout/layout";
import LandingPage from "../pages/landingpage/landingpage";
import Myforms from "../pages/forms/Myforms/myforms";
import CreateForm from "../pages/forms/createForm/createForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "forms",
    element: (
        <Myforms />
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
            <LandingPage />
        ),
      },
    
      {
        path: "add",
        element: (
            <CreateForm />
        ),
      },

    ],
  },
]);

export default router;
