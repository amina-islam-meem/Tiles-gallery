# TileGallery

**Live URL:** [https://tiles-gallery-silk.vercel.app]

## Project Purpose
TileGallery is a modern, responsive web application designed for browsing, discovering, and managing a curated collection of beautiful tiles. Whether for interior design inspiration or catalog management, users can easily navigate through tile collections, authenticate securely, and manage their personal profiles.

## Key Features
- **Secure Authentication:** Full registration and login system with email/password and Google Social Login.
- **Session Management:** Secure, persistent user sessions managed via cookies.
- **Profile Management:** Users can view their profile data and update their display name and profile picture URL.
- **Responsive Design:** A fully mobile-friendly UI built with Tailwind CSS, featuring a collapsible mobile navigation menu.
- **Dynamic Routing:** Protected routes that ensure only authenticated users can access their profiles, while redirecting logged-in users away from auth pages.
- **Toast Notifications:** Real-time user feedback for login, registration, and profile updates.

##  Technologies & Packages Used
This project was built using the Next.js App Router and utilizes several key npm packages:

- **Framework:** `next` (React framework for server-side rendering and routing)
- **UI Library:** `react`, `react-dom`
- **Styling:** `tailwindcss`, `postcss`, `autoprefixer`
- **Authentication:** 
  - `better-auth` (Comprehensive authentication framework)
  - `@better-auth/mongo-adapter` (Database adapter for Better Auth)
- **Database:** `mongodb` (NoSQL database for storing users and sessions)
- **Notifications:** `react-hot-toast` (For beautiful alert messages)
- **Animations:** `animate.css` (For smooth component entrance animations)
- **Icons:** `react-icons`
- **Carousels/Sliders:** `swiper`

##  How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amina-islam-meem/Tiles-gallery.git
   cd Tiles-gallery