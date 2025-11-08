# Nexora – Full-Stack E-Commerce Demo

Nexora is a full-stack e-commerce demo application built with React + Vite (frontend) and Express.js + MongoDB (backend). It supports user & seller authentication, product management, cart syncing, address management, and order placement (COD).

📁 Project Structure
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

![Nexora Screenshot](./assets/Screenshot33.png)


🚀 Features
Frontend (React + Vite)

- Product listing & details
- Cart add/remove with backend sync
- Address management
- Order placement (COD)
- Seller dashboard for product CRUD

Backend (Express + MongoDB)

- User & seller authentication (cookie JWT)
- Product CRUD with Cloudinary uploads
- Server-side cart storage
- Address storage

💻 Getting Started (Development)
Prerequisites

- Node.js ≥ 16
- npm or yarn
- MongoDB (local or Atlas)

1️⃣ Server Setup

Create a `server/.env` file (copy `server/.env.example` and fill the values):

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

```

Install and start:

```bash
cd server
npm install
npm run start
```

The server runs on `http://localhost:5000` by default (it reads `process.env.PORT || 5000`).

2️⃣ Client Setup

Create a `client/.env` file (copy `client/.env.example` and fill the value):

```
VITE_BACKEND_URL=http://localhost:5000
```

Install and start:

```bash
cd client
npm install
npm run dev
```

Vite runs on `http://localhost:5173` by default.



🧪 Smoke Test Checklist

- ✅ Server returns "Hello World!" at `/`
- ✅ Client loads product list
- ✅ User registration creates cookie
- ✅ Cart sync works
- ✅ Orders placed successfully

🌐 Deployment Notes

- Project contains Vercel config for both client and server (`server/vercel.json`, `client/vercel.json`).
- All environment variables must be configured on the hosting platform.
- webhook requires a publicly accessible URL (use ngrok for local testing or configure webhooks in your hosting platform).

📌 Useful File References

- Backend Entry: `server/server.js`
- Routes: `server/routes/*`
- Controllers: `server/controllers/*`
- Frontend Entry: `client/src/main.jsx`
- Axios & App Context: `client/src/context/Appcontext.jsx`



## Important environment variables (summary)

- MONGODB_URI — MongoDB connection prefix (server appends `/greencart` in `configs/db.js`).
- JWT_SECRET — Secret for signing JWT tokens stored in cookies.
- SELLER_EMAIL / SELLER_PASSWORD — Seller credentials used by the simple seller auth.
- CLOUDINARY_* — Required if you upload product images (used in `productController.js`).
- GEMINI_API_KEY — Optional: used by `geminiMCPServer.js` if you intend to run the MCP server.

## API summary (server)

Base URL: http://localhost:5000 (or your deployed server)

Auth & user:
- POST /api/user/register — body: { name, email, password } — registers user and sets cookie.
- POST /api/user/login — body: { email, password } — logs in user and sets cookie.
- GET /api/user/isauth — requires cookie; returns user info.
- GET /api/user/logout — clears cookie.

Seller:
- POST /api/seller/login — body: { email, password } — checks against SELLER_EMAIL/SELLER_PASSWORD.
- GET /api/seller/isauth — seller route check (cookie required).
- GET /api/seller/logout

Products:
- POST /api/product/add — seller-only; multipart/form-data: `productData` JSON string + image files (uses multer + cloudinary).
- GET /api/product/list — list all products.
- GET /api/product/:id — get product by id.
- POST /api/product/stock — seller-only, body: { id, inStock } — update stock.

Cart:
- POST /api/cart/update — requires user cookie; body: { cartItems } — saves cart server-side on user model.

Address:
- POST /api/address/addaddress — authenticated user; body: { address }
- GET /api/address/getaddress — authenticated user; returns addresses.

Orders:
- POST /api/order/cod — user; body: { items, address } — place Cash-on-Delivery order.
- POST /api/order/  — user; body: { items, address } — creates   checkout session and returns session url.
- POST /  (and /api/order/ /webhook) —   webhook endpoint(s) for payment events. The server uses webhook secret to verify events.
- GET /api/order/user — user orders
- GET /api/order/seller — seller view of orders

Notes on authentication:
- Authentication is cookie-based. Login POSTs set a `token` cookie containing a JWT signed with `JWT_SECRET`. Middlewares `authUser` and `authSeller` verify the cookie.

## Deployment notes

- `server/vercel.json` and `client/vercel.json` exist — the repo appears prepared for Vercel deployment with the server as a Node function.
- When deploying, set the same environment variables in your cloud environment (MongoDB URI, JWT secret, Cloudinary,   keys, Seller credentials).
- If using Vercel, ensure that server `vercel.json` points to `server.js` and the build environment installs dependencies for the server.

## Testing & smoke checks

- Start MongoDB and the server; visit `http://localhost:5000/` to confirm `Hello World!` response.
- Start the client dev server and confirm product list populates on the home page.
- Try registering a user and check cookies are set.

## Optional: Running the Gemini MCP server

- `server/geminiMCPServer.js` provides a small MCP server that uses Google Generative AI (Gemini) via the `@google/generative-ai` SDK. The file requires `GEMINI_API_KEY` in `.env` to run.
- Start it with `npm run mcp` from `server/` (script runs `nodemon geminiMCPServer.js`).


## Where to look in the code

- Server entry: `server/server.js`
- Server routes: `server/routes/*`
- Controllers: `server/controllers/*`
- Models: `server/models/*`
- Webhook & payments: `server/controllers/orderController.js`
- Client entry: `client/src/main.jsx`, app layout: `client/src/App.jsx`
- Client context & API usage: `client/src/context/Appcontext.jsx`

