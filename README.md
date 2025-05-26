# Todo List Application

A full-stack todo list application built with React, TypeScript, Express, and PostgreSQL. Features user authentication via Firebase and supports dark/light theme modes.

## Features

- User Authentication (Email/Password)
- Create, Read, Update, and Delete tasks
- Mark tasks as complete/incomplete
- Dark/Light theme toggle
- Responsive design
- Secure data storage
- Real-time updates

## Tech Stack

### Frontend
- React 18
- TypeScript
- React Router v6 for navigation
- Styled Components for styling
- Axios for API requests
- Firebase Authentication

### Backend
- Express.js
- PostgreSQL database
- Prisma ORM
- Firebase Admin SDK
- TypeScript
- JWT for authentication
- CORS enabled

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Project Structure

```
todo-list/
├── frontend/           # React frontend application
│   ├── public/        # Static files
│   ├── src/          # React source code
│   └── package.json  # Frontend dependencies
├── backend/           # Express backend application
│   ├── routes/       # API routes
│   ├── prisma/       # Database schema and migrations
│   ├── dist/         # Compiled JavaScript files
│   └── package.json  # Backend dependencies
└── package.json      # Root package.json for managing both applications
```

## Setup Instructions

1. Install dependencies for all packages:
   ```bash
   npm run install:all
   ```

2. Start both frontend and backend in development mode:
   ```bash
   npm start
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:5000

3. To run frontend only:
   ```bash
   npm run start:frontend
   ```

4. To run backend only:
   ```bash
   npm run start:backend
   ```

## Development

- Frontend code is in the `frontend` directory
- Backend code is in the `backend` directory
- Each directory has its own `package.json` for managing dependencies
- The root `package.json` contains scripts to run both applications together

## Building for Production

The project can be built for production in several ways:

1. Build both frontend and backend:
   ```bash
   npm run build
   ```

2. Build frontend only:
   ```bash
   npm run build:frontend
   ```

3. Build backend only:
   ```bash
   npm run build:backend
   ```

The build process:
- Frontend: Creates an optimized production build in `frontend/build`
- Backend: Compiles TypeScript to JavaScript in `backend/dist`

## Usage

1. Register a new account or log in with existing credentials
2. Add new tasks using the input field
3. Click on a task to mark it as complete/incomplete
4. Use the edit button to modify task text
5. Use the remove button to delete tasks
6. Toggle between light and dark themes using the theme button
7. Access your profile and logout through the welcome message

## Security

- All sensitive information is stored in environment variables
- Firebase Authentication for secure user management
- PostgreSQL for reliable data persistence
- API routes are protected with Firebase authentication
- CORS enabled for security
- JWT for secure token-based authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
