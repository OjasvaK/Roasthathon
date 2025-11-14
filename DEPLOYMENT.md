# Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- GitHub account
- Heroku account (for backend)
- Vercel account (for frontend)
- MongoDB Atlas account (for database)

---

## Backend Deployment (Heroku)

### Step 1: Prepare Backend for Deployment

Edit `club-showcase-backend/package.json`:
```json
{
  "engines": {
    "node": "16.x"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Create `Procfile` in backend folder:
```
web: node server.js
```

### Step 2: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user and copy connection string
4. Whitelist your IP address

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/club-showcase?retryWrites=true&w=majority
```

### Step 3: Deploy to Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd club-showcase-backend
heroku create your-club-backend

# Set environment variables
heroku config:set MONGODB_URI=<your_mongodb_atlas_url>
heroku config:set JWT_SECRET=<generate_a_random_secret>
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

Your backend will be available at: `https://your-club-backend.herokuapp.com`

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

Create `.env.production` in frontend folder:
```
REACT_APP_API_URL=https://your-club-backend.herokuapp.com
```

Update `package.json`:
```json
{
  "homepage": "https://your-domain.vercel.app",
  "proxy": "https://your-club-backend.herokuapp.com"
}
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

cd club-showcase-frontend

# Deploy
vercel

# Set environment variables via CLI
vercel env add REACT_APP_API_URL
```

**Option B: Using GitHub Integration**
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

Your frontend will be available at: `https://your-app.vercel.app`

---

## Database Deployment (MongoDB Atlas)

### Free Tier Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create Organization
3. Create Project
4. Build Cluster (Free M0 tier)
5. Create database user
6. Get connection string

### Connection String Example
```
mongodb+srv://clubadmin:password@cluster0.mongodb.net/club-showcase?retryWrites=true&w=majority
```

### Backup Strategy
```bash
# Periodic exports
mongoexport --uri mongodb+srv://user:pass@cluster.mongodb.net/club-showcase \
  --collection projects \
  --out projects_backup.json
```

---

## Post-Deployment Checklist

### Backend
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Setup error logging (Sentry)
- [ ] Configure rate limiting
- [ ] Enable CORS for frontend domain only
- [ ] Test all API endpoints
- [ ] Monitor logs regularly

### Frontend
- [ ] Test all routes
- [ ] Verify API calls work
- [ ] Test authentication flow
- [ ] Check responsive design
- [ ] Optimize images
- [ ] Enable analytics
- [ ] Setup error tracking

### Database
- [ ] Enable authentication
- [ ] Setup backup schedule
- [ ] Monitor data growth
- [ ] Create indexes for performance
- [ ] Setup alerts

---

## Environment Variables Reference

### Backend (.env)
```bash
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Security
JWT_SECRET=your_secret_here_minimum_32_characters
NODE_ENV=production

# Server
PORT=5000

# CORS
ALLOWED_ORIGINS=https://your-frontend.vercel.app

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app_password
```

### Frontend (.env.production)
```bash
REACT_APP_API_URL=https://your-backend.herokuapp.com
REACT_APP_ANALYTICS_ID=your_analytics_id
```

---

## Custom Domain Setup

### Connect Custom Domain to Vercel
1. Go to Vercel Project Settings
2. Domains → Add Domain
3. Follow DNS setup instructions
4. Point your domain registrar to Vercel nameservers

### Connect Custom Domain to Heroku
1. Add domain: `heroku domains:add www.yourdomain.com`
2. Update DNS records at your registrar
3. Verify with: `heroku domains`

---

## Scaling in Production

### Database Scaling
```bash
# Upgrade MongoDB cluster from M0 to M2+
# Via MongoDB Atlas dashboard
```

### Backend Scaling
```bash
# Heroku: Use Dynos
heroku dyno:scale web=2  # 2 web dynos

# Add workers
heroku dyno:scale worker=1
```

### Frontend CDN
- Vercel automatically uses CDN
- Enable cache headers for static files

### Database Indexing
```javascript
// Add performance indexes
db.projects.createIndex({ type: 1, approved: 1 });
db.ideas.createIndex({ category: 1, approved: 1 });
```

---

## Monitoring & Logging

### Heroku Logs
```bash
heroku logs --tail
heroku logs --num 100
```

### Error Tracking (Sentry)
```bash
npm install @sentry/node
```

### Performance Monitoring
```bash
npm install newrelic
```

---

## Troubleshooting Deployment

### Issue: CORS Errors
```javascript
// In server.js
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
```

### Issue: Environment Variables Not Loaded
```bash
# Heroku
heroku config:get MONGODB_URI

# Vercel
vercel env pull  # Pulls env vars locally
```

### Issue: Database Connection Timeout
- Check IP whitelist in MongoDB Atlas
- Verify connection string
- Check network connectivity

### Issue: Build Fails on Vercel
```bash
# Increase memory
vercel deploy --prod --local

# Check build logs in Vercel dashboard
```

---

## Security Hardening

### Backend Security
```javascript
// helmet for security headers
npm install helmet

app.use(helmet());

// rate limiting
npm install express-rate-limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Frontend Security
- Enable CSP headers
- Use HTTPS only
- Keep dependencies updated
- Regular security audits

### Database Security
- Enable IP whitelisting
- Use strong passwords
- Enable backup encryption
- Regular access reviews

---

## Cost Estimation

| Service | Free Tier | Production Tier |
|---------|-----------|-----------------|
| Heroku | ❌ | $7-50/month |
| Vercel | ✅ | $0 (free tier sufficient) |
| MongoDB | ✅ M0 | $9-200+/month |
| Total | ~$0 | ~$16-250/month |

---

## Rollback Strategy

### Heroku Rollback
```bash
# View releases
heroku releases

# Rollback to previous
heroku releases:rollback v5
```

### Vercel Rollback
- Via Vercel dashboard
- Select previous deployment
- Click "Redeploy"

---

## Maintenance

### Weekly
- Check application logs
- Monitor error rates
- Review user feedback

### Monthly
- Update dependencies
- Review security logs
- Check database size

### Quarterly
- Performance optimization
- Database maintenance
- Backup verification

---

## Success! 🎉

Your Club Showcase is now live and ready for members!

**Production URLs:**
- Backend: https://your-club-backend.herokuapp.com
- Frontend: https://your-app.vercel.app
- Database: MongoDB Atlas

For questions or issues, refer to individual service documentation.
