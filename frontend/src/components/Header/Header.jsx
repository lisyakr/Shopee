import styles from './Header.module.css';

import logo from '../../assets/img/icons/logo.svg';
import basket from '../../assets/img/icons/basket.svg';
import menu from '../../assets/img/icons/menu.svg';
import close from '../../assets/img/icons/close.svg';
import account from '../../assets/img/icons/account.svg';

import { Link, useNavigate } from 'react-router-dom';

export const Header = ({ handleClickMenu, menuVisible }) => {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div onClick={() => navigate(`/`)}>
                    <img src={logo} className={styles.logo} alt="Shoppe" />
                </div>
                <div className={styles.mobile_version}>
                    <div onClick={() => navigate(`/basket`)}>
                        <img src={basket} alt="basket" width={22} height={22} />
                    </div>
                    <div onClick={handleClickMenu}>
                        {!menuVisible ? (
                            <img src={menu} alt="menu" width={22} height={22} />
                        ) : (
                            <img
                                src={close}
                                alt="menu"
                                width={22}
                                height={22}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.desctop_version}>
                    <ul className={styles.navigation}>
                        <li>
                            <Link to="/shop">Shop</Link>
                        </li>
                        <li>
                            <Link to="/about">Our Story</Link>
                        </li>
                    </ul>
                    <span>|</span>
                    <div className={styles.icons}>
                        <div onClick={() => navigate(`/basket`)}>
                            <img
                                src={basket}
                                className={styles.iconBasket}
                                alt="basket"
                            />
                        </div>
                        <div onClick={() => navigate(`/account/my`)}>
                            <img src={account} alt="account" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
