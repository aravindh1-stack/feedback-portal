# MongoDB Setup Guide

This guide covers local development setup with MongoDB and production configuration with MongoDB Atlas.

## Local Development

### Option A: MongoDB Community Edition
1. Install MongoDB locally
   - Windows: use MSI installer from mongodb.com
   - Ensure `mongod` is in PATH
2. Start MongoDB
   - Default port: 27017
3. Create database and user (optional)
```js
use college_feedback;
db.createUser({
  user: "cfp_user",
  pwd: "strong_password_here",
  roles: [ { role: "readWrite", db: "college_feedback" } ]
});
```

### Option B: Docker
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:6
    ports: ['27017:27017']
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    volumes:
      - mongo_data:/data/db
  mongo-express:
    image: mongo-express:1
    ports: ['8081:8081']
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
volumes:
  mongo_data:
```

### Seed and Index Scripts
- Place index definitions under `database/indexes/*.js`
- Run via npm script (backend): `node database/indexes/users.indexes.js`

## MongoDB Atlas (Production/Staging)
1. Create an Atlas account and cluster (MongoDB 6.x)
2. Configure Network Access (IP allowlist or VPC peering)
3. Create Database User (least privilege)
4. Get connection string
   - `mongodb+srv://<user>:<pass>@<cluster-host>/college_feedback?retryWrites=true&w=majority`
5. Configure SRV DNS in backend `.env`

## Security Best Practices
- Use SCRAM-SHA auth with strong passwords or IAM roles where available
- Enable TLS/SSL to Atlas
- Use separate users/roles for app vs. analytics vs. admin
- Rotate credentials regularly; store in secret manager (not in repo)
- Enable auditing in Atlas as required by compliance

## Backups & PITR
- Enable Atlas backups with PITR
- Define retention policies (e.g., 30–90 days)
- Test restores quarterly

## Monitoring
- Use Atlas metrics and alerts for CPU, connections, slow queries, index health
- Enable Profiler on staging when investigating performance

## Connection (Backend)
```ts
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;
const options = {
  maxPoolSize: 50,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export const connectDB = async () => {
  await mongoose.connect(uri, options);
  console.log('MongoDB connected');
};
```
