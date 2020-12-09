import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from "../services/api";
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../images/logo-2.svg';

import '../styles/pages/restrict-area.css';
import Popup from "../components/Popup";


export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function Login(e){
        e.preventDefault();
        const response = await api.post("/sessions", { 
           email, password
        })
        if (response.status === 200) {
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("name", response.data.name);

            window.location.href = "/app";
        }else{
            alert("Usuário não encontrado!");
        }

    }

    useEffect(()=>{
        const name = localStorage.getItem("name");
        if (name){
            window.location.href = "/app";
        }
    },[])

    return (
        <div id='login'>
            <div className='content-wrapper'>
                <img src={logoImg} alt='Happy' />

                <div className='location'>
                    <strong>Jequié</strong>
                    <span>Bahia</span>
                </div>
            </div>

            <main>
                <Link to='' className='back'>
                    <FiArrowLeft size={20} color='#15C3D6' />
                </Link>

                <form className='login-form' onSubmit={Login}>
                    <fieldset>
                        <legend>Fazer login</legend>

                        <div className='input-block'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' name='email' autoComplete='email' maxLength={255} value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Senha</label>
                            <input id='password' name='password' type='password' autoComplete='current-password' maxLength={255} value={password} onChange={e => setPassword(e.target.value)} required/>
                        </div>

                        <div className="input-group">
                            <Link to="/register" className="register">
                            Cadastre-se
                            </Link>

                            <Popup /> 
                            
                        </div>
                    </fieldset>
                    
                    <button className='confirm-button' type='submit'>
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}