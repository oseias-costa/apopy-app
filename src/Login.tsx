import { useEffect, useState } from "react"
import { useQuery, useMutation, gql } from '@apollo/client'

function Login(){
    const [ login, setLogin ] = useState({ email: "", password: "" })
    
    const GET_DEVOLUTIONS = gql`
        query GetDevolutions {
            devolutions {
                _id
                category
                product
                quantity
                stockId
                suplier
            }
        }
    `

    const LOGIN = gql`
        mutation LoginUser($loginInput: LoginInput){
            loginUser(loginInput: $loginInput) {
                name
                email
                token
            }
        }
    `
    const [ loginHandler, { data, loading, error }] = useMutation(LOGIN)
    // const { loading, error, data } = useQuery(GET_DEVOLUTIONS)
    console.log(loading, error, data)


    if(data){
        localStorage.setItem("apopyToken", JSON.stringify(data.loginUser.token))
        console.log(`
            Salvo no local storage
            ${localStorage.getItem("apopyToken")}
        `)
    }

    return(
        <div>
            <h1>Login</h1>
            <form>
                <input type='text' value={login.email} onChange={e => setLogin({...login, email: e.target.value})} />
                <input type='text' value={login.password} onChange={e => setLogin({...login, password: e.target.value})} />
                <button type='submit' onClick={(event) => {
                event.preventDefault()
                loginHandler(
                    { 
                    variables: { loginInput: { email: login.email, password: login.password }}
                }
                )
                // setLogin({ email: "", password: "" })
            }}>Login</button>
            </form>
        </div>
    )
}

export default Login