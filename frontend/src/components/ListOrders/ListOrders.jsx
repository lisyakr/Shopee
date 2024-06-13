import { useEffect, useState } from 'react';
import styles from './ListOrders.module.css';
import { Loader } from '../Loader/Loader';

import { baseUrl } from '../../constants';

export const ListOrders = () => {
    const [orders, setOrders] = useState(false);

    const getDate = (date) => {
        const d = new Date(date.split('T')[0]);
        const monthName = d.toLocaleString('en-US', { month: 'long' });
        const year = d.getFullYear();
        const day = d.getDate();
        return `${monthName} ${day}, ${year}`;
    };

    useEffect(() => {
        fetch(`${baseUrl}/orders`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => (res ? setOrders(res) : ''))
            .catch((err) => {
                alert(`error: ${err}`);
            });
    }, []);

    return orders ? (
        <ul className={styles.orders_list}>
            {orders.length ? (
                orders.map((order) => (
                    <li key={order.id} className={styles.order__item}>
                        <div>
                            <div>number</div>
                            <div>{order.id}</div>
                        </div>
                        <div>
                            <div>date</div>
                            <div>{getDate(order.date)}</div>
                        </div>
                        <div>
                            <div>tel</div>
                            <div>{order.phone}</div>
                        </div>
                        <div>
                            <div>pay</div>
                            <div>{order.payment}</div>
                        </div>
                    </li>
                ))
            ) : (
                <div className={`${styles.nav_text} ${styles.no_order}`}>
                    <p>No order has been made yet.</p>
                    <span>BROWSE PRODUCT</span>
                </div>
            )}
        </ul>
    ) : (
        <Loader />
    );
};
