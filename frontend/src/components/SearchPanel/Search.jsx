import search from '../../assets/img/icons/search.svg';

import styles from './Search.module.css';

export const Search = ({ value, setValue }) => {
    return (
        <>
            <div className={styles.search}>
                <img src={search} alt="search" />

                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Найти"
                />
            </div>
        </>
    );
};
