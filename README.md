# 🛍️ StreetSupply – A B2B Supply Chain Platform for Street Food Vendors

Welcome to **StreetSupply**, a two-sided web application that connects **street food vendors** with **local suppliers** to streamline sourcing, communication, and delivery of ingredients and supplies. Built using **React** and **TailwindCSS**, this project is designed for rapid prototyping and MVP deployment.

---

## 🚀 Features

### 👥 Two User Roles

- **Vendor**
  - Register & Login
  - Browse suppliers and available products
  - Add items to cart and place orders
  - Provide delivery address at checkout

- **Supplier**
  - Register & Login
  - Access a dedicated dashboard
  - Add, edit, and delete product listings
  - Update product stock and pricing in real time

---

### 🧩 Component Architecture

| Component           | Description                                               |
|---------------------|-----------------------------------------------------------|
| `RoleSelect.jsx`    | Choose user type: Vendor or Supplier                      |
| `VendorRegister.jsx`| Vendor registration form                                  |
| `VendorLogin.jsx`   | Vendor login form                                         |
| `SupplierRegister.jsx` | Supplier registration form (no product listing)       |
| `SupplierLogin.jsx` | Supplier login form                                       |
| `SupplierDashboard.jsx` | Product management dashboard (add/update/delete)     |
| `SupplierList.jsx`  | Vendor view: search and browse supplier products          |
| `CartPage.jsx`      | View selected items, enter delivery address, place order  |
| `OrderConfirmation.jsx` | Confirmation after successful checkout              |
| `Navbar.jsx`        | Global navigation with anchor links                       |
| `HeroSection.jsx`   | Marketing headline with CTA buttons                       |
| `HowItWorks.jsx`    | Explains workflow in steps                                |
| `WhyUs.jsx`         | Key advantages of StreetSupply                            |
| `CTASection.jsx`    | Call-to-action to encourage signup                        |
| `ContactSection.jsx`| Emails & phone numbers for contact                        |
| `Footer.jsx`        | Static footer with links                                  |

---

## 🔐 Authentication Flow

### Supplier Flow:

1. ✅ Register via `/register/supplier`
2. 🔑 Login via `/login/supplier`
3. 📦 Land on `/supplier-dashboard`
4. ➕ Add products, update stock, manage listings

### Vendor Flow:

1. ✅ Register via `/register/vendor`
2. 🔑 Login via `/login/vendor`
3. 🛍️ Browse via `/suppliers`
4. 🧾 Add to cart, place orders via `/cart`

---

## 🔗 Routing Structure

| Path                     | Component              |
|--------------------------|------------------------|
| `/`                      | Landing Page           |
| `/role-select`           | Choose role (vendor/supplier) |
| `/register/vendor`       | Vendor registration    |
| `/login/vendor`          | Vendor login           |
| `/register/supplier`     | Supplier registration  |
| `/login/supplier`        | Supplier login         |
| `/supplier-dashboard`    | Supplier product manager |
| `/suppliers`             | Vendor: browse products |
| `/cart`                  | Vendor: cart + checkout |
| `/order-confirmation`    | Order confirmation     |

---

## 💻 Tech Stack

- ⚛️ **React** — Component-based frontend
- 💨 **Tailwind CSS** — Utility-first styling
- 🧭 **React Router DOM** — Page navigation
- 📦 `useState` & `useReducer` — Mock in-memory state
- 📜 `react-scroll` — Smooth scroll between sections
- 🧪 Optional: Add a backend (Node.js/Express) in future

---

## ✨ Highlights

- 🔄 Role-based routing
- 📦 Realistic supplier dashboard
- 🛒 Functional vendor ordering flow
- 📱 Fully responsive design
- 💬 WhatsApp support button (optional)
- 📈 Designed for MVP/hackathon use cases

---

## 📸 Screenshots (Optional)

> Add screenshots of:
> - Landing Page
> - Vendor flow
> - Supplier Dashboard
> - Cart & Order flow

---

## 📬 Contact

📧 Emails:  
- ronakbhambu@gmail.com  
- bhargavbarewar18@gmail.com  

📞 Phone Numbers:  
- 7041591447  
- 9673511080  

---

## 🛠️ Setup Instructions

1. Clone the repo  
```bash
git clone https://github.com/your-username/streetsupply.git
cd streetsupply
