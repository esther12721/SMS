# StockHub Ltd – Stock Management System (SMS)

Full-stack project (Node.js + Express + MongoDB + React + Tailwind CSS).

## Folder Structure
```
FirstName_LastName_National_Practical_Exam_2026/
├── backend-project/      # Node.js + Express + Mongoose API
├── frontend-project/     # React + Vite + Tailwind UI
├── ERD.md                # Entity Relationship Diagram
└── README.md
```

## Prerequisites
- Node.js 18+
- MongoDB running on `mongodb://localhost:27017`

## Run the Backend
```bash
cd backend-project
npm install
npm start
# API: http://localhost:5000
```

## Run the Frontend
```bash
cd frontend-project
npm install
npm run dev
# UI: http://localhost:5173
```

## Usage
1. Open http://localhost:5173
2. Click **Register** to create an account (username + password)
3. **Login** to access the dashboard
4. Use the sidebar to navigate: Dashboard, Product, Warehouse, Transactions, Reports, Logout

## Features
- **JWT Authentication** (register/login)
- **Product form** – INSERT
- **Warehouse form** – INSERT
- **Transactions** – INSERT, UPDATE, DELETE, RETRIEVE (full CRUD)
- **Reports** – Daily / Weekly / Monthly stock-in & stock-out + available stock
- Stock quantity auto-adjusts on each transaction
- Responsive Tailwind CSS UI

## Database (MongoDB - SMS)
Collections: `users`, `products`, `warehouses`, `stocktransactions`

## API Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login (returns JWT) |
| POST/GET | /api/products | Add / list products |
| POST/GET | /api/warehouses | Add / list warehouses |
| GET/POST/PUT/DELETE | /api/transactions | Full CRUD |
| GET | /api/reports/summary?period=daily\|weekly\|monthly | Stock movement |
| GET | /api/reports/stock | Available stock |
