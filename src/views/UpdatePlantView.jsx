import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomeView from "./views/HomeView";
import MyPlantsView from "./views/MyPlantsView";
import AboutView from "./views/AboutView";
import UpdatePlantView from "./views/UpdatePlantView"; // IMPORT THIS
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "myplants", element: <MyPlantsView /> },
      { path: "about", element: <AboutView /> },
      { path: "update/:id", element: <UpdatePlantView /> } // ADD THIS ROUTE
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;