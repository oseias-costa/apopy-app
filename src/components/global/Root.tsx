import { Link, Outlet } from "react-router-dom";

export const Root: () => JSX.Element = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/registrar">Registrar</Link>
        <Link to="/estoque/produto">Produtos</Link>
        <Outlet />
      </nav>
    </>
  );
};
