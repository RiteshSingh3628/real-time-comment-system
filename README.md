
# Real-Time Comments Sysetm

A full-stack web application where users can login, post Comments, and view real-time updates as new comments are added. The system leverages Next.js for the front-end, and MySQL for data storage. Material UI provides a responsive and modern interface.



## Features

- User Authentication: Simple username-based login.
- Real-Time Updates: comments are broadcast to all connected users using Socket.io
- Responsive Design: Built with Material UI for seamless mobile and desktop experience.
- Data Persistence: Stores comments in a MySQL database with timestamps.


## Technologies Used
- Front-End:
    - Next.js
    - Material UI
    - Axios
- Back-End:
    - Node.js
    - Socket.IO
    - Express.js
- Database
    - MySQL
## Getting Started
### Prerequisits
Ensure the following tools are installed on your system:
-  Node.js [Download here](https://nodejs.org/en/download/package-manager)
- MySQL [Download here](https://www.mysql.com/downloads/)
- Git [Download here](https://git-scm.com/downloads)

## Run Locally

### 1. Clone the Reprository

```bash
  git clone 
  https://github.com/RiteshSingh3628/real-time-comment-system.git
```

### 2. Backend Setup
- Navigate to the bakend folder
```bash
  cd server
```

- Install dependencies:

```bash
  npm install
```

- Configure the MySQL database:
  - Open MySQL and create a databse named 'commentSystem'
  - create a comments table inside the database 'commentSystem'
  - You can reffer to given query to create the table 

```sql
  CREATE TABLE comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      comment TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
```
- Start the backend server:
```bash
  npm start || nodemon app.js
```

### 3. Frontend Setup
- Navigate to the Frontend folder:
```bash
  cd ../client
```

- Install dependencies:
```bash
  npm install
```

- Start development server:

```bash
  npm run dev
```

### 4. Run the Apllication
- Open your browser and navigate to https://localhost:3000
- Login with username.
- Post comments and see real-time updates instantly!


