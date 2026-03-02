import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Layout";
import HomeView from "./views/HomeView";
import MyPlantsView from "./views/MyPlantsView";
import AboutView from "./views/AboutView";
import UpdatePlantView from "./views/UpdatePlantView";
import { useState } from "react";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "my-plants", element: <MyPlantsView /> },
      { path: "about", element: <AboutView /> },
      { path: "update-plant/:id", element: <UpdatePlantView /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
