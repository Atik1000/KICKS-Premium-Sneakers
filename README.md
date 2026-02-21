# KICKS Premium Sneakers

A modern e-commerce frontend built with Next.js 14 and integrated with the Platzi Fake Store API.

## 🚀 Features

- **Product Listing** – Landing page with products from API
- **Product Detail** – Single product page with add to cart
- **Categories** – Browse categories and filter products by category
- **Shopping Cart** – Add, remove, update quantity (local state)
- **Loading / Error / Empty states** – Proper UI states for all API requests
- **Responsive** – Mobile and desktop layouts
- **Redux + RTK Query** – Clean data fetching and state management

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Data Fetching:** RTK Query
- **Icons:** Lucide React

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔗 API

Uses [Platzi Fake Store API](https://fakeapi.platzi.com) (backend: `api.escuelajs.co`):

- Products: `GET /products`, `GET /products/:id`
- Categories: `GET /categories`, `GET /categories/:id`, `GET /categories/:id/products`

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Landing (products)
│   ├── cart/page.tsx
│   ├── categories/page.tsx
│   ├── categories/[id]/products/page.tsx
│   └── products/[id]/page.tsx
├── components/
│   ├── layout/               # Navbar, PageLayout
│   ├── products/             # ProductCard, ProductGrid
│   └── ui/                   # LoadingSpinner, ErrorState, EmptyState
├── store/
│   ├── api/productsApi.ts    # RTK Query endpoints
│   └── slices/cartSlice.ts
├── lib/api.ts                # API config
└── types/index.ts            # ApiProduct, ApiCategory, CartItem
```

## 📝 License

MIT

## 👤 Author

Atik1000

---

Built with ❤️ using Next.js
