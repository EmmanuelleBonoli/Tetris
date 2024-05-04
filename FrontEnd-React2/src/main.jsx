import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./Styles/index.scss";
import App from './App.jsx'
import { Home } from './pages/Home.jsx';
import { GamePage } from './pages/GamePage.jsx';
import { ProtectedRoute } from './assets/ProtectedRoute.jsx';
 import {MyContext} from "./assets/Injection.js";
 import { ServiceContext } from './assets/ServiceContext.js';

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

 const context = new MyContext();

ReactDOM.createRoot(document.getElementById('root')).render(
   <ServiceContext.Provider value={context}>
    <RouterProvider router={router} />
   </ServiceContext.Provider>
)
