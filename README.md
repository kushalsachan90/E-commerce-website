# 🛒 E-Commerce Platform

A production-grade e-commerce application with a product catalog, shopping cart, authentication, and order management. Built with a React.js frontend and a single Node.js/Express backend service, backed by MongoDB.

> Rename this to your actual project name at the top before publishing.

---

## 📌 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Backend Modules](#-backend-modules)
- [System Design Highlights](#-system-design-highlights)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running with Docker](#-running-with-docker)
- [API Overview](#-api-overview)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🚀 Features

- 🔐 **JWT-based authentication** with access + refresh tokens and role-based access control (Admin / Customer)
- 📦 **Product catalog** with browsing, filtering, and search
- 🛒 **Shopping cart** with add/update/remove functionality
- 📑 **Order management** covering the full order lifecycle (placed → processed → completed)
- 🎨 **Responsive React.js frontend** built with Redux, React Router, and Tailwind CSS
- 🗃️ **MongoDB + Mongoose** with indexing strategies applied to high-traffic query fields
- 🐳 **Dockerized** for consistent development and deployment

---

## 🏗️ Architecture

The application follows a simple **client-server architecture**: a React.js frontend communicates with a single Express.js backend, which handles authentication, product catalog, cart, and order management, and talks to a single MongoDB database.

```
        ┌───────────────────────┐
        │   React.js Frontend    │
        │ (Redux, React Router,  │
        │      Tailwind CSS)     │
        └───────────┬───────────┘
                    │  REST API
          ┌─────────▼──────────┐
          │   Express.js Backend │
          │ ─────────────────── │
          │  Auth module (JWT,   │
          │  RBAC)               │
          │  Product module      │
          │  Cart module         │
          │  Order module        │
          └─────────┬──────────┘
                    │
             ┌──────▼───────┐
             │   MongoDB     │
             │ (Mongoose,    │
             │  indexed)     │
             └───────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux, React Router, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (access + refresh tokens), RBAC |
| Containerization | Docker |

---

## 🧩 Backend Modules

The backend is a single Express.js service, organized internally into modules by responsibility:

### 1. Auth Module
- Handles registration/login for admin and customer roles
- Issues short-lived access tokens and long-lived refresh tokens
- Middleware validates JWTs and enforces role-based access control on protected routes

### 2. Product Module
- Manages the product catalog: creation, updates, categories, and search/filtering
- Admin-only routes for inventory management
- Indexed fields (e.g., category, name, price) for fast catalog queries

### 3. Cart Module
- Add/update/remove items in a customer's cart
- Cart persisted per user in MongoDB

### 4. Order Module
- Converts a cart into an order and manages the order lifecycle
- Persists order history per customer
- Indexed on fields like `userId` and `status` for efficient lookups

---

## 🧠 System Design Highlights

- **Modular monolith**: Auth, product, cart, and order logic are separated into clean modules/routers within one backend, keeping the codebase organized without the operational overhead of a distributed system.
- **RBAC**: Shared auth middleware validates JWTs and separates admin-only actions (e.g., managing products) from customer actions (e.g., placing orders).
- **Indexing strategy**: Mongoose schemas apply indexes on frequently queried fields (product category/name, order status/userId) to keep read latency low as data scales.
- **Token refresh flow**: Short-lived access tokens paired with long-lived refresh tokens balance security with a smooth logged-in experience.

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (optional, for containerized setup)
- [MongoDB](https://www.mongodb.com/) (or use a containerized instance)

### Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

And in the `frontend` directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## 🐳 Running with Docker

If you have a `docker-compose.yml` set up for the project:

```bash
docker-compose up --build
```

This spins up the backend, MongoDB, and the frontend together.

Otherwise, run manually:

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in a separate terminal)
cd frontend
npm start
```

---

## 📖 API Overview

| Module | Sample Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh` |
| Product | `GET /api/products`, `GET /api/products/:id`, `POST /api/products` (admin-only) |
| Cart | `GET /api/cart`, `POST /api/cart`, `DELETE /api/cart/:itemId` |
| Order | `POST /api/orders`, `GET /api/orders/:id`, `GET /api/orders/user/:userId` |

> Full API documentation (Postman collection / OpenAPI spec) can be added under `/docs`.

---

## 🔮 Future Improvements

- Payment gateway integration (Razorpay/Stripe)
- Redis caching for product listings and session storage
- Search functionality with Elasticsearch
- CI/CD pipeline with GitHub Actions
- Centralized logging and monitoring

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

### 👤 Author

**Kushal Sachan**
Full Stack Developer | CS Undergraduate
[LinkedIn](#) • [Portfolio](#) • [GitHub](#)
