# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/products` [GET]
- Show `/products/:id` [GET]  
- Create `/products` [POST] [token required]
- Update `/products` [PUT] [token required]
- Delete `/products` [DELETE] [token required]

#### Users
- Index `/users` [GET]
- Show `/users/:id` [GET]
- Create `/users` [POST]
- Update `/users` [PUT] [token required]
- Delete `/users/:id` [DELETE] [token required]

#### Orders
- Index `/orders` [GET] [token required]
- Show `/users/:id` [GET] [token required]
- Create `/users` [POST] [token required]
- Update `/users` [PUT] [token required]
- Delete `/users/:id` [DELETE] [token required]

#### Products Order List
- Index `/productsorder` [GET] [token required]

## Data Shapes
#### Product
```
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name varchar(100),
    price numeric,
    category varchar(50)
);
```

#### User
```
CREATE TABLE users (
 id SERIAL PRIMARY KEY, 
 firstName varchar(100), 
 lastName varchar(100), 
 password varchar(255)
 );
```

#### Orders
```
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status varchar(50),
    quantity integer,
    product_id bigint REFERENCES product(id),
    user_id bigint REFERENCES users(id)
);
```
