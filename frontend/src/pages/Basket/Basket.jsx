import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Basket.module.css';

import { FormCoupon } from '../../components/Forms/CouponForm/FormCoupon';
import { CartTotals } from '../../components/CartTotals/CartTotals';
import { ItemBasket } from '../../components/ItemBasket/ItemBasket';

import { getBasketState } from '../../utils';
import { getProductsForBasket } from '../../utils';
import { sortDate } from '../../utils';
import { baseUrl } from '../../constants';

const ShowNothing = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.empty}>
            <h2>The cart is still empty</h2>
            <p>
                Visit the main page to select products or find what you need in
                the search
            </p>
            <button
                className={`${styles.btn} ${styles['btn--white']}`}
                onClick={() => navigate(`/`)}
            >
                Return to home screen
            </button>
        </div>
    );
};

export const Basket = () => {
    const [basketState, setBasketState] = useState([]);
    const [products, setProducts] = useState([]);

    const sum = useMemo(() => {
        return basketState.reduce(function (res, cur) {
            let product = products.find(({ id }) => id === cur.prod_id);
            if (!product) return res;
            return res + cur.count * product.price;
        }, 0);
    }, [products, basketState]);

    const basketProductsIds = useMemo(() => {
        return basketState.map((b) => b.prod_id);
    }, [basketState]);

    const getProducts = useCallback(async (ids) => {
        await getProductsForBasket(ids).then((data) =>
            data ? setProducts(data) : ''
        );
    }, []);

    useEffect(() => {
        if (basketProductsIds.length) {
            getProducts(basketProductsIds);
        } else {
            setProducts([]);
        }
    }, [basketProductsIds]);

    useEffect(() => {
        if (localStorage.getItem('isAuthorized')) {
            getBasketState().then((data) => {
                if (data) {
                    setBasketState(sortDate(data));
                }
            });
        } else {
            const localStorageBasket = JSON.parse(
                localStorage.getItem('basketState')
            );

            if (localStorageBasket) setBasketState(localStorageBasket);
        }
    }, []);

    const deleteItemBasket = (productId) => {
        if (localStorage.getItem('isAuthorized')) {
            fetch(`${baseUrl}/basket_delete`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        const arr = basketState.filter(
                            (obj) => obj.prod_id !== productId
                        );

                        setBasketState(arr);
                    } else {
                        alert('Не удалось удалить товар');
                    }
                });
        } else {
            const data = JSON.parse(localStorage.getItem('basketState'));
            const newData = data.filter((obj) => obj.prod_id !== productId);

            localStorage.setItem('basketState', JSON.stringify(newData));
            setBasketState((prod) => {
                return prod.filter((s) => s.prod_id !== productId);
            });
        }
    };

    const clickPlusProduct = (id, count) => {
        if (count > 4) return;
        const method = 'increase';
        changeCountProd(id, method);
    };
    const clickMinusProduct = (id, count) => {
        if (count < 2) return;
        const method = 'decrease';
        changeCountProd(id, method);
    };

    const changeCountProd = useCallback(async (id, method) => {
        if (localStorage.getItem('isAuthorized')) {
            await fetch(`${baseUrl}/basket_change`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prodId: id,
                    action: method,
                }),
            })
                .then((res) => res.json())
                .then((data) => setBasketState(sortDate(data)));
        } else {
            const data = JSON.parse(localStorage.getItem('basketState'));

            if (method === 'increase') {
                const newData = data.map((obj) =>
                    obj.prod_id === id
                        ? { ...obj, count: obj.count === 5 ? 5 : obj.count + 1 }
                        : obj
                );
                localStorage.setItem('basketState', JSON.stringify(newData));
                setBasketState(newData);
            }
            if (method === 'decrease') {
                const newData = data.map((obj) =>
                    obj.prod_id === id
                        ? { ...obj, count: obj.count === 1 ? 1 : obj.count - 1 }
                        : obj
                );
                localStorage.setItem('basketState', JSON.stringify(newData));
                setBasketState(newData);
            }
        }
    }, []);
    return (
        <div className={styles.basket}>
            {products.length > 0 ? (
                <>
                    <div className={styles.shopping_cart}>
                        <h2>Shopping Cart</h2>
                        {basketState.map((obj) => (
                            <ItemBasket
                                key={obj.prod_id}
                                item={products.find(
                                    ({ id }) => id === obj.prod_id
                                )}
                                count={obj.count}
                                onDelete={deleteItemBasket}
                                onPlus={clickPlusProduct}
                                onMinus={clickMinusProduct}
                            />
                        ))}
                    </div>

                    <FormCoupon />

                    <CartTotals sum={sum} />
                </>
            ) : (
                <ShowNothing />
            )}
        </div>
    );
};
