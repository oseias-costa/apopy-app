import { Link, Outlet } from 'react-router-dom'


export const Root: () => JSX.Element = () => {
    return(
      <>
      <div>
         <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/registrar'>Registrar</Link>
      </div>
        <div>
          <Outlet />
        </div>
        </>
    )
  }