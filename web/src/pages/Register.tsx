import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../services/api';
import { useHistory } from "react-router-dom";
import logoImg from '../images/logo-2.svg';

import '../styles/pages/register.css';


export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO: Prevent register to be called multiple times
    async function handleSubmit(e: FormEvent){
        e.preventDefault();
    
        const response = await api.post('users-create', {
            name, email, password
        });
    
        
        if (response.status === 200){
            alert('Cadastro realizado com Sucesso');
    
            history.push('/login');
        }else{
            alert("Erro ao cadastrar")
        }
        
      }
        

    return (
        <div id='register'>
            <div className='content-wrapper'>
                <img src={logoImg} alt='Happy' />

                <div className='location'>
                    <strong>Jequié</strong>
                    <span>Bahia</span>
                </div>
            </div>

            <main>
                <Link to='/restrictArea' className='back'>
                    <FiArrowLeft size={20} color='#15C3D6' />
                </Link>

                <form className='register-form' onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastrar-se</legend>

                        <div className='input-block'>
                            <label htmlFor='email'>Name</label>
                            <input id='name' name='name' autoComplete='name' maxLength={255} value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='email'>E-mail</label>
                            <input type='email' id='email' name='email' autoComplete='email' maxLength={255} value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Senha</label>
                            <input id='password' name='password' type='password' autoComplete='new-password' maxLength={255} value={password} onChange={e => setPassword(e.target.value)} required />
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