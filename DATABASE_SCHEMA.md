# Database Schema Reference and Setup

## Collections Overview

### 1. Users Collection
Stores all user accounts and profiles.

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password"],
      properties: {
        _id: { bsonType: "objectId" },
        name: { bsonType: "string", minLength: 2, maxLength: 100 },
        email: { bsonType: "string" },
        password: { bsonType: "string" },
        role: { enum: ["member", "admin", "moderator"] },
        profilePicture: { bsonType: "string" },
        bio: { bsonType: "string", maxLength: 500 },
        isVerified: { bsonType: "bool" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });
```

### 2. Projects Collection
Stores project submissions from members.

```javascript
db.createCollection("projects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "author", "type", "status"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string", minLength: 3, maxLength: 200 },
        description: { bsonType: "string", minLength: 10 },
        author: { bsonType: "objectId" },
        type: { enum: ["Web Development", "AI/ML", "Hardware", "Mobile App", "Data Science", "Other"] },
        status: { enum: ["ongoing", "completed"] },
        images: { bsonType: "array", items: { bsonType: "string" } },
        mediaUrl: { bsonType: "string" },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        approved: { bsonType: "bool" },
        upvotes: { bsonType: "int" },
        likedBy: { bsonType: "array", items: { bsonType: "objectId" } },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.projects.createIndex({ author: 1 });
db.projects.createIndex({ type: 1 });
db.projects.createIndex({ status: 1 });
db.projects.createIndex({ approved: 1 });
db.projects.createIndex({ createdAt: -1 });
db.projects.createIndex({ upvotes: -1 });
```

### 3. Ideas Collection
Stores forum ideas and discussions.

```javascript
db.createCollection("ideas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "author", "category"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string", minLength: 3, maxLength: 200 },
        description: { bsonType: "string", minLength: 10 },
        author: { bsonType: "objectId" },
        category: { enum: ["Innovation", "Events", "Project", "Feature", "Other"] },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        upvotes: { bsonType: "int" },
        downvotes: { bsonType: "int" },
        votedBy: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              userId: { bsonType: "objectId" },
              voteType: { enum: ["upvote", "downvote"] }
            }
          }
        },
        comments: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              author: { bsonType: "objectId" },
              text: { bsonType: "string" },
              createdAt: { bsonType: "date" }
            }
          }
        },
        approved: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.ideas.createIndex({ author: 1 });
db.ideas.createIndex({ category: 1 });
db.ideas.createIndex({ approved: 1 });
db.ideas.createIndex({ createdAt: -1 });
db.ideas.createIndex({ upvotes: -1 });
```

## Setup Commands

### 1. Create Database
```bash
mongo
use club-showcase
```

### 2. Run Schema Creation Scripts
Save the above scripts in `setup.js` and run:
```bash
mongosh < setup.js
```

### 3. Create Admin User
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@club.com",
  password: "$2a$10$...", // hashed password
  role: "admin",
  profilePicture: null,
  bio: "Club Administrator",
  isVerified: true,
  createdAt: new Date()
});
```

### 4. Create Sample Project
```javascript
db.projects.insertOne({
  title: "Club Website Redesign",
  description: "A modern redesign of the official club website with enhanced user experience",
  author: ObjectId("..."), // User ID
  type: "Web Development",
  status: "ongoing",
  images: ["https://example.com/image1.jpg"],
  mediaUrl: "https://github.com/club/website",
  tags: ["react", "tailwind", "website"],
  approved: true,
  upvotes: 5,
  likedBy: [],
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## Query Examples

### Get Approved Projects by Type
```javascript
db.projects.find({ 
  approved: true, 
  type: "Web Development" 
}).sort({ createdAt: -1 });
```

### Get Top Ideas
```javascript
db.ideas.find({ approved: true })
  .sort({ upvotes: -1 })
  .limit(10);
```

### Get User's Projects
```javascript
db.projects.find({ author: ObjectId("...") });
```

### Get User's Ideas with Comments
```javascript
db.ideas.find({ author: ObjectId("...") })
  .project({ comments: 1, upvotes: 1, title: 1 });
```

## Backup and Restore

### Backup Database
```bash
mongodump --db club-showcase --out ./backup
```

### Restore Database
```bash
mongorestore --db club-showcase ./backup/club-showcase
```

## Monitoring

### Check Collection Stats
```javascript
db.projects.stats();
db.ideas.stats();
db.users.stats();
```

### Check Indexes
```javascript
db.projects.getIndexes();
```

## Performance Optimization Tips

1. **Use Projection:** Only fetch needed fields
   ```javascript
   db.projects.find({}, { title: 1, author: 1 });
   ```

2. **Pagination:** Always use skip and limit
   ```javascript
   db.projects.find().skip(0).limit(10);
   ```

3. **Aggregate Pipeline:** For complex queries
   ```javascript
   db.projects.aggregate([
     { $match: { approved: true } },
     { $group: { _id: "$type", count: { $sum: 1 } } },
     { $sort: { count: -1 } }
   ]);
   ```

4. **Index Usage:** Monitor with explain()
   ```javascript
   db.projects.find({ type: "Web Development" }).explain("executionStats");
   ```
