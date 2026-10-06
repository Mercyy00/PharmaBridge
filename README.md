# 🏥 PharmaBridge — Pharmaceutical Supply & Compliance Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**PharmaBridge** is a modern, responsive digital supply-chain and pharmaceutical distribution portal designed to bridge manufacturers, distributors, healthcare providers, and pharmacies. Built with React 19, React Router, and Bootstrap 5.

---

## 🌟 Key Features

- **🔐 Role-Based Authentication & Protected Routes**: Secure login, session management via React Context (`AuthContext`), and protected administrative workflows.
- **📊 Admin Dashboard**: Real-time management of pharmaceutical inventory, orders, compliance tracking, and distribution metrics.
- **💊 Catalog & Smart Filtering**: Dynamic medicine and equipment browsing with multi-tier category filters, dosage search, and availability indicators.
- **📑 Regulatory & Compliance Management**: Dedicated compliance verification modules for medical distribution standards and certifications.
- **📩 Inquiries & Order Requests**: Direct enquiry pipeline with dynamic forms for bulk procurement and distributor partnerships.
- **📱 Fully Responsive UI**: Optimized for desktops, tablets, and mobile devices using Bootstrap 5 grid and modern CSS styling.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React DOM, React Router v7
- **Styling**: Bootstrap 5.3, Bootstrap Icons, Custom Modern CSS
- **Build Tool**: Vite, Oxlint

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mercyy00/PharmaBridge.git

# 2. Navigate to project directory
cd PharmaBridge

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to explore the platform.

### Building for Production

```bash
npm run build
```

---

## 📂 Project Structure

```
PharmaBridge/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   ├── context/            # React AuthContext & Global state
│   ├── data/               # Product database & catalog fixtures
│   ├── pages/              # Views (AdminDashboard, Compliance, Enquiry, etc.)
│   ├── App.jsx             # Route definitions & application wrapper
│   └── main.jsx            # Entrypoint
├── package.json
└── vite.config.js
```

---

## 👨‍💻 Author

**Jayesh ([@Mercyy00](https://github.com/Mercyy00))**  
Fullstack Developer & AI Vibe Coder
