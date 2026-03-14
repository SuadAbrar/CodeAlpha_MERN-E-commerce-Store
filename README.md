# 🛒 MERN E-Commerce Store

A modern **full-stack E-Commerce web application** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** with **TailwindCSS** for a responsive and clean user interface.

The platform enables users to **browse products, view product details, manage a shopping cart, and place orders** through a simplified checkout workflow.

This project demonstrates **professional full-stack architecture**, **RESTful API design**, **secure authentication**, and **state management** in a scalable and maintainable application.

---

# 📛 Badges

### 🖥️ Core Stack

![Stack](https://img.shields.io/badge/Stack-MERN-3C873A?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge)
![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge)
![React.js](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge)

### 🎨 UI / UX

![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38BDF8?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Design-FF6F61?style=for-the-badge)
![Modern UI](https://img.shields.io/badge/UI-Modern%20Interface-8A2BE2?style=for-the-badge)

### 🔐 Security & Authentication

![JWT](https://img.shields.io/badge/Auth-JWT-FFB400?style=for-the-badge)
![BCrypt](https://img.shields.io/badge/Password-BCrypt-0A66C2?style=for-the-badge)

### 🧰 Developer Tools

![Postman](https://img.shields.io/badge/API%20Testing-Postman-F76935?style=for-the-badge)
![VSCode](https://img.shields.io/badge/Editor-VSCode-007ACC?style=for-the-badge)
![Git](https://img.shields.io/badge/Version%20Control-Git-F1502F?style=for-the-badge)
![npm](https://img.shields.io/badge/Package%20Manager-npm-CB0000?style=for-the-badge)

---

# 📑 Table of Contents

- Overview
- Key Objectives
- Core Features
- Technology Stack
- System Architecture
- Project Structure
- Database Design
- API Endpoints
- Getting Started
- Development Roadmap
- Future Improvements
- License

---

# 📌 Overview

This project is a **full-stack e-commerce platform** designed to demonstrate modern web development practices using the **MERN stack**.

The system provides essential e-commerce capabilities such as:

- product browsing
- product detail views
- shopping cart management
- order processing
- user authentication

The application follows a **clean client-server architecture**, separating frontend UI logic from backend business logic and database operations.

---

# 🎯 Key Objectives

The goal of this project is to:

- Implement a **complete full-stack application**
- Design a **RESTful API architecture**
- Demonstrate **secure authentication workflows**
- Build a **modern responsive UI**
- Implement **core e-commerce functionality**
- Maintain **clean and scalable project structure**

---

# 🧩 Core Features

## 👤 User Authentication

Secure authentication system including:

- User registration
- User login
- Password hashing with **bcrypt**
- **JWT-based authentication**
- Protected API routes

---

## 🛍 Product Catalog

Users can:

- Browse product listings
- View product details
- See pricing and descriptions
- View product images
- Check product availability

---

## 🛒 Shopping Cart

The cart system allows users to:

- Add products to cart
- Remove products from cart
- Update product quantities
- View cart summary and total price

Cart state is managed on the **backend** (MongoDB via Cart model) and synchronized with the frontend.

---

## 📦 Order Processing

Users can complete purchases through a checkout flow:

- Cart data is sent to the backend
- Order is created in the database
- Order is associated with the authenticated user
- Users can view their order history

---

# 🧰 Technology Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Frontend

- React.js
- TailwindCSS
- React Router
- JavaScript (ES6+)

---

## Development Tools

- Git & GitHub
- Postman (API Testing)
- Visual Studio Code

---

# 🏗 System Architecture

The application follows a **client-server architecture**.

```
React Frontend
      │
      │ HTTP Requests
      ▼
Express.js REST API
      │
      │ Database Queries
      ▼
MongoDB Database
```

---

# 🗂 Project Structure

## Backend Structure

```
backend/

├─ src/
│  ├─ config/
│  │   └─ db.js
│  │
│  ├─ models/
│  │   ├─ User.js
│  │   ├─ Product.js
│  │   └─ Order.js
│  │   └─ Cart.js
│  │
│  ├─ controllers/
│  │   ├─ auth.controller.js
│  │   ├─ product.controller.js
│  │   ├─ cart.controller.js
│  │   └─ order.controller.js
│  │
│  ├─ routes/
│  │   ├─ auth.routes.js
│  │   ├─ product.routes.js
│  │   ├─ cart.routes.js
│  │   └─ order.routes.js
│  │
│  ├─ middleware/
│  │   └─ auth.middleware.js
│  │   └─ admin.middleware.js
│  │
│  └─ server.js
│
├─ .env
├─ package.json
└─ README.md
```

---

## Frontend Structure

```
frontend/

├─ src/
│  ├─ components/
│  │   ├─ Navbar.jsx
│  │   ├─ ProductCard.jsx
│  │   └─ CartItem.jsx
│  │
│  ├─ pages/
│  │   ├─ Home.jsx
│  │   ├─ ProductDetails.jsx
│  │   ├─ Cart.jsx
│  │   ├─ Checkout.jsx
│  │   ├─ Login.jsx
│  │   └─ Register.jsx
│  │
│  ├─ context/
│  │   └─ CartContext.jsx
│  │
│  ├─ services/
│  │   └─ api.js
│  │
│  ├─ App.jsx
│  └─ main.jsx
│
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
```

---

# 🗃 Database Design

### User

```
User
----
_id
name
email
password
createdAt
```

### Product

```
Product
-------
_id
name
description
price
image
category
stock
createdAt
```

### Order

```
Order
-----
_id
userId
products[
  {
    productId
    quantity
    price
  }
]
totalAmount
status
createdAt
```

### Cart

```
Cart
----
_id
user
items[
  {
    product
    quantity
  }
]
createdAt
updatedAt
```

---

# 🔗 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Products

```
GET /api/products
GET /api/products/:id
POST /api/products          (auth + admin)
PUT /api/products/:id      (auth + admin)
DELETE /api/products/:id   (auth + admin)
```

## Cart

```
GET /api/cart              (auth)
POST /api/cart             (auth)
PUT /api/cart/:productId   (auth)
DELETE /api/cart/:productId (auth)
DELETE /api/cart           (auth)
```

## Orders

```
POST /api/orders           (auth)
GET /api/orders/my-orders  (auth)
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js (LTS)
- npm
- MongoDB

---

## Clone the Repository

```bash
git clone https://github.com/SuadAbrar/mern-ecommerce-store.git
cd mern-ecommerce-store
```

---

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Run the Application

### Start Backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### Start Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🛣 Development Roadmap

### Phase 1 — Backend Foundation

- Express server setup
- MongoDB connection
- Authentication system

### Phase 2 — Product System

- Product API
- Product listing
- Product detail page

### Phase 3 — Cart System

- Add to cart
- Remove from cart
- Update quantity
- Cart state management

### Phase 4 — Checkout & Orders

- Order creation
- Order history
- Backend order storage

---

# 🚀 Future Improvements

Possible future enhancements include:

- Admin dashboard
- Product search and filtering
- Product reviews and ratings
- Payment gateway integration
- Order tracking system
- Email notifications
- Inventory management

---

# 📜 License

This project is developed for **educational and internship purposes** and demonstrates full-stack development using the MERN stack.
