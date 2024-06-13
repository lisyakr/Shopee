import styles from './HelpBlock.module.css';

import assets from '../../assets/img/icons/accept.svg';
import arrow from '../../assets/img/icons/arrow-help.svg';
import shipping from '../../assets/img/icons/shipping.svg';
import privacy from '../../assets/img/icons/privacy-policy.svg';

import { useNavigate } from 'react-router-dom';

export const HelpBlock = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.help} onClick={() => navigate(`/privacy`)}>
                <div>
                    <img src={assets} alt="assets" />
                    <div>Terms of Services</div>
                </div>
                <img src={arrow} alt="arrow" />
            </div>
            <div className={styles.help} onClick={() => navigate(`/privacy`)}>
                <div>
                    <img src={shipping} alt="shipping" />
                    <div>Shipping</div>
                </div>
                <img src={arrow} alt="arrow" />
            </div>
            <div className={styles.help} onClick={() => navigate(`/privacy`)}>
                <div>
                    <img src={privacy} alt="privacy" />
                    <div>Privacy Policy</div>
                </div>

                <img src={arrow} alt="arrow" />
            </div>
        </>
    );
};
