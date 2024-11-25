import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
export default function App(){
  const router = createBrowserRouter(routes);
  return(
    <>
      <RouterProvider router = {router} />
    </>
  )
}