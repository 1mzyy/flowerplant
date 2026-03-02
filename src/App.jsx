import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomeView from "./views/HomeView";
import MyPlantsView from "./views/MyPlantsView";
import AboutView from "./views/AboutView";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "myplants", element: <MyPlantsView /> },
      { path: "about", element: <AboutView /> },
      { path: "update/:id", element: <MyPlantsView /> }
    ]
  }
], {
  basename: '/flowerplant'  // MUST match repo name
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;