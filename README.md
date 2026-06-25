# CurtainCall

**A full-stack theatre and live events booking platform** with real-time seat selection, Stripe payments, and a complete admin dashboard.

🔗 **Live Demo:** [curtain-call-front.vercel.app](https://curtain-call-front.vercel.app)  
📹 **Admin Walkthrough:** [INSERT_LOOM_LINK]

> ⚠️ **Testing Payments:** This app uses Stripe in **test mode**. Do not use a real card.  
> Use Stripe's test card: `4242 4242 4242 4242` · Expiry: any future date · CVC: any 3 digits

---

## Overview

CurtainCall lets users browse shows, select seats in real time, and complete purchases through Stripe Checkout. An admin dashboard allows full management of shows, showtimes, bookings, and news announcements.

Built as a portfolio project to demonstrate a production-grade full-stack architecture with third-party integrations.

---

## Tech Stack

**Frontend**
- React 19 + Vite 7
- Tailwind CSS v4 + DaisyUI
- Clerk (authentication)
- React Router DOM v7
- Swiper, React Player, React Hot Toast, React Icons

**Backend**
- Node.js 22 + Express 5
- MongoDB + Mongoose
- Clerk Express SDK
- Stripe (Checkout + Webhooks)
- Inngest (Clerk user sync via webhooks)

**Deployment**
- Frontend → Vercel
- Backend → Vercel (serverless)
- Database → MongoDB Atlas

---

## Features

### User
- Browse active and upcoming shows
- View show details, cast, genres, tagline
- Select seats with real-time 15-minute hold
- Stripe Checkout with webhook confirmation
- View booking history filtered by all / today / upcoming / past
- Add shows to favourites
- Dark cinematic responsive UI

### Admin
- Dashboard with stats — total bookings, revenue, active shows, users
- Add and edit shows
- Activate / deactivate shows
- Manage showtimes and pricing per show
- View and filter all bookings with date range and pagination
- Manage news and announcements
- View upcoming shows

---

## Payment Flow

```
User selects seats
      ↓
Seats temporarily held (15 min) in backend
      ↓
Stripe Checkout session created
      ↓
User completes payment on Stripe
      ↓
Stripe webhook fires → seats marked occupied → booking created
```

---

## Local Setup

### Prerequisites
- Node.js 22.x
- MongoDB Atlas account
- Clerk account
- Stripe account

### Clone & Install

```bash
git clone https://github.com/ajkacca457/curtain-call.git
cd curtain-call

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

**server/.env**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_BOOKING_SECRET=your_stripe_webhook_booking_secret
FRONTEND_URL=http://localhost:5173
```

**client/.env**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=€
VITE_API_BASE_URL=http://localhost:5000
```

### Run

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

---

## Project Structure

```
curtain-call/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components + admin
│   │   ├── context/        # AppContext, AdminContext
│   │   ├── pages/          # Route-level pages
│   │   ├── api/            # Axios instance
│   │   └── lib/            # Utilities
│   └── public/
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── middlewares/        # Auth, error handling
│   ├── inngest/            # Clerk user sync functions
│   └── config/             # DB connection
└── README.md
```

---

## Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shows/active-shows` | Get all active shows |
| GET | `/api/shows/featured` | Get featured shows |
| GET | `/api/shows/upcoming-shows` | Get upcoming shows |
| GET | `/api/shows/:id` | Get single show |
| GET | `/api/shows/showtime/:showId` | Get showtimes for a show |
| POST | `/api/booking/hold-seats` | Temporarily hold seats |
| POST | `/api/booking/create-stripe-session` | Create Stripe checkout session |
| GET | `/api/booking/my-bookings` | Get current user bookings |
| GET | `/api/booking/seats/:showTimeId` | Get occupied seats |
| GET | `/api/admin/dashboard` | Admin dashboard stats |
| GET | `/api/admin/all-bookings` | Admin: all bookings |
| GET | `/api/admin/all-shows` | Admin: all shows with showtimes |
| POST | `/api/admin/` | Admin: create show |
| PUT | `/api/admin/shows/:id` | Admin: update show |
| POST | `/api/admin/show-time` | Admin: create showtime |
| PATCH | `/api/shows/toggle-active/:id` | Admin: toggle show active status |
| GET | `/api/news` | Get active news |
| GET | `/api/trailers` | Get all trailers |

---

## Data Models

**Show**
```
title, overview, poster_path, backdrop_path
genres          → Array
casts           → Array
release_date    → Date
tagline, original_language
vote_average, vote_count, runtime
isActive        → Boolean (default: true)
isFeatured      → Boolean (default: false)
```

**ShowTime**
```
showId          → ref: Show
showDateTime    → Date
showPrice       → Number
occupiedSeats   → { seatId: userId }
temporaryHolds  → { seatId: { userId, expiresAt } }
```

**Booking**
```
user            → Clerk userId (String)
showTime        → ref: ShowTime
bookedSeats     → [String]
amount          → Number
isPaid          → Boolean
paymentIntentId → String
```

**User**
```
_id             → Clerk userId (String)
name            → String
email           → String (unique)
image           → String
```

**News**
```
title, description
date            → Date (default: now)
image           → String (optional)
isActive        → Boolean (default: true)
```

**Trailer**
```
showId          → ref: Show
title, thumbnail, videoUrl
releaseDate     → Date
```

---

## Known Limitations / Future Plans

- [ ] Tests (unit + integration)
- [ ] Contact form submission
- [ ] Newsletter subscription
- [ ] Interactive navbar scroll behaviour
- [ ] TypeScript migration

---

## Author

**Avijit Karmaker**  
[GitHub](https://github.com/ajkacca457) · [Portfolio](https://avijitkarmaker.com)

---

## License

MIT