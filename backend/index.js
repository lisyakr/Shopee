const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller/controller');
let multer = require('multer');
const cookieParser = require('cookie-parser');
const db = require('./db');

const PORT = process.env.PORT ?? 8080;
const app = express();

// const whitelist = ['http://localhost:3000'];

// const corsOptions = {
//     origin: 'http://localhost:3000',
// };

// const corsOptionsDelegate = function (req, callback) {
//     let corsOptions;
//     const or = req.header('Origin');
//     if (whitelist.indexOf(req.header('Origin')) !== -1 || !origin) {
//         debugger;
//         callback(null, true);
//         // corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     } else {
//         corsOptions = { origin: false }; // disable CORS for this request
//     }
//     callback(null, corsOptions); // callback expects two parameters: error and options
// };

// var corsOptions = {
//     origin: function (origin, callback) {
//         debugger;
//         callback(null, { origin: false });
//     },
// };

app.use(function (req, res, next) {
    let origin = req.headers.origin;
    res.header(
        'Access-Control-Allow-Origin',
        req.headers.host.indexOf('localhost') > -1
            ? 'http://localhost:3000'
            : origin
    );
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = async (req, res, next) => {
    const data = req.cookies.login_password;

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    // res.setHeader('Access-Control-Allow-Methods', 'POST');
    // debugger;
    let isAuthorized = false;
    let userId = null;

    if (data) {
        const [login, password] = data.split('_');

        const user = await db.query(
            'SELECT * FROM users WHERE login = $1 AND password = $2',
            [login, password]
        );
        if (user.rows[0]) {
            userId = user.rows[0].id;
            isAuthorized = true;
        }
    }

    if (!isAuthorized) {
        return res.send(401, 'Unauthorized');
    }

    req.userId = userId;
    next();
};

app.get('/main', controller.getProducts);
app.get('/shop', controller.getProductsForShop);
app.get('/favorites', [authMiddleware, controller.getFavoritesProducts]);
app.get('/categories', controller.getCategories);
app.get('/basket_state', [authMiddleware, controller.getBasketState]); //получение состояния корзины пользователя
app.get('/account', [authMiddleware, controller.getUser]);
app.get('/logout', controller.getLogOut);
app.get('/orders', [authMiddleware, controller.getOrder]);

app.post('/basket_products', multer().none(), controller.getProductsForBasket); // получение продуктов для корзины
app.post('/favorites', multer().none(), [
    authMiddleware,
    controller.createFavoritesProducts,
]); // получение продуктов для корзины
app.post('/login', multer().none(), controller.getAccount);
app.post('/register', multer().none(), controller.createUser);
app.post('/basket_create', multer().none(), [
    authMiddleware,
    controller.createBasket,
]);
app.post('/basket_delete', multer().none(), [
    authMiddleware,
    controller.basketItemDelete,
]);
app.post('/basket_change', multer().none(), [
    authMiddleware,
    controller.basketItemChangeCount,
]);
app.post('/create_order', multer().none(), [
    authMiddleware,
    controller.createOrder,
]);

app.listen(PORT, () => console.log(`server started on post ${PORT}`));
