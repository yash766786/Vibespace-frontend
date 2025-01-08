# VibeSpace Frontend

Welcome to the frontend repository of **VibeSpace**, a social media platform built using the MERN stack. This frontend application provides users with an interactive interface to connect, share posts, like, comment, follow others, and manage their private notes.

## Features

### Social Media Features
- **Post Uploading:** Users can upload photos and share them with their followers.
- **Like & Comment:** Interact with posts by liking and commenting.
- **Follow/Unfollow Users:** Stay updated with your favorite users' activities.

### Personal Space
- **Private Notes:** Users can create, edit, and delete notes that are visible only to them.

### User Authentication & Profile Management
- **Signup/Login:** Secure user authentication with OTP verification.
- **Profile Management:** Update profile details and upload avatars.

### Dark Mode
- A visually appealing dark mode for comfortable browsing.

## Tech Stack
- **React.js**: For building the user interface.
- **React Router**: For navigation between different pages.
- **DaisyUI**: For styled components and enhanced user experience.
- **Axios**: For making API requests.
- **Context API**: For state management.
- **Vite**: For fast development and bundling.

## Folder Structure
```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── context/      # Context API for state management
│   ├── pages/        # Different application pages
│   ├── styles/       # Global and component-specific styles
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Entry point of the application
└── vite.config.js    # Vite configuration
```

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vibespace-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vibespace-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

### Build for Production

To create a production build:
```bash
npm run build
```

## Environment Variables
Create a `.env` file in the root directory with the following keys:
```env
VITE_BACKEND_URL=<your-backend-api-url>
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
Special thanks to the libraries and tools that made this project possible:
- [React.js](https://reactjs.org/)
- [DaisyUI](https://daisyui.com/)
- [Vite](https://vitejs.dev/)
