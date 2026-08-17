# Ilham Portfolio

A professional personal portfolio website built with the **MERN stack** (MongoDB, Express, React, Node.js).

## Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS v4
- Framer Motion
- React Router DOM
- Axios

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication (future)
- Nodemailer

## Project Structure

```text
portfolio/
├── client/          # React frontend
├── server/          # Express backend
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd portfolio
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `client/` and `server/`
   - Fill in your values

### Running the Project

**Frontend** (runs on http://localhost:5173):
```bash
cd client
npm run dev
```

**Backend** (runs on http://localhost:5000):
```bash
cd server
npm run dev
```

## License

MIT
