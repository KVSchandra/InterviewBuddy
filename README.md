# InterviewBuddy

InterviewBuddy is a real-time coding collaboration platform built using the MERN stack, Socket.io, and Tailwind CSS. It features JWT-based authentication and allows users to collaborate on coding problems in real-time.

## Use Case

InterviewBuddy is designed for coding interviews where interviewers and candidates need to collaborate in a shared coding environment. The platform provides real-time code synchronization, making it ideal for:
- **Technical Interviews**: Interviewers can assess candidates by sharing coding challenges and observing their problem-solving approach in real-time.
- **Mock Interviews**: Candidates can practice coding interviews with peers or mentors using a collaborative workspace.
- **Pair Programming**: Developers can work together on coding problems, debug code, and enhance productivity.

## Features

- **Real-time Code Collaboration**: Work on coding challenges together with live updates.
- **MERN Stack**: Uses MongoDB, Express.js, React, and Node.js.
- **Socket.io**: Enables real-time communication between users.
- **JWT Authentication**: Secure authentication system.
- **Tailwind CSS**: Provides a sleek and responsive UI.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express.js, MongoDB, Socket.io, JWT
- **Database**: MongoDB

## Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/interviewbuddy.git
   cd interviewbuddy
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Run the application:
   ```bash
   # Start backend
   cd server
   npm run dev
   
   # Start frontend
   cd ../client
   npm start
   ```

## Usage

1. Sign up or log in using JWT authentication.
2. Create or join a coding room.
3. Start collaborating in real-time.

## License

This project is licensed under the MIT License.
