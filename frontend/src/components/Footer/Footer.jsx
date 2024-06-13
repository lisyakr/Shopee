import { FormEmail } from '../Forms/EmailForm/FormEmail';

import styles from './Footer.module.css';

import facebook from '../../assets/img/icons/facebook.svg';
import instagram from '../../assets/img/icons/inst.svg';
import twitter from '../../assets/img/icons/twitter.svg';

import { useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper}>
            <FormEmail />
            <footer>
                <div className={styles.aside}>
                    <div onClick={() => navigate(`/privacy`)}>
                        privacy policy
                    </div>
                    <div onClick={() => navigate(`/privacy`)}>
                        shipping and returns
                    </div>
                    <span>
                        © 2024 Shelly.{' '}
                        <i onClick={() => navigate(`/privacy`)}>
                            Privacy policy.
                        </i>
                    </span>
                </div>

                <div className={styles.socials}>
                    <span>Follow us</span>
                    <img src={facebook} alt="facebook" />
                    <img src={instagram} alt="instagram" />
                    <img src={twitter} alt="twitter" />
                </div>
            </footer>
        </div>
    );
};
