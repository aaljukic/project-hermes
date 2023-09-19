# PostX (Codename: Hermes)

PostX, codenamed "Hermes", is a post sharing and reading platform demo client built with React JS 18, Vite JS 4, and TypeScript. This project focuses on reading functionality, showcasing a user-friendly experience for consuming content.

**Why Hermes?** In Greek mythology, Hermes is the messenger of the gods. Naming the project after Hermes poetically alludes to the posts and comments in our application, which serve as "messages" connecting users.

![PostX Logo](hermes-react/public/logo.png) *(The naming and logo, inspired by Twitter's rebranding, took me 10 minutes—much like them too)*

## Features:
1. **Responsive Design**: Adapts to both mobile and desktop layouts while maintaining the same feel.
2. **Infinite Scroll with Skeleton Loading**: As users scroll, more posts are fetched. Skeleton cards appear to signal the loading process.
3. **Post Filtering**: Filter posts by a user's name. Note: Filtering is client-side only due to API limitations.
4. **Detailed Post View**: View specific details of each post and their associated comments.
5. **Comments Preview**: The home page displays the first comment of each post as a preview, reminiscent of platforms like Instagram.
6. **Profile Images**: Randomly generated from [avataaars.io](https://avataaars.io/) for a visually appealing experience.

## Tech Stack:
- React JS 18
- Vite JS 4
- TypeScript

## Data Source:
The app fetches its data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Project Scope:
1. **Read-only**: The platform currently supports reading only.
2. **UI Enhancements**: Features like adding a new post or a quick comment input are present for visual completeness but are not functional in this scope. The UI also includes an 'add' button on the mobile layout that currently triggers an informational alert about the missing feature.
3. **Routes**:
   - **Home (`/`)**: Displays all posts with infinite scroll and filter functionality.
   - **Post Details (`/posts/{id}`)**: Shows detailed information about each post.


## Repository Structure:
This repository contains a `.devcontainer` directory with a `devcontainer.json` file, enabling seamless setup for anyone looking to try or contribute. There are also two `docker-compose` files for development and production environments.

## Running the App:

### Option 1: VS Code DevContainer
- Ensure Docker is installed.
- Set up VS Code DevContainer.
- Open the project root in VS Code.

### Option 2: Docker Development Environment
- Ensure Docker (and docker-compose if not using Docker Desktop) is installed.
- Navigate to the project root.
- Run the following command:
  ```
  docker-compose -f docker-compose.dev.yml up --build
  ```
- Visit `localhost:3000` and develop with hot-reload.

### Option 3: Docker Production Build
- Navigate to the project root.
- Run the following command:
  ```
  docker-compose -f docker-compose.prod.yml up --build
  ```
- Visit `localhost:3000`.


Certainly! I'll provide a section in the README that explains how to gracefully stop the containers and clean up after running the app:

---

## Stopping the Application and Cleanup

After running the app, you may want to stop the containers and clean up the created networks. Here's how to do it:

1. **Gracefully Stopping the Containers**:
   
   If you want to stop the application gracefully, you can use the common interrupt signal by pressing:
   ```
   (Ctrl/Command)+C
   ```
   This will begin the process of a graceful shutdown. If needed, pressing `(Ctrl/Command)+C` again will force an immediate shutdown.

2. **Removing the Containers and Network**:

   Once you've stopped the containers, you can remove them and their associated network with the following command:
   ```
   docker-compose -f docker-compose.dev.yml down
   ```
   ```
   docker-compose -f docker-compose.prod.yml down
   ```

## Conclusion:
PostX (Hermes) is a demo client project designed to showcase the power of modern web development tools. It's a fun and interactive way to consume and share content. Feel free to explore, contribute, or use it as inspiration for your projects!