import styles from './About.module.css';

import img1 from '../../assets/img/about-blog/Img 04.png';
import img1Desctop from '../../assets/img/desctop/Img 02.png';
import img2 from '../../assets/img/about-blog/Img 01 (1).png';
import img2Desctop from '../../assets/img/desctop/Img 01 (1).png';

export const About = () => {
    return (
        <div className={styles.about}>
            <h3>About</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                placerat, augue a volutpat hendrerit, sapien tortor faucibus
                augue, a maximus elit ex vitae libero. Sed quis mauris eget{' '}
            </p>
            <h4>Top trends</h4>
            <img src={img2} alt="img2" className={styles.desctop_mobile} />
            <img
                src={img2Desctop}
                alt="img2"
                className={styles.desctop_version}
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                placerat, augue a volutpat hendrerit, sapien tortor faucibus
                augue, a maximus elit ex vitae libero. Sed quis mauris eget{' '}
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                placerat, augue a volutpat hendrerit, sapien tortor faucibus
                augue, a maximus elit ex vitae libero. Sed quis mauris eget{' '}
            </p>
            <h4>Produced with care</h4>
            <img src={img1} alt="img1" className={styles.desctop_mobile} />
            <img
                src={img1Desctop}
                alt="img1"
                className={styles.desctop_version}
            />

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                placerat, augue a volutpat hendrerit, sapien tortor faucibus
                augue, a maximus elit ex vitae libero. Sed quis mauris eget{' '}
            </p>
        </div>
    );
};
