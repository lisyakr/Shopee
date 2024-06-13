import { Carousel } from '../../components/Carousel/Carousel';
import { Products } from '../../components/Products/Products';
import { useEffect, useState } from 'react';
import { getData } from '../../utils';
import { useNavigate } from 'react-router-dom';

import styles from './Main.module.css';

export const Main = ({ onShowProduct, addToBasket, handleClickProduct }) => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getData({ count: 8 }).then((res) => {
            setProducts(res);
        });
    }, []);

    return (
        <>
            <Carousel />
            <div className={styles.main_text}>
                <h2>Shop The Latest</h2>
                <p onClick={() => navigate(`/shop`)}>View all</p>
            </div>
            <Products
                products={products}
                onShowProduct={onShowProduct}
                onAdd={addToBasket}
                handleClickProduct={handleClickProduct}
            />
        </>
    );
};
