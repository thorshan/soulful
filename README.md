# Velora Ecommerce API

Velora Ecommerce API is a backend service built with **Node.js**, **Express**, and **MongoDB (via Mongoose)**.
It powers the Velora online shopping platform — handling authentication, products, carts, and more.

---

## Features

-  **User Authentication** with JWT & bcryptjs
-  **Product Management** (CRUD operations)
-  **Cart & Order Handling**
-  **Environment Configuration** using dotenv
-  **CORS Enabled** for secure cross-origin communication
-  **MongoDB Integration** with Mongoose ODM

---

## Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework for building REST APIs |
| **MongoDB + Mongoose** | Database and schema modeling |
| **dotenv** | Manage environment variables |
| **bcryptjs** | Password hashing |
| **jsonwebtoken (JWT)** | Authentication and token management |
| **cors** | Enable Cross-Origin Resource Sharing |

---

##  Project Structure

velora-api/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
├── .env
├── package.json
└── README.md

---

## Installation

### Clone the repository

```bash
git clone https://github.com/thorshan/velora.git
cd velora
npm install
npm run dev

```

The server will start on: http://localhost:5000
and for API http://localhost:5000/api

## API Routes

### Auth

| Method | Endpoint    | Description             | Access        |
| ------ | ----------- | ----------------------- | ------------- |
| POST   | `/register` | Register a new user     | Public        |
| POST   | `/login`    | Login and get JWT token | Public        |
| POST   | `/logout`   | Logout current user     | Authenticated |


### User

| Method | Endpoint     | Description     | Access                 |
| ------ | ------------ | --------------- | ---------------------- |
| GET    | `/users`     | Get all users   | Admin, Moderator       |
| POST   | `/users`     | Create new user | Admin                  |
| GET    | `/users/:id` | Get user by ID  | Admin, Moderator, User |
| PUT    | `/users/:id` | Update user     | Admin                  |
| DELETE | `/users/:id` | Delete user     | Admin                  |


### Brands

| Method | Endpoint      | Description     | Access |
| ------ | ------------- | --------------- | ------ |
| GET    | `/brands`     | Get all brands  | Public |
| POST   | `/brands`     | Create brand    | Admin  |
| GET    | `/brands/:id` | Get brand by ID | Public |
| PUT    | `/brands/:id` | Update brand    | Admin  |
| DELETE | `/brands/:id` | Delete brand    | Admin  |


### Category

| Method | Endpoint          | Description        | Access |
| ------ | ----------------- | ------------------ | ------ |
| GET    | `/categories`     | Get all categories | Public |
| POST   | `/categories`     | Create category    | Admin  |
| GET    | `/categories/:id` | Get category by ID | Public |
| PUT    | `/categories/:id` | Update category    | Admin  |
| DELETE | `/categories/:id` | Delete category    | Admin  |


### Items

| Method | Endpoint     | Description                    | Access           |
| ------ | ------------ | ------------------------------ | ---------------- |
| GET    | `/items`     | Get all items                  | Public           |
| POST   | `/items`     | Create new item                | Admin, Moderator |
| GET    | `/items/:id` | Get item by ID                 | Public           |
| GET    | `/items/:id` | Get item with all related data | Public           |
| PUT    | `/items/:id` | Update item                    | Admin, Moderator |
| DELETE | `/items/:id` | Delete item                    | Admin, Moderator |


### Reviews

| Method | Endpoint                   | Description            | Access                 |
| ------ | -------------------------- | ---------------------- | ---------------------- |
| GET    | `/reviews`                 | Get all reviews        | Public                 |
| POST   | `/reviews`                 | Create review          | Admin, Moderator, User |
| GET    | `/reviews/:id`             | Get review by ID       | Public                 |
| GET    | `/reviews/review-item/:id` | Get reviews by item ID | Public                 |
| GET    | `/reviews/user/:id`        | Get reviews by user ID | Public                 |
| DELETE | `/reviews/:id`             | Delete review          | Admin, Moderator       |


### Promotions

| Method | Endpoint                    | Description              | Access           |
| ------ | --------------------------- | ------------------------ | ---------------- |
| GET    | `/promotions`               | Get all promotions       | Public           |
| POST   | `/promotions`               | Create promotion         | Admin, Moderator |
| GET    | `/promotions/:id`           | Get promotion by ID      | Public           |
| GET    | `/promotions/promotion/:id` | Get promotion by item ID | Public           |
| PUT    | `/promotions/:id`           | Update promotion         | Admin, Moderator |
| DELETE | `/promotions/:id`           | Delete promotion         | Admin, Moderator |


### Card

| Method | Endpoint              | Description                  | Access                 |
| ------ | --------------------- | ---------------------------- | ---------------------- |
| GET    | `/cart/:userId`       | Get user’s cart              | Admin, Moderator, User |
| POST   | `/cart/add`           | Add item to cart             | Admin, Moderator, User |
| PUT    | `/cart/update`        | Update item quantity in cart | Admin, Moderator, User |
| DELETE | `/cart/remove`        | Remove item from cart        | Admin, Moderator, User |
| DELETE | `/cart/clear/:userId` | Clear user’s entire cart     | Admin, Moderator, User |


### Order

| Method | Endpoint            | Description          | Access                 |
| ------ | ------------------- | -------------------- | ---------------------- |
| GET    | `/orders`           | Get all orders       | Admin, Moderator, User |
| POST   | `/orders`           | Create new order     | Admin, Moderator, User |
| GET    | `/orders/:id`       | Get order by ID      | Admin, Moderator, User |
| GET    | `/orders/order/:id` | Get order by user ID | Admin, Moderator, User |
| PUT    | `/orders/:id`       | Update order         | Admin, Moderator, User |
| DELETE | `/orders/:id`       | Delete order         | Admin, Moderator, User |
