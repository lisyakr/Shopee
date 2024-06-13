import { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegForm } from '../RegForm/RegForm';

import styles from './Login.module.css';
import { baseUrl } from '../../../constants';

import deleteTextLogin from '../../../assets/img/icons/deleteTextLogin.svg';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [isRegistered, setIsRegistered] = useState(true);
    const navigate = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch(`${baseUrl}/login`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                data
                    ? localStorage.setItem('isAuthorized', 'true')
                    : alert('localstorage не записан');
                return data;
            })
            .then((data) => {
                if (data) {
                    navigate(`/account/my`);
                }
            })
            .catch((err) => {
                alert(`error: ${err}`);
            });
    };

    const validationValues = (log, pass) => {
        if (log.length < 4) {
            return false;
        }
        if (pass.length < 6) {
            return false;
        }
        return pass.split('').every((char) => char >= '0' && char <= '9');
    };

    const submitReg = (e) => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const result = validationValues(login, password);

        if (result) {
            e.preventDefault();
            const formData = new FormData(e.target);

            fetch(`${baseUrl}/register`, {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    data ? alert('аккаунт создан') : alert('повторите попытку');
                    return data;
                })
                .then((data) => {
                    if (data) setIsRegistered(true);
                })
                .catch((err) => {
                    alert(`error: ${err}`);
                });
        } else {
            alert('fields are filled in incorrectly');
        }
    };

    return (
        <>
            <div className={styles.my_account}>
                <h3>My account</h3>
                <div>
                    <button
                        className={isRegistered ? styles.active_btn : ''}
                        onClick={() => setIsRegistered(true)}
                    >
                        sign in
                    </button>
                    <button
                        className={isRegistered ? '' : styles.active_btn}
                        onClick={() => setIsRegistered(false)}
                    >
                        register
                    </button>
                </div>
                {isRegistered ? (
                    <LoginForm
                        onSubmit={submitLogin}
                        imgDelete={deleteTextLogin}
                    />
                ) : (
                    <RegForm onSubmit={submitReg} imgDelete={deleteTextLogin} />
                )}
            </div>
        </>
    );
};
