import { getData } from '../../utils';

import styles from './CardProduct.module.css';
import stylesApp from '../../components/App/App.module.css';

import share from '../../assets/img/icons/share.svg';
import arrow from '../../assets/img/icons/arrowDesc.svg';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion } from '../../components/Accordion/Accordion';

export const CardProduct = ({ onAdd }) => {
    const [product, setProduct] = useState([]);

    const navigate = useNavigate();

    let location = useLocation();

    const getD = useCallback(() => {
        const idProduct = location.pathname.split('/').slice(-1).join();
        getData({ id: idProduct }).then((res) => {
            setProduct(res[0]);
        });
    }, [location.pathname]);

    useEffect(() => {
        getD();
    }, [getD]);

    return (
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <img src={`/img/products/${product.img}`} alt={product.title} />

                <div>
                    <h3>{product.title}</h3>
                    <div className={styles.aside}>
                        <span>$ {product.price},00</span>
                        <img src={share} alt="share" />
                    </div>
                    <p className={styles.desctop_version}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam placerat, augue a volutpat hendrerit, sapien
                        tortor faucibus augue, a maximus elit ex vitae libero.
                        Sed quis mauris eget arcu facilisis consequat sed eu
                        felis.
                    </p>
                    <button
                        className={`${stylesApp.btn} ${stylesApp['btn--white']}`}
                        onClick={() => onAdd(product)}
                    >
                        ADD TO CART
                    </button>
                    <div className={styles.desctop_version}>
                        <img src={share} alt="share" />
                        <div>SKU: {product.id}</div>
                    </div>
                </div>
            </div>

            <Accordion arrowImg={arrow} />

            <div className={styles.return} onClick={() => navigate(`/`)}>
                <div>Continue shopping</div>
                <img src={arrow} alt="arrow" />
            </div>
        </div>
    );
};
