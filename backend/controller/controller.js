const db = require('../db');

class Controller {
    // получение продуктов
    async getProducts(req, res) {
        const countProd = req.query.count;
        const idProduct = req.query.id;

        let baseSql = 'SELECT * FROM products';
        const deps = [];

        if (idProduct) {
            baseSql += ' WHERE id = $1';
            deps.push(idProduct);
        }

        if (countProd) {
            baseSql += ' LIMIT $1';
            deps.push(countProd);
        }

        const products = await db.query(baseSql, deps);
        res.json(products.rows);
    }
    // с фильтрами
    async getProductsForShop(req, res) {
        const categoryId = req.query.category_id;
        const sortPrice = req.query.price;

        let baseSql = 'SELECT * FROM products';
        const deps = [];

        if (categoryId) {
            baseSql += ' WHERE categoriesId = $1';
            deps.push(categoryId);
        }
        if (sortPrice) {
            baseSql += ' ORDER BY price';
            if (sortPrice === 'maxPrice') {
                baseSql += ' DESC';
            }
        }
        const products = await db.query(baseSql, deps);
        res.json(products.rows);
    }
    // получение категорий
    async getCategories(req, res) {
        const categories = await db.query('SELECT * FROM categories');
        res.json(categories.rows);
    }
    // получение избранных
    async getFavoritesProducts(req, res) {
        const { userId } = req;
        const basketState = await db.query(
            'SELECT prod_id, date FROM favorites WHERE user_id = $1',
            [userId]
        );

        return res.json(basketState.rows);
    }
    // создание избранных
    async createFavoritesProducts(req, res) {
        const { userId } = req;
        const prodId = req.body.itemId;

        const newFavoriteProd = await db.query(
            `INSERT INTO favorites(user_id, prod_id) VALUES ($1, $2)`,
            [userId, prodId]
        );
        return res.send(true);
    }
    // аккаунт
    async getAccount(req, res) {
        const { login, password } = req.body;

        const user = await db.query(
            'SELECT * FROM users WHERE login = $1 AND password = $2',
            [login, password]
        );

        if (user.rows[0]) {
            res.cookie('login_password', `${login}_${password}`, {
                domain: 'localhost',
                maxAge: 90000000,
            });
            return res.send(true);
        }
        res.status(403);
        res.send('Not autorization');
    }

    async createUser(req, res) {
        const { login, password, firstname, lastname } = req.body;

        const newUser = await db.query(
            `INSERT INTO users(login, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`,
            [login, password, firstname, lastname]
        );

        if (newUser.rows[0]) return res.send(true);

        res.status(403);
        res.send('Not autorization');
    }
    async getLogOut(req, res) {
        // const { userId } = req;
        let data = req.cookies.login_password;
        const [login, password] = data.split('_');

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.cookie('login_password', `${login}_${password}`, {
            domain: 'localhost',
            maxAge: 0,
        });

        return res.send(true);
    }
    // проверка куки (есть ли такой user)
    async getUser(req, res) {
        const { userId } = req;

        const user = await db.query('SELECT * FROM users WHERE id = $1', [
            userId,
        ]);
        if (user.rows[0]) return res.json(user.rows[0]);
    }
    // корзина
    async getBasketState(req, res) {
        const { userId } = req;

        const basketState = await db.query(
            'SELECT prod_id, count, date FROM basketProduct WHERE user_id = $1',
            [userId]
        );

        return res.json(basketState.rows);
    }
    //.......для LS и user
    async getProductsForBasket(req, res) {
        const prodId = req.body;

        const whereList = prodId.reduce((res, cur, index) => {
            if (!index) {
                return res + `WHERE id = $${index + 1}`;
            }
            return res + ` OR id = $${index + 1}`;
        }, '');
        const products = await db.query(
            `SELECT * FROM products ${whereList}`,
            prodId
        );
        return res.json(products.rows);
    }
    async createBasket(req, res) {
        const { userId } = req;
        const basketState = await db.que;
        const prodId = req.body.itemId;
        const count = 1;

        //проверка на повтор id
        const product = await db.query(
            `SELECT prod_id FROM basketProduct WHERE user_id=$1 AND prod_id=$2`,
            [userId, prodId]
        );

        //если такой продукт уже есть
        if (product.rows.length) {
            //послать запрос в БД на изменение кол-ва
            const updateCount = await db.query(
                'UPDATE basketProduct SET count = count + 1 WHERE user_id=$1 AND prod_id=$2',
                [userId, prodId]
            );
        } else {
            //если нет, то создаем
            const newBasket = await db.query(
                `INSERT INTO basketProduct(prod_id, count, user_id) VALUES ($1, $2, $3) RETURNING *`,
                [prodId, count, userId]
            );
        }
        return res.send(true);
    }
    async basketItemDelete(req, res) {
        const prodId = req.body.id;
        const { userId } = req;

        const deleteItem = await db.query(
            'DELETE FROM basketProduct WHERE prod_id = $1 AND user_id = $2',
            [prodId, userId]
        );
        return res.send(true);
    }
    async basketItemChangeCount(req, res) {
        const { prodId, action } = req.body;
        const { userId } = req;

        let baseSqlOne = 'UPDATE basketProduct SET';
        let baseSqlTwo = 'WHERE user_id=$1 AND prod_id=$2';
        const deps = [userId, prodId];

        if (action === 'increase') {
            baseSqlOne += ' count = count + 1 ' + baseSqlTwo;
        }

        if (action === 'decrease') {
            baseSqlOne += ' count = count - 1 ' + baseSqlTwo;
        }
        const products = await db.query(baseSqlOne, deps);
        const basketState = await db.query(
            'SELECT * FROM basketProduct WHERE user_id=$1',
            [userId]
        );
        return res.json(basketState.rows);
    }
    // заказы
    async getOrder(req, res) {
        const { userId } = req;

        const basketState = await db.query(
            'SELECT  id, phone, date, payment FROM orders WHERE user_id = $1',
            [userId]
        );

        if (basketState.rows.length) return res.json(basketState.rows);
    }
    async createOrder(req, res) {
        const { adress, phone, email, notes, payment } = req.body.order; //{}
        const basketState = req.body.basketState; //[{}]

        const { userId } = req;

        const newOrder = await db.query(
            `INSERT INTO orders(user_id, payment, adress, email, phone, comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [userId, payment, adress, email, phone, notes]
        );
        const idOrder = newOrder.rows[0].id; //14

        const whereList = basketState.reduce((res, cur, index) => {
            if (!index) {
                return res + `(${cur.prod_id}, ${idOrder}, ${cur.count})`;
            }
            return res + `, (${cur.prod_id}, ${idOrder}, ${cur.count})`;
        }, '');

        const newOrderProduct = await db.query(
            `INSERT INTO order_products(prod_id, order_id, count) VALUES ${whereList} RETURNING order_id`
        );
        const orderNumber = newOrderProduct.rows[0].order_id;
        return res.json(orderNumber);
    }
}

module.exports = new Controller();
