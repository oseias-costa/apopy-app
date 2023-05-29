import { useState } from "react"
import { InputWithLabel } from '../components/global/InputWithLabel'

export const Register = () => {
    const [ registerData, setRegisterData ] = useState<Object>(
        { name: "", email: "",  password: "", phone: "" })

    return(
        <div>
            <h1>Register</h1>
            <InputWithLabel 
                state={registerData}  
                setState={setRegisterData} 
                key='name' 
                placeholder="Seu nome"  
                label="Nome Completo" 
            />
            <InputWithLabel 
                state={registerData} 
                setState={setRegisterData} 
                key='email' placeholder="Seu email" 
                label="Email" 
            />
            <InputWithLabel 
                state={registerData} 
                setState={setRegisterData} 
                key='phone' placeholder="Seu telefone" 
                label="Telefone" 
            />
            <InputWithLabel 
                state={registerData} 
                setState={setRegisterData} 
                key='password' placeholder="Crie uma semja" 
                label="Senha" 
            />
            <button type="submit">Cadastrar</button>
        </div>
    )
}
