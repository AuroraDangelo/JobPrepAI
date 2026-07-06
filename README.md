# JobPrepAI

JobPrepAI is a full-stack web application designed to help users prepare for technical interviews with AI-powered assistance. It provides secure user authentication and aims to become a complete platform for interview preparation, coding practice, and AI-based guidance.

This project is currently under active development, and new features are being added regularly.

---

## Features

- Secure user registration and login
- JWT authentication using HTTP-only cookies
- Token blacklisting for secure logout
- Responsive user interface
- Modern frontend built with React and SCSS
- AI-powered interview assistance (In Progress)

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- SCSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Cookie Parser

---

## Project Structure

```text
JobPrepAI
│
├── Backend
│   ├── src
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/AuroraDangelo/JobPrepAI.git
cd JobPrepAI
```

### Run the Backend

```bash
cd Backend
npm install
npm run dev
```

### Run the Frontend

Open another terminal and run:

```bash
cd Frontend
npm install
npm run dev
```

---

## Authentication Flow

- User registers using a username, email, and password.
- Passwords are securely hashed before being stored in MongoDB.
- JWT tokens are generated after successful login.
- Tokens are stored in HTTP-only cookies.
- During logout, tokens are blacklisted to prevent reuse.

---

## Upcoming Features

- AI mock interviews
- Resume analysis
- Coding interview practice
- User dashboard
- Profile management
- Interview history
- Progress tracking

---

## Screenshots

Screenshots will be added as the project progresses.

---

## Author

**Anshika Pandey**

GitHub: https://github.com/AuroraDangelo

---

## License

This project is created for learning, practice, and portfolio purposes.