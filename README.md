# 🍽️ MenuCraft - Menu & Price Manager Web App

A lightweight, high-performance web application for restaurant managers to update prices, add new dishes, toggle stock availability, and preview live customer menus. Fully responsive across laptops, tablets, and mobile devices. Ready for 1-click deployment on **Vercel** with database persistence.

---

## 🌟 Key Features

- **⚡ Instant Inline Price Editing**: Click any price to edit directly, or use quick adjustment steppers (`+$0.50`, `-$0.50`).
- **➕ Add & Edit Dishes**: Full modal form with category selection, price input, dietary tags (Vegetarian 🌱, Spicy 🌶️, Chef's Special ⭐), and preset photos.
- **🔄 Availability Toggle**: One-click stock switch (`In Stock` vs `Sold Out`).
- **📱 Laptop & Mobile Responsive**: Single-column compact cards on mobile, multi-column grid & stats summary on laptop.
- **👁️ Live Customer View**: Toggle preview mode to experience how customers see the digital menu.
- **💾 Database Storage**: Powered by Prisma ORM (SQLite locally out-of-the-box, easily configurable for PostgreSQL / Vercel Postgres on Vercel).

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database & Seed Sample Data
```bash
# Push Prisma schema to create local SQLite database
npx prisma db push

# Seed the database with sample restaurant dishes
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ How to Deploy to Vercel

### Method 1: Deploy with Vercel Postgres (Recommended)

1. **Push to GitHub**:
   Upload this repository to GitHub.

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com) and click **"Add New" > "Project"**.
   - Import your GitHub repository.

3. **Add Database Storage**:
   - In the Vercel Project Dashboard, navigate to the **Storage** tab.
   - Click **"Create Database"** and select **"Vercel Postgres"** (or connect a **Neon / Supabase** PostgreSQL database).
   - Vercel automatically configures the `DATABASE_URL` environment variable for your project!

4. **Update `prisma/schema.prisma` for Production Postgres**:
   Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma` before deploying to Postgres.

5. **Deploy**:
   Click **Deploy**. Vercel will automatically run `prisma generate && next build` and launch your live app!

---

## 📁 Project Structure

```
menu-manager/
├── prisma/
│   └── schema.prisma        # Database schema for MenuItem
├── scripts/
│   └── seed.mjs             # Seed database script
├── src/
│   ├── app/
│   │   ├── api/menu/        # GET, POST API routes
│   │   ├── api/menu/[id]/   # PATCH, DELETE API routes
│   │   ├── globals.css      # Custom styling design system
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page dashboard
│   ├── components/
│   │   ├── CategoryTabs.tsx # Category navigation tabs
│   │   ├── CustomerView.tsx # Read-only digital customer menu view
│   │   ├── ItemModal.tsx    # Add / Edit item modal
│   │   ├── MenuItemCard.tsx # Menu item card with price steppers
│   │   ├── Navbar.tsx       # Header navigation & search bar
│   │   ├── StatsBanner.tsx  # Quick summary analytics header
│   │   └── Toast.tsx        # Notification toasts
│   ├── lib/
│   │   └── prisma.ts        # Prisma client singleton
│   └── types/
│       └── menu.ts          # TypeScript interfaces
├── vercel.json              # Vercel deployment config
└── README.md
```
