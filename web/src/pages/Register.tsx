import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../services/api';
import { useHistory } from "react-router-dom";
import { IUser } from './OrphanagesMap';
import logoImg from '../images/logo-2.svg';

import '../styles/pages/register.css';

interface IData {
    [key: string]: any;
}

export default function Register() {

    const [getUser, setUser] = useState<IUser>();
    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] =useState('');

    //const [disabled, setDisabled] = useState<boolean>(true)

    const history = useHistory();

    /* useEffect(() => {
        setDisabled(!getEmail || !getPassword)
    }, [getEmail, getPassword]) */

    // TODO: Prevent register to be called multiple times
    async function handleSubmitRegister(event: FormEvent) {
        
        event.preventDefault();
    
        const data1: IData = {
            name: getName,
            email: getEmail,
            password: getPassword,
        }       
    
        try {
    
            await api.post('/users-create', data1);
    
            alert('Usuario cadastrado com sucesso!');
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar Usuário');
        }
    }

    async function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();
    
        const data2: IData = {
            email: getEmail,
            password: getPassword,
        }
    
        try {
            const response = await api.post('/users', data2)
    
            alert('Usuario logado com sucesso!');
            setUser({id:response.data.id,
                name:response.data.name,
                email:response.data.email,
                password:response.data.password,
            })
            history.push({
                pathname: '/orphanages',
                state: { id:response.data.id,
                    name:response.data.name,
                    email:response.data.email,
                    password:response.data.password,
                }
            });
        } catch (error) {
            console.log(error);
            alert('Erro ao logar Usuário');
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

                <form className='register-form'>
                    <fieldset>
                        <legend>Cadastrar-se</legend>

                        <div className='input-block'>
                            <label htmlFor='email'>Name</label>
                            <input id='name' name='name' autoComplete='name' maxLength={255} value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' name='email' autoComplete='email' maxLength={255} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Senha</label>
                            <input id='password' name='password' type='password' autoComplete='new-password' maxLength={255} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </fieldset>

                    <button disabled={disabled} className='confirm-button' type='submit'>
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}