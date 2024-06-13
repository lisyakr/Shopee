import styles from './ItemBasket.module.css';

import deleteProduct from '../../assets/img/icons/delete-basket-mob.svg';
import deleteProdDesctop from '../../assets/img/icons/close.svg';

export const ItemBasket = ({ item, count, onDelete, onPlus, onMinus }) => {
    return (
        <div className={styles.basket} key={item.id}>
            <div className={styles.item}>
                <img src={`/img/products/${item.img}`} alt={item.title} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.card_product}>
                    <div className={styles.description}>
                        <h3>{item.title}</h3>
                        <p>{item.price}$</p>
                    </div>
                    <div className={styles.count}>
                        <div
                            onClick={() => onMinus(item.id, count)}
                            className={count === 1 ? styles.noActive : ''}
                        >
                            -
                        </div>
                        <span>{count}</span>
                        <div
                            onClick={() => onPlus(item.id, count)}
                            className={count === 5 ? styles.noActive : ''}
                        >
                            +
                        </div>
                    </div>
                </div>

                <div>
                    <img
                        src={deleteProduct}
                        className={styles.mobile_version}
                        alt="delete"
                        onClick={() => onDelete(item.id)}
                    />
                    <img
                        src={deleteProdDesctop}
                        className={styles.desctop_version}
                        alt="delete"
                        onClick={() => onDelete(item.id)}
                    />
                </div>
            </div>
        </div>
    );
};
