import { useState } from 'react';

import styles from '../LogIn/Login.module.css';
import stylesApp from '../../../components/App/App.module.css';

export const LoginForm = ({ onSubmit, imgDelete }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleClearLogin = () => {
        setLogin('');
    };
    const handleClearPassword = () => {
        setPassword('');
    };

    return (
        <form
            className={`${styles.form_account} ${styles.authorization}`}
            onSubmit={onSubmit}
        >
            <div className={styles.login}>
                <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    name="login"
                    placeholder="Login"
                />
                <img src={imgDelete} onClick={handleClearLogin} alt="delete" />
            </div>

            <div className={styles.password}>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <img
                    src={imgDelete}
                    onClick={handleClearPassword}
                    alt="delete"
                />
            </div>

            <button className={`${stylesApp.btn} ${stylesApp['btn--black']}`}>
                SIGN IN
            </button>
        </form>
    );
};
