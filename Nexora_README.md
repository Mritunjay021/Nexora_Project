# 🛒 Nexora – Full-Stack E-Commerce Demo

Nexora is a full-stack e-commerce demo application built with **React + Vite (frontend)** and **Express.js + MongoDB (backend)**.  
It supports user & seller authentication, product management, cart syncing, address management, and order placement (COD + Stripe payments).

---

## 📸 Preview

Here’s a glimpse of the **Nexora UI**:

![Nexora Screenshot](./assets/Screenshot (33).png)

> 🖼️ *To display your website’s screenshot:*  
> - Create an `assets` folder at the root of your project (same level as `client` and `server`)  
> - Save your screenshot inside it (e.g. `nexora_screenshot.png`)  
> - Adjust the image path above if necessary.

---

## 📁 Project Structure
```
Nexora_Project/
│
├── client/        # React + Vite frontend
│   └── src/       # Pages, components, contexts
│
└── server/        # Express backend
    ├── server.js
    ├── configs/          # DB, Cloudinary, Multer
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middlewares/
```

---

## 🚀 Features

### 🖥️ Frontend (React + Vite)
- Product listing & details  
- Cart add/remove with backend sync  
- Address management  
- Order placement (COD + Stripe)  
- Seller dashboard for product CRUD  

### ⚙️ Backend (Express + MongoDB)
- User & seller authentication (cookie JWT)  
- Product CRUD with Cloudinary uploads  
- Server-side cart storage  
- Address storage  
- Order processing with Stripe  

---

## 💻 Getting Started (Development)

### 🧩 Prerequisites
- Node.js ≥ 16  
- npm or yarn  
- MongoDB (local or Atlas)

### 1️⃣ Server Setup

Create a `server/.env` file (copy `server/.env.example` and fill in values):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret
NODE_ENV=development

SELLER_EMAIL=seller@example.com
SELLER_PASSWORD=secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Install and start:

```bash
cd server
npm install
npm run start
```

The server runs on **http://localhost:5000** by default.

---

### 2️⃣ Client Setup

Create a `client/.env` file:

```
VITE_BACKEND_URL=http://localhost:5000
```

Install and start:

```bash
cd client
npm install
npm run dev
```

The client runs on **http://localhost:5173** by default.

---

## 🧪 Smoke Test Checklist
- ✅ Server returns "Hello World!" at `/`
- ✅ Client loads product list
- ✅ User registration creates cookie
- ✅ Cart sync works
- ✅ Orders placed successfully


---

## 🌐 Deployment Notes
- Project contains Vercel config for both client and server (`server/vercel.json`, `client/vercel.json`)
- All environment variables must be configured on the hosting platform
- Stripe webhook requires a publicly accessible URL (use **ngrok** for local testing or configure webhooks in production)

---

## 📌 Useful File References
- Backend Entry: `server/server.js`
- Routes: `server/routes/*`
- Controllers: `server/controllers/*`
- Frontend Entry: `client/src/main.jsx`
- App Context: `client/src/context/Appcontext.jsx`

---

## 🧠 Important Environment Variables
| Variable | Description |
|-----------|--------------|
| `MONGODB_URI` | MongoDB connection prefix |
| `JWT_SECRET` | JWT signing secret |
| `SELLER_EMAIL` / `SELLER_PASSWORD` | Seller credentials |
| `CLOUDINARY_*` | Cloudinary credentials for image uploads |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Stripe payment keys |
| `GEMINI_API_KEY` | Optional key for Gemini MCP server |

---

## 📡 API Summary (Server)
**Base URL:** `http://localhost:5000`

### Auth & User
- `POST /api/user/register` — register new user  
- `POST /api/user/login` — login user  
- `GET /api/user/isauth` — check auth via cookie  
- `GET /api/user/logout` — logout user  

### Seller
- `POST /api/seller/login` — seller login  
- `GET /api/seller/isauth` — verify seller session  
- `GET /api/seller/logout` — logout seller  

### Products
- `POST /api/product/add` — add product (seller-only)  
- `GET /api/product/list` — get all products  
- `GET /api/product/:id` — get product by ID  
- `POST /api/product/stock` — update stock (seller-only)

### Cart
- `POST /api/cart/update` — save user cart

![Nexora Screenshot](./assets/Screenshot (35).png)

### Address
- `POST /api/address/addaddress` — add address  
- `GET /api/address/getaddress` — get saved addresses

### Orders
- `POST /api/order/cod` — place COD order  
- `POST /api/order/stripe` — Stripe checkout  
- `GET /api/order/user` — user orders  
- `GET /api/order/seller` — seller orders  
- `POST /stripe` — Stripe webhook endpoint

![Nexora Screenshot](./assets/Screenshot (36).png)

---

## 🧩 Authentication Notes
- Cookie-based JWT authentication  
- `authUser` & `authSeller` middlewares verify cookies  

---

## 🚀 Deployment Notes
- Both `server` and `client` are ready for **Vercel** deployment  
- Set all environment variables in your cloud environment  
- Ensure `vercel.json` points correctly to the server entry file  

---

## 🧪 Testing
- Start MongoDB and server  
- Visit `http://localhost:5000/` → see “Hello World!”  
- Run client and confirm product list & checkout flow  

---

## 🤖 Optional: Gemini MCP Server
- File: `server/geminiMCPServer.js`  
- Requires `GEMINI_API_KEY`  
- Run with:
  ```bash
  cd server
  npm run mcp
  ```

---

## 🗂️ Key Code References
- **Server:** `server/server.js`, `server/routes/*`, `server/controllers/*`  
- **Client:** `client/src/main.jsx`, `client/src/App.jsx`, `client/src/context/Appcontext.jsx`  
- **Payment Logic:** `server/controllers/orderController.js`

---

## 🪪 License
This project is licensed under the **MIT License**.
