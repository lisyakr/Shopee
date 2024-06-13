import styles from './OrderCheckoutForm.module.css';
import stylesApp from '../App/App.module.css';

export const OrderCheckoutForm = ({ onSubmit }) => {
    return (
        <div className={styles.details_order}>
            <h4>Details</h4>
            <form
                id="order"
                className={styles.order_details}
                onSubmit={(e) => onSubmit(e)}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Firstname"
                    required
                />
                <input
                    type="adress"
                    name="adress"
                    placeholder="Adress"
                    required
                />
                <input type="tel" name="phone" placeholder="Phone" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="text" name="notes" placeholder="Order notes *" />
                <div className={styles.pay}>
                    <div>
                        <input
                            type="radio"
                            className={styles['custom-radio']}
                            id="cash"
                            name="payment"
                            value="cash"
                            required
                            defaultChecked
                        />
                        <label htmlFor="cash">
                            Payment on delivery in cash
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            className={styles['custom-radio']}
                            id="card"
                            name="payment"
                            value="card"
                        />
                        <label htmlFor="card">
                            Payment on delivery by card
                        </label>
                    </div>
                </div>
                <button
                    className={`${stylesApp.btn} ${stylesApp['btn--black']}`}
                    type="submit"
                >
                    checkout
                </button>
            </form>
        </div>
    );
};
