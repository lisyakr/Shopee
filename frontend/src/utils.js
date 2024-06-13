import { baseUrl } from './constants';

export const getData = (p) => {
    const params = new URLSearchParams();
    if (p?.count) {
        params.append('count', p.count);
    }

    if (p?.id) {
        params.append('id', p.id);
    }
    return fetch(`${baseUrl}/main?${params}`).then((res) => res.json());
};
export const getDataForShop = (obj) => {
    const params = new URLSearchParams();

    if (obj?.idCategory) {
        params.append('category_id', obj.idCategory);
    }

    if (obj?.sortPrice) {
        params.append('price', obj.sortPrice);
    }

    return fetch(`${baseUrl}/shop?${params}`).then((res) => res.json());
};
// получение состояния корзины
export const getBasketState = () => {
    return fetch(`${baseUrl}/basket_state`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
};

//получение продуктов по ids
export const getProductsForBasket = (ids) => {
    return fetch(`${baseUrl}/basket_products`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
    }).then((res) => res.json());
};

// сортировка даты
export const sortDate = (arr) => {
    return arr.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
};
// получение юзера для проверки а есть ли такой?
export const getUserAcc = () => {
    return fetch(`${baseUrl}/account`, {
        method: 'GET',
        credentials: 'include',
    }).then((res) => res.json());
};
