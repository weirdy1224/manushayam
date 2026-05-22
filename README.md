# 🌿 ManushyaM — Ancient Ayurvedic E-Commerce Platform

ManushyaM is a premium, production-ready full-stack e-commerce web application showcasing handcrafted Ayurvedic hair therapies. Prepare using a **5000-year-old Kashayam process**, these natural remedies are integrated into a modern shopping experience featuring secure authentication, cart workflows, mock payments, live tracking, and an administrative inventory control center.

---

## ✨ Features

### 🛒 E-Commerce & Customer Journey
- **🌸 Modern & Premium Design**: Elegant golden-cream aesthetic with smooth framer-motion micro-interactions and transitions (100% emoji-free layout).
- **🛍️ Complete Shopping Cart**: Dynamically add remedies to the cart, edit quantities, and track cart badges natively.
- **💳 Secure Checkout (Mock Razorpay & COD)**: Simulates Razorpay secure UPI/Card transactions and physical Cash-on-Delivery payment selection.
- **📦 Real-time Order Tracking**: Dynamic timeline tracking page displaying "Processing", "Shipped", and "Delivered" milestones.
- **🔍 Guest Order Tracking**: Guests can track their orders by inputting their unique Order ID (e.g. `MSY-123456`) which queries the backend securely.

### 👤 Session Management & Security
- **🔑 Customer Authentication**: Secure login and account registration pages with password length and matching checks.
- **dropdown Profile Dropdown Menu**: A hover and touch-friendly header dropdown greeting users, linking to dashboards, and supporting secure logouts.
- **🔒 Secured Order Fetches**: Restricts database queries based on roles; guest accounts fetch no orders, customers retrieve only their own transactions, and admins load all orders.

### 🛡️ Administrative Portal
- **📈 Order Management**: Real-time order fulfillment board enabling administrators to toggle customer order timelines between Processing, Shipped, and Delivered.
- **🖼️ Product Inventory (Multipart Image Uploads)**: Add products to the catalog using local image file selection processed securely via Multer.
- **🗑️ Dynamic Deletion Sync**: Deleting custom products automatically purges associated static image files from the local disk.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/), [React Router DOM v7](https://reactrouter.com/)
- **Frontend Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend API**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database Engine**: [MongoDB](https://www.mongodb.com/) (using [Mongoose ODM](https://mongoosejs.com/))
- **File Processing**: [Multer](https://github.com/expressjs/multer)
- **Tooling**: [Vite](https://vite.dev/), [Concurrently](https://github.com/open-cli-tools/concurrently)

---

## 📂 Project Structure

```text
manushayam/
├── server/                 # Express Backend Server
│   ├── models/             # Mongoose Schemas (User, Product, Order)
│   ├── uploads/            # Local directory for uploaded product images
│   ├── db.js               # Database connection lifecycle helper
│   ├── upload.js           # Multer disk-storage & MIME configuration
│   └── server.js           # Main Express server and API endpoints
├── src/                    # React Frontend App
│   ├── components/         # Global Layout Components (Navbar, Footer, Loader)
│   ├── context/            # Global E-commerce State Manager (AppContext)
│   ├── pages/              # View Screens (Home, Solutions, ProductDetails, Cart, Checkout, Orders, Admin, Login, Faq, About)
│   ├── index.css           # Vanilla CSS custom design token variables
│   └── main.jsx            # React root mount template
├── index.html              # HTML shell
├── vite.config.js          # Vite config with API and static upload proxies
└── package.json            # Scripts and dependencies
```

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (v18.0.0 or higher is recommended).
2. Install [MongoDB Compass](https://www.mongodb.com/products/tools/compass) or ensure a local MongoDB service is active at `mongodb://127.0.0.1:27017`.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/manushayam.git
   cd manushayam
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   *This starts both the Vite dev server (on port `5173`) and the Express Node server (on port `5000`) concurrently. Requests are automatically proxied.*

4. **Access the Application**:
   - Open your browser to `http://localhost:5173`.
   - Admin credentials for managing catalog items:
     - **Email**: `admin@manushayam.com`
     - **Password**: `admin123`

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌿 Our Philosophy

We prepare premium remedies with:
- **Ethical Sourcing**: Handpicked premium herbs and nourishing oils.
- **Mindful Formulation**: Handcrafted in small batches with respect for the environment.
- **Transparency**: Clear, honest, and chemical-free ingredient disclosures.
- **Holistic Care**: Therapies that balance strength, scalp health, and natural radiance.
