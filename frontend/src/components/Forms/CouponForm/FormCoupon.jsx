import { useState } from 'react';
import styles from './FormCoupon.module.css';
import stylesApp from '../../App/App.module.css';

export const FormCoupon = () => {
    const [showErrCoupon, setShowErrCoupon] = useState(false);

    const submitFormCoupon = (e) => {
        e.preventDefault();
        setShowErrCoupon(true);
    };
    return (
        <div className={styles.coupon}>
            <form onSubmit={(e) => submitFormCoupon(e)}>
                <div className={styles.couponCode}>
                    <input type="text" placeholder="Coupon Code" />
                    {showErrCoupon && <span>not found</span>}
                </div>

                <button
                    className={`${stylesApp.btn} ${stylesApp['btn--black']}`}
                >
                    apply coupon
                </button>
            </form>
        </div>
    );
};
