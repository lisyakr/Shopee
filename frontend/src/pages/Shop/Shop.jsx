import { useCallback, useState, useEffect } from 'react';

import Select from 'react-select';
import { Products } from '../../components/Products/Products';
import { baseUrl } from '../../constants';
import './Shop.css';
import iconFilters from '../../assets/img/icons/filters.svg';
import { getDataForShop } from '../../utils';
import optionsFilterPrice from '../../constants';
import { Search } from '../../components/SearchPanel/Search';

export const Shop = ({ handleClickProduct, onShowProduct, onAdd }) => {
    const [products, setProducts] = useState([]);
    const [idCategory, setIdCategory] = useState(null);
    const [sortPrice, setSortPrice] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState(false);
    const [valueInput, setValueInput] = useState('');

    const chooseCategory = useCallback((category) => {
        category ? setIdCategory(category.value) : setIdCategory(null);
    }, []);

    const sortByPrice = useCallback((sort) => {
        sort ? setSortPrice(sort.value) : setSortPrice(null);
    }, []);

    const handleClickFilters = () => {
        setFilters(!filters);
    };

    useEffect(() => {
        getDataForShop({ idCategory, sortPrice }).then((res) => {
            setProducts(res);
        });
    }, [idCategory, sortPrice]);

    useEffect(() => {
        fetch(`${baseUrl}/categories`)
            .then((res) => res.json())
            .then((data) =>
                setCategories(data.map((d) => ({ value: d.id, label: d.name })))
            )
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const filteredProducts = products.filter((prod) => {
        return prod.title.toLowerCase().includes(valueInput.toLowerCase());
    });

    return (
        <div className="shop">
            <h2>Shop</h2>

            <Search value={valueInput} setValue={setValueInput} />

            <div className="filters" onClick={handleClickFilters}>
                <img src={iconFilters} alt="Filters" />
                <span>Filters</span>
            </div>
            {filters && (
                <>
                    <Select
                        classNamePrefix="custom-select"
                        options={categories}
                        onChange={(category) => chooseCategory(category)}
                        placeholder="choose categories"
                        isClearable
                    />
                    <Select
                        classNamePrefix="custom-select"
                        options={optionsFilterPrice}
                        onChange={(sort) => sortByPrice(sort)}
                        placeholder="choose filters"
                        isClearable
                    />
                </>
            )}

            <Products
                products={filteredProducts}
                handleClickProduct={handleClickProduct}
                onShowProduct={onShowProduct}
                onAdd={onAdd}
            />
        </div>
    );
};
