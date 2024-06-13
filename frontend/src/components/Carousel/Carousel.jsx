import { useEffect } from 'react';

import './Carousel.css';
import styles from '../App/App.module.css';
import { useNavigate } from 'react-router-dom';

const $ = window.$;

export const Carousel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        $(function () {
            $('.owl-carousel').owlCarousel({
                items: 1,
                margin: 10,
            });
        });
    }, []);

    return (
        <div className="owl-carousel">
            <div className="background">
                <div className="text-background">
                    <h1>Gold big hoops</h1>
                    <p>$ 74,00</p>
                    <button
                        // className="btn btn--white"
                        className={`${styles.btn} ${styles['btn--white']}`}
                        onClick={() => navigate(`/product/12`)}
                    >
                        View Product
                    </button>
                </div>
            </div>

            <div className="background">
                <div className="text-background">
                    <h1>Gold big hoops</h1>
                    <p>$ 74,00</p>
                    <button>View Product</button>
                </div>
            </div>

            <div className="background">
                <div className="text-background">
                    <h1>Gold big hoops</h1>
                    <p>$ 74,00</p>
                    <button>View Product</button>
                </div>
            </div>
        </div>
    );
};
