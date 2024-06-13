import { useNavigate } from 'react-router-dom';
import styles from './CartTotals.module.css';
import stylesApp from '../App/App.module.css';

import { shippingPrice } from '../../constants';

export const CartTotals = ({ sum }) => {
    const navigate = useNavigate();

    const checkRegistered = () => {
        if (localStorage.getItem('isAuthorized')) {
            navigate(`/order/checkout`);
        } else {
            alert('To place an order you need to log into your account');
        }
    };

    return (
        <div className={styles.cart_totals}>
            <h4>Cart totals</h4>
            <div className={styles.sum}>
                <div className={styles.info_order}>
                    <div>
                        <div>subtotal</div>
                        <span>${sum}</span>
                    </div>
                    <div>
                        <div>shipping</div>
                        <span>${shippingPrice}</span>
                    </div>
                </div>
            </div>
            <div className={styles.total_sum}>
                <div>total</div>
                <span>${sum + shippingPrice}</span>
            </div>
            <button
                className={`${stylesApp.btn} ${stylesApp['btn--black']}`}
                onClick={() => checkRegistered()}
            >
                go to checkout
            </button>
        </div>
    );
};
