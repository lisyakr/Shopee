import styles from './ItemModal.module.css';

import { useEffect, useRef } from 'react';

export const ItemModal = ({ item, onShowProduct, onCloseFullItem, onAdd }) => {
    const ref = useRef(null);

    const onClickOutsideFullItem = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            onCloseFullItem();
        }
    };
    useEffect(() => {
        document.addEventListener('mouseup', onClickOutsideFullItem);

        return () => {
            document.removeEventListener('mouseup', onClickOutsideFullItem);
        };
    }, []);

    return (
        <div className={styles.modal}>
            <div ref={ref}>
                <div
                    className={styles.item}
                    onClick={() => onShowProduct(item)}
                    style={{
                        backgroundImage: `url(/img/products/${item.img})`,
                    }}
                />
                <h2>{item.title}</h2>
                <p>{item.price}.00$</p>
                <button onClick={() => onAdd(item)}>+</button>
            </div>
        </div>
    );
};
