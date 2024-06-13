import { useEffect, useState } from 'react';

import styles from './MyAcc.module.css';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

import { getUserAcc } from '../../utils';

export const MyAcc = () => {
    const [user, setUser] = useState();

    let location = useLocation();
    const path = location.pathname.split('/')[2];

    const navigate = useNavigate();

    useEffect(() => {
        getUserAcc()
            .then((res) => (res ? setUser(res) : ''))
            .catch((err) => {
                navigate(`/login`);
            });
    }, []);

    return !user ? (
        <Loader />
    ) : (
        <div className={styles.acc}>
            <h3>My account</h3>
            <div className={styles.nav}>
                <div className={path === 'my' ? styles.active : ''}>
                    <Link to="my">Account</Link>
                </div>
                <div className={path === 'orders' ? styles.active : ''}>
                    <Link to="orders">Orders</Link>
                </div>
                <div className={path === 'help' ? styles.active : ''}>
                    <Link to="help">Help</Link>
                </div>
            </div>

            <Outlet />
        </div>
    );
};
