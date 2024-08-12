import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "@/pages/home";
import Settings from "@/pages/settings";
import DashboardPage from "@/pages/dashboard";

function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "/home", element: <Home /> },
            { path: "/", element: <Home /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "settings", element: <Settings /> },
          ],
        },
      ])}
    />
  );
}
export default Routes;
