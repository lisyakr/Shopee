import styles from './Products.module.css';
import basket from '../../assets/img/icons/shopping-cart 1 (1).svg';
import eye from '../../assets/img/icons/open-card-eye.svg';

export const Products = ({
    onShowProduct,
    onAdd,
    handleClickProduct,
    products,
}) => {
    return (
        <ul className={styles.products}>
            {products.map((product) => (
                <li
                    className={styles.product__item}
                    key={product.id}
                    onClick={() => handleClickProduct(product)}
                >
                    <div className={styles.hover_bgr}>
                        <img
                            src={`/img/products/${product.img}`}
                            alt="product"
                        />
                        <div className={styles.fon}>
                            <img
                                src={basket}
                                alt="basket"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd(product);
                                }}
                            />
                            <img
                                src={eye}
                                alt="eye"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onShowProduct(product);
                                }}
                            />
                        </div>
                    </div>

                    <p>{product.title}</p>
                    <span>${product.price},00</span>
                </li>
            ))}
        </ul>
    );
};
