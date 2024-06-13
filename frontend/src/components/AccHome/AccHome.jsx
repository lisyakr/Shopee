import { useCallback, useEffect, useState } from 'react';

import styles from './AccHome.module.css';

import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

import { getUserAcc } from '../../utils';
import { baseUrl } from '../../constants';

export const AccHome = () => {
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getUserAcc().then((res) => (res ? setUser(res) : ''));
    }, []);

    const logOutAccount = useCallback(() => {
        fetch(`${baseUrl}/logout`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) localStorage.removeItem('isAuthorized');
                return res;
            })
            .then((res) => navigate(`/login`));
    }, [navigate]);

    return user ? (
        <div className={styles.home_page}>
            <p>
                {' '}
                Hello {user.firstname} (not {user.firstname}?{' '}
                <span onClick={() => logOutAccount()}>Log out</span>)
            </p>
            <p>
                From your account dashboard you can view your{' '}
                <span>recent orders</span>, manage your{' '}
                <span>shipping and billing addresses</span>, and edit your{' '}
                <span>password and account details.</span>
            </p>
        </div>
    ) : (
        <Loader />
    );
};
