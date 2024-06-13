import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Order.module.css';

import { baseUrl } from '../../constants';

import { shippingPrice } from '../../constants';
import { getBasketState } from '../../utils';
import { getProductsForBasket } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { OrderCheckoutForm } from '../../components/OrderCheckoutForm/OrderCheckoutForm';

const ShowNumberOrder = ({ numberOrder }) => {
    const navigate = useNavigate();
    return (
        <div className="empty_order">
            <h2>Order number {numberOrder} placed &#127881;</h2>
            <p>
                Go to the{' '}
                <i onClick={() => navigate(`/order-section`)}>orders section</i>
                .
            </p>
        </div>
    );
};

export const Order = () => {
    const [basketState, setBasketState] = useState([]);
    const [products, setProducts] = useState([]);
    const [issued, setIssued] = useState(false);
    const [numberOrder, setNumberOrder] = useState(0);

    const navigate = useNavigate();

    const sum = useMemo(() => {
        return basketState.reduce(function (res, cur) {
            let product = products.find(({ id }) => id === cur.prod_id);
            if (!product) return res;
            return res + cur.count * product.price;
        }, 0);
    }, [products, basketState]);

    const stateForProd = useMemo(() => {
        if (products.length) {
            return basketState.map((obj) => ({
                id: products.find(({ id }) => id === obj.prod_id).id,
                title: products.find(({ id }) => id === obj.prod_id).title,
                count: obj.count,
                price: products.find(({ id }) => id === obj.prod_id).price,
            }));
        }
    }, [basketState, products]);

    const basketProductsIds = useMemo(() => {
        return basketState.map((b) => b.prod_id);
    }, [basketState]);

    const getProducts = useCallback(async (ids) => {
        if (ids.length) {
            await getProductsForBasket(ids).then((data) =>
                data ? setProducts(data) : ''
            );
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('isAuthorized')) {
            getBasketState().then((data) => (data ? setBasketState(data) : ''));
        } else {
            alert('To place an order you need to log in to your account');
        }
    }, []);

    useEffect(() => {
        getProducts(basketProductsIds);
    }, [basketProductsIds, getProducts]);

    const submitFormOrder = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        fetch(`${baseUrl}/create_order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                order: obj,
                basketState,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setNumberOrder(data);
                    setIssued(true);
                } else {
                    alert('произошла ошибка при оформлении заказа');
                }
            });
    };
    return !issued ? (
        <div className={styles.checkout}>
            <div className={styles.wrapper}>
                <div>
                    <h4>Checkout</h4>
                    <div className={styles.aside}>
                        <div onClick={() => navigate(`/shop`)}>
                            Return to the shop?<span> Click here to login</span>{' '}
                        </div>
                        <div onClick={() => navigate(`/basket`)}>
                            Have a coupon?
                            <span> Click here to enter your code</span>{' '}
                        </div>
                    </div>

                    <OrderCheckoutForm onSubmit={submitFormOrder} />
                </div>
                <div>
                    <h4>Your Order</h4>
                    <div className={styles.order}>
                        <div>
                            <div>PRODUCT</div>
                            <div>TOTAL</div>
                        </div>

                        <ul>
                            {stateForProd &&
                                stateForProd.map((obj) => (
                                    <li key={obj.id}>
                                        <div>
                                            {obj.title}{' '}
                                            <span>
                                                {obj.count > 1
                                                    ? 'x' + obj.count
                                                    : ''}
                                            </span>
                                        </div>
                                        <div>${obj.count * obj.price}</div>
                                    </li>
                                ))}
                        </ul>

                        <div className={styles.subtotal}>
                            <div>SUBTOTAL</div>
                            <div>${sum}</div>
                        </div>
                        <div className={styles.subtotal}>
                            <div>SHIPPING</div>
                            <div>${shippingPrice}</div>
                        </div>
                        <div>
                            <div>TOTAL</div>
                            <div>${shippingPrice + sum}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <ShowNumberOrder numberOrder={numberOrder} />
    );
};
