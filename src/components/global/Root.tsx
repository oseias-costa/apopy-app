import { Link, Outlet } from "react-router-dom";

export const Root: () => JSX.Element = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/registrar">Registrar</Link>
        <Link to="/estoque/categoria">Produtos</Link>
        <Link to="/estoque/produtos">Lista Produtos</Link>
        <Outlet />
      </nav>
    </>
  );
};
