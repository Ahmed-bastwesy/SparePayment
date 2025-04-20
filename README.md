
# SpareTask API

## Overview

This document provides instructions for setting up and using the SpareTask API, which includes user authentication, product management, promo code handling, and cart functionality.

---

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)  
- npm
- Postman (for API testing)

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Ahmed-bastwesy/SparePayment.git 
cd SparePayment
```

2. **Install dependencies:**

```bash
npm install
```


3. **Start the server:**

```bash
npm run server
```

The server should now be running on:  
[http://localhost:8500](http://localhost:8500)

---

## API Endpoints

### User Authentication

#### Login

- **Endpoint:** `GET /api/user/login`
- **Request Body:**

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

- **Description:** Authenticates a user and returns a JWT token for authorization.

---

### Products

#### List Products

- **Endpoint:** `GET /api/product`
- **Description:** Retrieves a list of all products.

#### Create Product

- **Endpoint:** `POST /api/product`
- **Request Body:**

```json
{
  "productId": "12",
  "name": "Tve",
  "quantity": 3,
  "price": 100
}
```

- **Description:** Creates a new product.

#### Update Product

- **Endpoint:** `PUT /api/product`
- **Request Body:**

```json
{
  "productId": "13",
  "name": "Television",
  "quantity": 5,
  "price": 600
}
```

- **Description:** Updates an existing product.

#### Delete Product

- **Endpoint:** `DELETE /api/product/:id`
- **Description:** Deletes a product with the specified ID.

---

### Promo Codes

#### List Promo Codes

- **Endpoint:** `GET /api/promo`
- **Description:** Retrieves a list of all promo codes.

#### Create Promo Code

- **Endpoint:** `POST /api/promo`
- **Request Body:**

```json
{
  "promoId": "1",
  "name": "50PERCENTOFF",
  "percentage": 50
}
```

- **Description:** Creates a new promo code.

#### Update Promo Code

- **Endpoint:** `PUT /api/promo`
- **Request Body:**

```json
{
  "promoId": "12",
  "name": "213edasda",
  "percentage": 15
}
```

- **Description:** Updates an existing promo code.

#### Delete Promo Code

- **Endpoint:** `DELETE /api/promo/:id`
- **Description:** Deletes a promo code with the specified ID.

---

### Cart

#### Get User Cart

- **Endpoint:** `GET /api/cart`
- **Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

- **Description:** Retrieves the current user's cart.

#### Get User Cart with Promo

- **Endpoint:** `GET /api/cart`
- **Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

- **Request Body:**

```json
{
  "promoCode": "50PERCENTOFF"
}
```

- **Description:** Retrieves the current user's cart with promo code applied.

#### Add Product to Cart

- **Endpoint:** `POST /api/cart/addProduct`
- **Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

- **Request Body:**

```json
{
  "productId": "16",
  "quantity": 1
}
```

- **Description:** Adds a product to the user's cart.

#### Remove Product from Cart

- **Endpoint:** `PUT /api/cart/removeProduct/:id`
- **Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

- **Description:** Removes a product from the user's cart.

---

## Testing the API

You can import the provided Postman collection `spareTask.postman_collection.json` to test all endpoints. The collection includes example requests for each endpoint.

---

## Notes

- All cart-related endpoints require authentication via a JWT token in the `Authorization` header.
- The JWT token is obtained from the login endpoint.
