# Shreyansh Rai - Personal Portfolio 🚀

Welcome to the repository for my personal portfolio website! This platform serves as an interactive showcase of my professional journey, technical skills, projects, and experiences.

## ✨ Features

- **Immersive 3D Experiences**: Built with `Three.js` and `@react-three/fiber` for engaging 3D visuals.
- **Fluid Animations**: Utilizing `Framer Motion` for smooth page transitions and interactive element animations.
- **Responsive Design**: fully responsive UI powered by `Tailwind CSS`, ensuring a seamless experience across desktop and mobile devices.
- **Dynamic Routing**: Fast and smooth client-side routing using `React Router`.
- **Contact Form Integration**: A fully functional contact form powered by an Express backend and `Nodemailer`.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Email Service**: Nodemailer
- **Utilities**: CORS, dotenv

## 📂 Project Structure

```text
Portfolio/
├── client/          # React frontend application
│   ├── public/      # Static assets
│   └── src/         # React components, pages, styling, and 3D scenes
└── server/          # Express backend application
    └── src/         # API routes and server logic (e.g., mail sending)
```

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shreyansh2341/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies for the **client**:
   ```bash
   cd client
   npm install
   ```

3. Install dependencies for the **server**:
   ```bash
   cd ../server
   npm install
   ```

### Environment Variables

You will need to set up environment variables for the server. 
1. Navigate to the `server` directory.
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your details (e.g., SMTP credentials for Nodemailer).

### Running the Application

**Run the Backend Server:**
Open a terminal, navigate to the `server` directory, and run:
```bash
npm run dev
```
*(The server will start using `nodemon` on the port specified in your `.env`, usually 5000.)*

**Run the Frontend Client:**
Open a new terminal, navigate to the `client` directory, and run:
```bash
npm run dev
```
*(The Vite development server will start, usually on `http://localhost:5173`.)*

## 📬 Contact

- **Name:** Shreyansh Rai
- **GitHub:** [@shreyansh2341](https://github.com/shreyansh2341)

---
*Feel free to explore the code and reach out if you have any questions!*
