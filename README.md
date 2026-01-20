# 🎭 Curtain Call – Booking Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Curtain Call** is a modern theater booking platform with Stripe payment integration, Clerk authentication, and a fully-featured admin dashboard. Users can book seats, pay securely, and track their bookings, while admins can manage shows, bookings, and news/announcements.  

Live Demo: [INSERT_LIVE_URL_HERE]  

---

## 📹 Video / GIF Presentation

🎬 **Demo Video:** [INSERT_VIDEO_LINK_HERE]  

Alternatively, replace screenshots below with **GIFs** showing interactions: booking flow, admin dashboard, or modal actions.

---

## 🖼 Screenshots / GIFs

| User Booking Flow | Admin Dashboard |
|-----------------|----------------|
| ![User Booking](path/to/user-booking.gif) | ![Admin Dashboard](path/to/admin-dashboard.gif) |

| Admin News Management | Show Management |
|----------------------|----------------|
| ![Admin News](path/to/admin-news.gif) | ![Admin Shows](path/to/admin-shows.gif) |

> Replace `path/to/...` with GIFs or video thumbnails. Clicking can link to video playback if you host them externally.  

---

## 🏗 Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Authentication:** Clerk  
- **Payments:** Stripe Checkout + Webhook  
- **Deployment:** TBD (Vercel/Netlify for frontend, Railway/Render for backend)  

---

## 🛠 Features

### **User-Facing Features**

- Browse shows and select seats  
- Temporary seat hold during checkout  
- Stripe checkout with automatic confirmation via webhook  
- View all future bookings with detailed info  
- Responsive and modern UI  

### **Admin Dashboard**

- **Bookings:** View all bookings, filter by date, pagination  
- **Shows:** Manage active/upcoming shows  
- **News/Announcements:**  
  - Add, view, delete news in a modal-based table  
  - Single-page management, click-to-view details  
- **Statistics:** Total bookings, revenue, active shows, total users  

### **Payment Flow**

1. User selects show & seats  
2. Seats held temporarily in backend  
3. Stripe Checkout session initiated  
4. Webhook confirms payment  
5. Seats marked as occupied & booking created  

---

## 💻 Backend Models

### **ShowTime**
- `showId` → Reference to Show  
- `showDateTime`  
- `showPrice`  
- `occupiedSeats` → Object mapping seat → userId  
- `temporaryHolds` → Object mapping seat → { userId, expiresAt }  

### **Booking**
- `user` → ObjectId reference  
- `showTime` → ObjectId reference  
- `bookedSeats` → Array of strings  
- `amount`, `isPaid`, `paymentIntentId`  

### **News**
- `title`, `description`, `image`, `isActive`, `date`  

---

## ⚡ Key Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/booking/create-stripe-session` | POST | Create Stripe checkout session |
| `/api/booking/confirm-webhook` | POST | Webhook to confirm payment |
| `/api/admin/all-bookings` | GET | Admin: fetch all bookings |
| `/api/news` | GET | Fetch active news |
| `/api/news` | POST | Admin: create news |
| `/api/news/:id` | DELETE | Admin: delete news |

> All admin routes are protected with `requireAuth()` + `userIsAdmin()`.

---

## 💻 Installation & Local Setup

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/curtain-call.git
cd curtain-call

# Install dependencies
npm install

# Environment Variables (.env)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_BOOKING_SECRET=your_webhook_secret
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_uri

# Run backend
npm run dev

# Run frontend (Vite)
cd client
npm run dev
