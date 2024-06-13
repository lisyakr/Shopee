import styles from './Menu.module.css';

import { Link, useNavigate } from 'react-router-dom';
import account from '../../assets/img/icons/account.svg';

export const Menu = ({ menuVisible, setIsMenuVisible }) => {
    const navigate = useNavigate();

    const handleClickMenu = (e) => {
        let target = e.target;
        if (target.tagName !== 'A') return;
        setIsMenuVisible(false);
    };
    return (
        <div
            className={
                menuVisible ? `${styles.menu} ${styles.active}` : styles.menu
            }
        >
            <div
                className={styles.menu_lists}
                onClick={(e) => handleClickMenu(e)}
            >
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/shop">Shop</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
            </div>

            <div className={styles.footer} onClick={(e) => handleClickMenu(e)}>
                <div onClick={() => navigate(`/account/my`)}>
                    <img src={account} alt="account" />
                    <Link to="/account">My account</Link>
                </div>
            </div>
        </div>
    );
};
