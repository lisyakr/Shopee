create TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
create TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    categoriesId INT NOT NULL,
    price INT NOT NULL,
    img VARCHAR(50) NOT NULL,
    FOREIGN KEY (categoriesId) REFERENCES categories (id)
);

create TABLE basketProduct(
    prodId INT NOT NULL,
    count INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (prodId) REFERENCES products (id),
    FOREIGN KEY (userId) REFERENCES users (id)
);

create TABLE users(
    id SERIAL PRIMARY KEY,
    login INT NOT NULL,
    password INT NOT NULL
);