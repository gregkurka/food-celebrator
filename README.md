# Food-Celebrator

**This project is in early stages, and this readme serves as a roadmap for the future**

A **social-media-inspired** platform centered around sharing overhead shots of meals. Users can upload and browse strictly top-down photos (or videos) of food, ensuring every post has a clean, aesthetic “bird’s eye” angle. By focusing on the art of presentation, Food-Celebrator aims to bring people together through their shared love of food while maintaining a simple, user-friendly interface.

---

## Key Features

- **Strict Content Policy**  
  All uploads must be taken from a top-down angle, featuring only the dishware, utensils, and the food itself—no hands, faces, or other objects. This ensures a clean, uniform feed that spotlights each dish’s presentation, and keeps the feed visually consistent and aesthetic.

- **Captioning**  
  Users can add quick captions (up to 256 characters) to describe their post or share a brief story.

- **Public Feeds**

  - **For You**: Personalized suggestions of new food posts from other users.
  - **Following**: Chronological feed of posts from the people a user follows.

- **User Interaction**

  - **Likes**: Show appreciation for a meal; aggregated count is visible on each post.
  - **Comments**: Leave short comments (up to 256 characters), fostering conversation.

- **No Private Messaging**  
  Focus on sharing visuals and micro-interactions—no distraction from direct messaging systems.

---

## Best-State Tech Stack

### Front End

- **React**  
  Core library for building a modern, responsive single-page application (SPA).
- **React Query**
  For streamlined server-state management, caching, and syncing with the UI.
- **React Router**  
  Seamless client-side routing for pages (For You, Following, Post Details, etc.).
- **Tailwind CSS**  
  Utility-first CSS framework for rapid styling consistency and a clean design.

### Back End

- **Node.js + Express**  
  RESTful API to handle server logic, routes, and data processing.
- **PostgreSQL**  
  Primary relational database for storing user profiles, posts, likes, and comments.
- **Knex.js**  
  Query builder to interact with PostgreSQL in a structured, maintainable way.

### Image Hosting & Validation

- **Google Cloud Storage**  
  Secure, scalable storage for uploaded images, fully integrated with the Google Cloud ecosystem to provide fast and reliable access.
- **Google Cloud Vision API**  
  Validates that each photo is truly an overhead shot and doesn’t contain disallowed objects (e.g., hands, faces).  
  Could also auto-tag images based on recognized objects or scenes.

### Authentication & Authorization

- **Auth0**  
  Provides secure, streamlined user authentication (email/password or social logins).  
  Manages tokens and user sessions without rolling out a custom auth system.

### Real-Time Functionality

- **Socket.io**  
  Enables live updates for new comments or likes without page reloads.  
  Could power notifications (e.g., “Your photo just got a new like!”).

### Testing & QA

- **Jest + React Testing Library**  
  Unit and integration testing for React components and utilities.
- **Cypress**  
  End-to-end (E2E) tests in an actual browser environment, ensuring full user flows work seamlessly.
- **Postman**  
  Manual and automated testing of RESTful API endpoints.

### Deployment & CI/CD

- **Docker**  
  Containerizes both front-end and back-end for consistent development and production environments.
- **GitHub Actions**  
  Automates build/test pipelines upon each push or pull request.
- **AWS (ECS or EC2) / Heroku / Vercel**  
  Scalable, straightforward hosting options.
  - Static front-end could be deployed on Vercel or Netlify.
  - Node.js + PostgreSQL app deployable to Heroku or AWS for robust server hosting.

### Monitoring & Analytics

- **Sentry**  
  Error tracking and real-time monitoring for production issues.
- **Google Analytics** / **Mixpanel**  
  Tracks user engagement, popular posts, and overall traffic patterns.

---

## Architecture Overview

1. **Front-End (React)**

   - Users interact with a sleek UI built with Tailwind CSS and React Router.
   - Global state (posts, user data) is managed using Redux or React Query.

2. **Back-End (Express + Node.js)**

   - Receives API requests and handles business logic.
   - Connects to PostgreSQL via Knex for data persistence and queries.

3. **Image Validation & Hosting**

   - Images first processed by **Google Cloud Vision API** to confirm overhead angle and disallowed elements.
   - Valid files are stored on **AWS S3** with unique, secure URLs returned to the client.

4. **User Auth & Permissions**

   - **Auth0** manages sign-up, login, and token-based sessions.
   - Protected routes ensure only authenticated users can upload, like, or comment.

5. **Real-Time Interactions**

   - **Socket.io** broadcasts new likes and comments to connected clients.

6. **Deployment & Scaling**
   - Docker images built and tested via **GitHub Actions**.
   - Production environment hosted on **AWS** or **Heroku**—scaling horizontally for traffic spikes.

---

## Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/food-celebrator.git
   cd food-celebrator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   - Create a `.env` file for back-end (containing DB credentials, Auth0 secrets, AWS S3 keys, etc.).
   - For the front-end, store any required environment variables in `.env.local` (e.g., Auth0 domain, client ID).

4. **Database Migration**

   ```bash
   npx knex migrate:latest
   npx knex seed:run  # If you have seed data
   ```

5. **Run the App**

   ```bash
   npm run dev
   ```

   Or use Docker, e.g.,

   ```bash
   docker-compose up
   ```

6. **Testing**
   ```bash
   npm run test       # Runs Jest + RTL tests
   npm run cypress    # If Cypress is set up
   ```

---

## Why This Project Stands Out

- **Full-Stack Mastery**: Demonstrates proficiency in both front-end (React, Redux, Tailwind) and back-end (Node.js, Express, PostgreSQL) development.
- **Modern Infrastructure**: Leverages cloud services (AWS S3, Google Vision, Auth0) to handle essential production-ready requirements such as image storage, AI validation, and secure authentication.
- **Scalable Architecture**: Built with Docker, easily deployable to AWS or Heroku, and tested via GitHub Actions for continuous delivery.
- **Real-Time Components**: Showcases proficiency in Socket.io and responsive front-end updates, reflecting knowledge of real-time web technologies.
- **Clean, Documented Codebase**: Follows best practices with testing suites, environment management, and a well-organized repository.

---

## Future Enhancements

- **Advanced Recommendation Algorithm**: Enhance the “For You” feed using machine learning or advanced filtering based on user interactions.
- **Photo Editing Tools**: Basic cropping, brightness adjustment, or filters for users to fine-tune their overhead shots.
- **Push Notifications**: Integrate with web push APIs or mobile push if turned into a React Native or PWA extension.
- **User Profiles & Stats**: Dedicated profile pages showcasing total likes, top posts, and followers.

---

## License

This project is licensed under the [MIT License](LICENSE).
