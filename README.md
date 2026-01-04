# Twitter Clone

**Description**
A full-stack social media application built with the MERN stack that replicates the core functionality of Twitter. It allows users to post updates, interact with others through likes and comments, follow users, and manage their profiles. The application features a modern, responsive user interface and secure authentication.

**Features**
- **User Authentication**: Secure sign-up and login using JWT and bcryptjs.
- **Create & Manage Posts**: Users can create text and image posts, and delete their own posts.
- **Interactions**: Like and comment on posts.
- **Social Graph**: Follow and unfollow other users.
- **Profile Management**: Edit profile details, including profile and cover photos (stored via Cloudinary).
- **Notifications**: View notifications for likes, comments, and follows.
- **Responsive Design**: Built with TailwindCSS and DaisyUI for a seamless mobile and desktop experience.

**Tech Stack**
- **Frontend**: React.js, TailwindCSS, DaisyUI, TanStack Query (React Query), React Router, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Cloudinary, JWT, Cookie-Parser

# Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KaiserLycan/Twitter-Clone.git
   cd Twitter-Clone
   ```

2. **Install Dependencies**
   
   Install backend dependencies:
   ```bash
   npm install
   ```
   
   Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory and add the following variables:
   
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the Application**

   Start the backend server (from the root directory):
   ```bash
   npm run dev
   ```
   
   Start the frontend development server (open a new terminal, navigate to `frontend`):
   ```bash
   cd frontend
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

# What i learned
- MERN Stack 
- TanStack Package
- DaisyUI 
- Authentication and JWT (bycryptjs && jsonwebtoken()
- Cloudinary

# Future implemetation
- Real-time messaging
- Search functionality
- Post bookmarking
- Retweet functionality

# Source 
- https://www.youtube.com/watch?v=MDZC8VDZnV8&t=24675s#t
