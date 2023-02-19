CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status varchar(50),
    user_id bigint REFERENCES users(id)
);