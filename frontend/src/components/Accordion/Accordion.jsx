import { useState } from 'react';

import styles from './Accordion.module.css';

export const Accordion = ({ arrowImg }) => {
    const [openId, setOpenId] = useState(false);

    const clickHandler = () => {
        setOpenId(!openId);
    };
    return (
        <div className={styles.accordion}>
            <div className={styles.item}>
                <div className={styles.header} onClick={() => clickHandler()}>
                    <span>Description</span>
                    <img
                        src={arrowImg}
                        alt="arrow"
                        className={openId ? styles.active : ''}
                    />
                </div>
                <div
                    className={`${styles.collapse} ${
                        openId ? styles.open : ''
                    }`}
                >
                    <div className={styles.body}>
                        Lorem ipsum dolor sit amet, consectetur adipisce elit.
                        Aliquam placerat ...
                    </div>
                </div>
            </div>
        </div>
    );
};
