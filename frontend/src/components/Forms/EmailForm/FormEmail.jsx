import { useState } from 'react';
import arrow from '../../../assets/img/icons/arrow.svg';

import styles from './FormEmail.module.css';

export const FormEmail = () => {
    const [showform, setShowForm] = useState(true);

    const handleFormEmail = (e) => {
        e.preventDefault();
        setShowForm(false);
    };
    return showform ? (
        <form onSubmit={(e) => handleFormEmail(e)}>
            <div className={styles.newsletter}>
                <input
                    type="email"
                    placeholder="Give an email, get the newsletter."
                />
                <button>
                    <img src={arrow} alt="отправить" />
                </button>
            </div>

            <div className={styles.agreement}>
                <input
                    type="checkbox"
                    className={styles['custom-checkbox']}
                    id="agree"
                    name="agree"
                />
                <label htmlFor="agree">i agree to the website’s terms</label>
            </div>
        </form>
    ) : (
        <div>Form submitted successfully...</div>
    );
};
