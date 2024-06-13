import { useState } from 'react';

import styles from '../LogIn/Login.module.css';
import stylesApp from '../../../components/App/App.module.css';

export const RegForm = ({ onSubmit, imgDelete }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleClearFirstName = () => {
        setFirstname('');
    };
    const handleClearLastName = () => {
        setLastname('');
    };
    const handleClearLogin = () => {
        setLogin('');
    };
    const handleClearPassword = () => {
        setPassword('');
    };

    return (
        <form
            className={`${styles.form_account} ${styles.registration}`}
            onSubmit={onSubmit}
        >
            <div className={styles.firstname}>
                <input
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    name="firstname"
                    placeholder="firstname"
                    required
                />
                <img
                    src={imgDelete}
                    onClick={handleClearFirstName}
                    alt="delete"
                />
            </div>

            <div className={styles.lastname}>
                <input
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    name="lastname"
                    placeholder="lastname"
                    required
                />
                <img
                    src={imgDelete}
                    onClick={handleClearLastName}
                    alt="delete"
                />
            </div>

            <div className={styles.login}>
                <input
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    name="login"
                    placeholder="login"
                    required
                />
                <img src={imgDelete} onClick={handleClearLogin} alt="delete" />
                <span>field must contain at least 4 symbols</span>
            </div>

            <div className={styles.password}>
                <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                />
                <img
                    src={imgDelete}
                    onClick={handleClearPassword}
                    alt="delete"
                />
                <span>field must contain at least 6 digits</span>
            </div>

            <label className={styles.agreement}>
                <input type="checkbox" required />
                <span>I agree to the processing of personal data</span>
            </label>

            <button className={`${stylesApp.btn} ${stylesApp['btn--black']}`}>
                REGISTER
            </button>
        </form>
    );
};
