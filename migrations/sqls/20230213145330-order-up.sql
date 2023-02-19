CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status varchar(50),
    quantity integer,
    product_id bigint REFERENCES product(id),
    user_id bigint REFERENCES users(id)
);