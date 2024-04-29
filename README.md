# Personal Blog App 📝

Welcome to my Personal Blog App! This application allows you to manage your blogs with ease, providing features like viewing, creating, editing, and deleting blogs. Additionally, it comes with an admin dashboard for authentication and authorization.

## Features 🚀

- **View Blogs**: Browse through all your blogs.
- **Create Blog**: Write and publish new blog posts.
- **Edit Blog**: Modify existing blogs to keep them up-to-date.
- **Delete Blog**: Remove unwanted or outdated blogs.
- **Admin Dashboard**: Securely manage your blogs with authentication and authorization.
- **User Authentication**: Authenticate users to access the admin dashboard.
- **User Authorization**: Authorize users to perform specific actions like creating, editing, or deleting blogs.

## Technologies Used 💻

- **Frontend**:
  - HTML, CSS, JavaScript
  - Templating: EJS

- **Backend**:
  - Node.js
  - Express.js
  - Database: MongoDB

- **Authentication & Authorization**:
  - JSON Web Tokens (JWT)

## Dependencies 📦

- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [method-override](https://www.npmjs.com/package/method-override)
- [express-session](https://www.npmjs.com/package/express-session)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)

## Getting Started 🛠️

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-blog-app
   npm install

* **Set up environment variables:**
    * Create a `.env` file in the root directory.
    * Define environment variables like database connection URI, JWT secret, etc.
  
* **Start the development server:**
    ```bash
    npm start
    ```

* **Access the application in your browser:**
    ```
    http://localhost:5000
    ```
Usage 📌
--------

1. **Authentication**:
    
    - Login to the admin dashboard using your credentials.
    - Only authenticated users can access the admin features.

2. **View Blogs**:
    
    - Browse through all your blogs on the home page.
    - Click on a blog to view its details.

3. **Create Blog**:
    
    - In the admin dashboard, navigate to the "Create Blog" section.
    - Write your blog content and publish it.

4. **Edit Blog**:
    
    - Open the blog you want to edit in the admin dashboard.
    - Make necessary changes and save the updates.

5. **Delete Blog**:
    
    - Access the blog you wish to delete in the admin dashboard.
    - Delete the blog permanently.

## Demos
![Home Page](/demoImgs/demo-1.png)
![Posts Section](/demoImgs/demo-2.png)
![Admin Login](/demoImgs/demo-3.png)
![Admin Dashboard](/demoImgs/demo-4.png)
![Edit Post](/demoImgs/demo-5.png)
