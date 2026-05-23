# TechSync Backend — Express + MongoDB API

## Project Structure

```
techsync-backend/
├── server.js              # Entry point — Express app + MongoDB connect
├── .env.example           # Environment variable template
├── package.json
├── models/
│   ├── Product.js         # Product schema (title, category, pros, cons, rating, price, affiliateLink)
│   ├── Blog.js            # Blog schema (title, slug, content, relatedProducts, views)
│   └── Newsletter.js      # Newsletter subscriber schema
├── controllers/
│   ├── productController.js   # GET /products, GET /products/:slug, POST /:id/click
│   ├── blogController.js      # GET /blogs, GET /blogs/:slug (increments view count)
│   ├── newsletterController.js# POST /newsletter (subscribe with duplicate check)
│   └── contactController.js   # POST /contact (logs/emails form submission)
├── routes/
│   ├── products.js
│   ├── blogs.js
│   ├── newsletter.js
│   └── contact.js
├── middleware/
│   ├── errorHandler.js    # Global error handler middleware
│   └── rateLimiter.js     # express-rate-limit (100 req / 15 min)
└── services/
    └── seedData.js        # Seed script: run `node services/seedData.js`
```

## Quick Start

```bash
cd techsync-backend
npm install
cp .env.example .env    # Fill in MONGODB_URI and CLIENT_URL
npm run dev             # Development with nodemon
npm start               # Production
```

## API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | /api/products             | List products (filter: category, sort, search, page) |
| GET    | /api/products/:slug       | Get single product by slug           |
| POST   | /api/products/:id/click   | Track affiliate link click           |
| GET    | /api/blogs                | List published blogs (filter: category, page) |
| GET    | /api/blogs/:slug          | Get blog + increment views           |
| POST   | /api/newsletter           | Subscribe email                      |
| POST   | /api/contact              | Submit contact form                  |
| GET    | /health                   | Health check                         |

## Query Parameters

**GET /api/products**
- `category` — Filter by: Laptops, Accessories, Study Gadgets, Developer Setup
- `sort` — `-rating` (default), `price`, `-price`, `-clicks`
- `search` — Full-text search (uses MongoDB text index)
- `page`, `limit` — Pagination

**GET /api/blogs**
- `category` — Filter by category name
- `page`, `limit` — Pagination

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/techsync
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

## Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add environment variables from .env.example
6. Deploy!

## Database Indexes

Products: `{ category, rating }` compound + `{ slug }` unique + text index on title/description
Blogs: `{ slug }` unique + `{ category, createdAt }` compound

## Seed the Database

```bash
node services/seedData.js
```
