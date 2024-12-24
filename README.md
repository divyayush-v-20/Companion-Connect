# Companion Connect

Companion Connect is a user-friendly platform designed to streamline the process of pet adoption. Users can post pets available for adoption, but to ensure quality and authenticity, each post undergoes an approval process by the admin before being published live on the website. The aim is to create a safe and efficient environment for connecting pets with loving homes.

## Features

### User Features:

- **Browse Pets:** Users can browse the pets listed for adoption using filters like breed and location.
- **Adopt a Pet:** Users can view details of each pet, and if interested in adoption, the owner information will be provided.
- **Post for Adoption:** Users can submit pets they want to put up for adoption. These submissions require admin approval before going live on the platform.

### Admin Features:

- **Moderation Dashboard:** Admins can view, approve, or reject pet submissions.
- **Pet Listings Management:** Ensure that only appropriate and verified listings are visible to users.

### Security Features:

- **Authentication:** Users must sign in to post or adopt pets. Authentication is powered by JWT.
- **Data Protection:** Passwords are securely hashed using bcrypt.

### Responsive Design:

- Built with Tailwind CSS, ensuring an attractive and mobile-friendly user interface.

## Tech Stack

### Backend:

- **Node.js** with **Express.js** for server-side operations.
- **MongoDB** and **Mongoose** for database management.
- **JWT** for secure user authentication.
- **Bcrypt** for password hashing.
- **Multer** for handling image uploads.

### Frontend:

- **React.js** for building a dynamic and interactive user interface.
- **React Router DOM** for navigation.
- **React Scroll** for smooth scrolling animations.
- **Tailwind CSS** for styling.
- **ESLint** for maintaining code quality.

## Installation and Setup

Follow these steps to get Companion Connect up and running locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/divyayush-v-20/Companion-Connect.git

2. **Install Dependencies:**

   - Navigate to the server directory and install dependencies:
     ```bash
     cd server
     npm install
     ```
   - Navigate to the frontend directory and install dependencies:
     
     In another terminal write:
     ```bash
     cd client
     npm install
     ```

3. **Environment Variables:**

   - Create a `.env` file in the backend directory and provide the following variables:
     ```env
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Run the Application:**

   - Start the backend server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the frontend development server:

     In another terminal write:
     ```bash
     cd client
     npm run dev
     ```

5. **Access the Application:**

   - Open your browser and navigate to `http://localhost:5173`.

---

### File Structure

```ssh
COMPANION-CONNECT/
├── client/                      # Frontend codebase
│    ├── public/                 # Static assets
│    └── src/                    # Source code
│        ├── components/         # Reusable UI components
│        │   ├── admin/          # Admin-specific UI
│        │   ├── adoption/       # Adoption page UI
│        │   ├── home/           # Homepage UI
│        │   ├── landing/        # Landing Page UI
│        │   ├── login/          # Login UI
│        │   ├── navbar/         # Navigation bar UI
│        │   └── signup/         # Signup UI
│        ├── routes/             # Route definitions
│        └── utils/              # Utility functions for frontend
│
└── server/                      # Backend codebase
    ├── config/                  # Configuration files
    ├── controllers/             # API logic
    ├── models/                  # Database schemas
    ├── routes/                  # API routes
    ├── uploads/                 # Uploaded files
    └── utils/                   # Utility functions for backend
```

## Future Enhancements

- **Email Notifications:** Notify users when their submissions are approved or rejected.
- **Advanced Filters:** Add more filters like vaccination status and other medical conditions.
- **Favorites List:** Allow users to save their favorite pets for later reference.
- **Messaging Service:** Implement a messaging system to facilitate communication between users interested in adopting pets.
- **Mobile App:** Expand the platform with a dedicated mobile application.
