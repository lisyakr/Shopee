import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

import styles from './App.module.css';
import { baseUrl } from '../../constants';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Shop } from '../../pages/Shop/Shop';
import { CardProduct } from '../../pages/CardProduct/CardProduct';
import { Login } from '../../pages/Login/LogIn/login';
import { Basket } from '../../pages/Basket/Basket';
import { About } from '../../pages/About/About';
import { Main } from '../../pages/Main/Main';
import { ItemModal } from '../ItemModal/ItemModal';
import { MyAcc } from '../../pages/MyAccount/MyAcc';
import { Order } from '../../pages/Order/Order';
import { Menu } from '../Menu/Menu';
import { PrivacyPolicy } from '../../pages/PrivacyPolicy/PrivacyPolicy';
import { ListOrders } from '../ListOrders/ListOrders';
import { HelpBlock } from '../HelpBlock/HelpBlock';
import { AccHome } from '../AccHome/AccHome';

export const App = () => {
    const [fullItem, setFullItem] = useState({});
    const [showFullItem, setShowFullItem] = useState(false);
    const [menuVisible, setIsMenuVisible] = useState(false);

    const navigate = useNavigate();

    const addToBasket = (item) => {
        if (localStorage.getItem('isAuthorized')) {
            fetch(`${baseUrl}/basket_create`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ itemId: item.id }),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            }).then((res) => res.json());
        } else {
            const localBasketState = localStorage.getItem('basketState');
            if (localBasketState) {
                let parsedLocalBasketState = JSON.parse(localBasketState);
                const itemIndex = parsedLocalBasketState.findIndex(
                    ({ prodId }) => prodId === item.id
                );

                if (itemIndex >= 0) {
                    parsedLocalBasketState = [
                        ...parsedLocalBasketState.slice(0, itemIndex),
                        {
                            prodId: item.id,
                            count: parsedLocalBasketState[itemIndex].count + 1,
                        },
                        ...parsedLocalBasketState.slice(itemIndex + 1),
                    ];
                } else {
                    parsedLocalBasketState.push({
                        prod_id: item.id,
                        count: 1,
                    });
                }

                localStorage.setItem(
                    'basketState',
                    JSON.stringify(parsedLocalBasketState)
                );
            } else {
                localStorage.setItem(
                    'basketState',
                    JSON.stringify([
                        {
                            prod_id: item.id,
                            count: 1,
                        },
                    ])
                );
            }
        }
    };

    const onShowProduct = (item) => {
        setFullItem(item);
        setShowFullItem(!showFullItem);
    };

    const handleClickMenu = () => {
        setIsMenuVisible(!menuVisible);

        menuVisible
            ? document.body.classList.remove(styles.bodyActive)
            : document.body.classList.add(styles.bodyActive);
    };

    const onCloseFullItem = useCallback(() => {
        setShowFullItem(false);
    }, []);

    const handleClickProduct = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className={styles.container}>
            <Header
                handleClickMenu={handleClickMenu}
                menuVisible={menuVisible}
            />

            <div className={styles.wrapper}>
                <Menu
                    menuVisible={menuVisible}
                    setIsMenuVisible={setIsMenuVisible}
                />

                {showFullItem && (
                    <ItemModal
                        item={fullItem}
                        onShowProduct={onShowProduct}
                        onCloseFullItem={onCloseFullItem}
                        onAdd={addToBasket}
                    />
                )}

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main
                                onShowProduct={onShowProduct}
                                addToBasket={addToBasket}
                                handleClickProduct={handleClickProduct}
                            />
                        }
                    />

                    <Route
                        path="/shop"
                        element={
                            <Shop
                                handleClickProduct={handleClickProduct}
                                onShowProduct={onShowProduct}
                                onAdd={addToBasket}
                            />
                        }
                    />
                    <Route path="/basket" element={<Basket />} />
                    <Route
                        path="/product/:id"
                        element={<CardProduct onAdd={addToBasket} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/account" element={<MyAcc />}>
                        <Route path="my" element={<AccHome />} />
                        <Route path="orders" element={<ListOrders />} />
                        <Route path="help" element={<HelpBlock />} />
                    </Route>

                    <Route path="/order/checkout" element={<Order />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
};
