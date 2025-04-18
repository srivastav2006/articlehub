# ArticleHub

A robust backend API for a knowledge-sharing platform similar to Quora, where users can create, read, update, and delete articles and engage with content through comments and votes.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Secure password hashing
  - Protected routes

- **Article Management**
  - Create, read, update, delete operations
  - Tagging system
  - Upvote/downvote functionality
  - Owner-based permissions

- **Comment System**
  - Nested comments
  - CRUD operations
  - Upvote/downvote functionality

- **Advanced Query Capabilities**
  - Filtering
  - Pagination
  - Sorting
  - Field selection

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Development**: Nodemon

## Project Structure

```
ArticleHub/
├── config/
│   └── db.js
├── controllers/
│   ├── articleController.js
│   ├── commentController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Article.js
│   ├── Comment.js
│   └── User.js
├── routes/
│   ├── articleRoutes.js
│   ├── commentRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/updatedetails` - Update user details

### Article Routes
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `PUT /api/articles/:id/upvote` - Upvote article
- `PUT /api/articles/:id/downvote` - Downvote article

### Comment Routes
- `GET /api/articles/:articleId/comments` - Get comments for an article
- `POST /api/articles/:articleId/comments` - Add comment to article
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment
- `PUT /api/comments/:id/upvote` - Upvote comment
- `PUT /api/comments/:id/downvote` - Downvote comment

## Getting Started

### Prerequisites
- Node.js (v14 or newer)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/articlehub.git
cd articlehub
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

4. Run the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Usage Examples

### Register a new user
```bash
curl -X POST \
  http://localhost:5000/api/users/register \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
}'
```

### Create an article (authenticated)
```bash
curl -X POST \
  http://localhost:5000/api/articles \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "title": "My First Article",
    "content": "This is the content of my first article",
    "tags": ["tutorial", "nodejs"]
}'
```

## Advanced Features

### Filtering
Get articles with a specific tag:
```
GET /api/articles?tags[in]=nodejs,express
```

### Pagination
```
GET /api/articles?page=2&limit=10
```

### Sorting
```
GET /api/articles?sort=-createdAt
```

### Field Selection
```
GET /api/articles?select=title,content,createdAt
```


## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)