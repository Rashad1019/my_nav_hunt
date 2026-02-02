# Job Hunt OS 🎯

> **Your Personal Command Center for Career Conquest.**
> Track leads, manage applications, and land your dream job with a premium, focused interface.

![Job Hunt OS Preview](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3)
*(Placeholder image - replace with a screenshot of your actual dashboard)*

## ✨ Features

- **🔥 Visual Pipeline**: A Kanban-style board to drag leads from *Discovered* → *Applied* → *Interviewing* → *Offer*.
- **☁️ Cloud Sync (Firebase)**: Your data lives in the cloud. Access your leads from your laptop, phone, or tablet seamlessly.
- **🎨 Glassmorphism UI**: A modern, dark-mode-first design with smooth animations and blur effects.
- **⚡ Instant Search**: Filter through hundreds of applications instantly.
- **📱 Responsive**: Optimized for desktop war rooms and on-the-go mobile checks.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS (Custom Design System).
- **Backend/Database**: Firebase Firestore (Real-time NoSQL).
- **Icons**: Lucide React.

## 🚀 Getting Started

### Prerequisites

You need `Node.js` installed and a **Firebase Project**.

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/Rashad1019/my_nav_hunt.git
    cd my_nav_hunt
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and add your Firebase config keys:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## 📦 Deployment

### Vercel (Recommended)

1.  Push this repo to GitHub.
2.  Import the project into Vercel.
3.  **CRITICAL STEP**: In Vercel Project Settings > **Environment Variables**, paste all the values from your local `.env` file.
4.  Deploy!

---

*Built with Vibe Coding.*
