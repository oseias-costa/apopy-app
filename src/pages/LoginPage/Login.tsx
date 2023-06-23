import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from '../../queries/loginUser.mutation'

function Login() {
  const [ login, setLogin ] = useState({ email: "", password: "" });
  const [loginHandler, { data, loading, error }] = useMutation(LOGIN);

  if (data) {
    localStorage.setItem("apopyToken", JSON.stringify(data.loginUser.token));
    console.log(`
            Salvo no local storage
            ${localStorage.getItem("apopyToken")}
        `);
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <input
          type="text"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            loginHandler({
              variables: {
                loginInput: { email: login.email, password: login.password },
              },
            });
            // setLogin({ email: "", password: "" })
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
