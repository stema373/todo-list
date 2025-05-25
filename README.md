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

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/stema373/todo-list
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project in the Firebase Console
   - Download your Firebase Admin SDK service account key and save it as a json file in the root directory
   - Create a `.env` file in the root directory with the following variables:
   ```
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_list"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development servers**
   ```bash
   # Run both frontend and backend
   npm run dev

   # Or run them separately
   npm start        # Frontend only
   npm run server   # Backend only
   ```

## Usage

1. Register a new account or log in with existing credentials
2. Add new tasks using the input field
3. Click on a task to mark it as complete/incomplete
4. Use the edit button to modify task text
5. Use the remove button to delete tasks
6. Toggle between light and dark themes using the theme button
7. Access your profile and logout through the welcome message

## Project Structure

```
todo-list/
├── src/                  # Frontend React application
├── routes/              # Backend API routes
├── prisma/              # Database schema and migrations
├── public/              # Static files
├── server.ts           # Express server setup
├── firebase-config.ts  # Firebase configuration
├── package.json        # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

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
