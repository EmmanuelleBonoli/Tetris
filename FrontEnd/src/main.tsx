import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { GamePage } from "./pages/GamePage";
import { ProtectedRoute } from "./services/ProtectedRoute";
// import { MyContext } from "./services/Injection";
// import { ServiceContext } from "./services/ServiceContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/game",

        element: (
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// const context = new MyContext();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <ServiceContext.Provider value={context}>
    <RouterProvider router={router} />
  // {/* </ServiceContext.Provider> */}
);
