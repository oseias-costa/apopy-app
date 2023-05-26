import Login from "./pages/global/Login";
import { Register } from "./pages/global/Register";
import { Root } from "./components/global/Root";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <h1>dashboard</h1>
    </>
  );
}

export default App;
