import Login from "./pages/LoginPage/Login";
import { Register } from "./pages/RegisterPage/Register";
import { Root } from "./components/global/Root";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
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
      <Route path="/estoque/categoria" element={<CategoryPage />} />
      <Route path="/estoque/produtos" element={<ProductsPage />} />
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
