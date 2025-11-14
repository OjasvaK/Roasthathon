# Testing Guide

## 📋 Manual Testing Checklist

### Authentication Testing

#### Register Flow
- [ ] Navigate to `/auth`
- [ ] Click "Register" tab
- [ ] Enter name, email, password
- [ ] Passwords match
- [ ] Receive success message
- [ ] Token stored in localStorage
- [ ] Redirected to home

#### Login Flow
- [ ] Navigate to `/auth`
- [ ] Stay on Login tab
- [ ] Enter valid email/password
- [ ] Receive success message
- [ ] Token stored in localStorage
- [ ] User info in context
- [ ] Navbar shows logout button

#### Failed Auth
- [ ] Invalid email format shows error
- [ ] Password too short shows error
- [ ] Non-existent email shows error
- [ ] Wrong password shows error
- [ ] Logout clears token & redirects

### Project Showcase Testing

#### View Projects
- [ ] Home page loads
- [ ] Navigate to `/projects`
- [ ] Projects grid displays
- [ ] All projects visible (or paginated)
- [ ] Projects show images
- [ ] Status badges display correctly

#### Project Filters
- [ ] Type filter works (6 categories)
- [ ] Status filter works (ongoing/completed)
- [ ] Multiple filters work together
- [ ] Clear filters button resets
- [ ] Pagination works correctly

#### Project Interactions
- [ ] Click like button
- [ ] Upvote count increases
- [ ] Click like again (unlike)
- [ ] Upvote count decreases
- [ ] View project details in external link

### Project Upload Testing

#### Upload Without Auth
- [ ] Non-logged users see redirect message
- [ ] Can't access `/upload` without login

#### Upload With Auth
- [ ] Navigate to `/upload`
- [ ] Form displays all fields
- [ ] Enter project details
- [ ] Select project type
- [ ] Select status (ongoing/completed)
- [ ] Upload multiple images
- [ ] Preview shows before submit
- [ ] Submit button works
- [ ] Success message displays
- [ ] Project shows "pending approval"

#### Validation Testing
- [ ] Title minimum 3 characters
- [ ] Description minimum 10 characters
- [ ] Type dropdown has 6 options
- [ ] Status dropdown has 2 options
- [ ] Tags comma-separated work
- [ ] URL validation for links

### Forum Testing

#### View Ideas
- [ ] Navigate to `/forum`
- [ ] All approved ideas display
- [ ] Ideas sorted by upvotes

#### Post Idea
- [ ] Logged-in users see post button
- [ ] Non-logged users see login message
- [ ] Form opens when clicked
- [ ] Enter idea details
- [ ] Select category
- [ ] Add tags
- [ ] Submit works
- [ ] Idea pending approval message

#### Vote on Ideas
- [ ] Click upvote button
- [ ] Count increases
- [ ] Change vote to downvote
- [ ] Counts update correctly
- [ ] Multiple clicks don't duplicate votes

#### Comment on Ideas
- [ ] Comments section displays
- [ ] Comment count shows
- [ ] Can add new comment (logged in)
- [ ] Comments display with author
- [ ] New comments appear immediately

#### Filter Ideas
- [ ] Filter by All Ideas
- [ ] Filter by Innovation
- [ ] Filter by Events
- [ ] Filter by Project
- [ ] Filter by Feature
- [ ] Filter by Other

### User Profile Testing

#### View Profile
- [ ] Navigate to `/profile/:id`
- [ ] Profile displays correctly
- [ ] Name shows
- [ ] Bio displays
- [ ] Role shows (if not member)
- [ ] Member since date shows

### Navigation Testing

#### Desktop Navigation
- [ ] Logo navigates to home
- [ ] All links work
- [ ] Active link shows properly
- [ ] Login link shows when not auth
- [ ] User menu shows when auth
- [ ] Logout button appears

#### Mobile Navigation
- [ ] Hamburger menu appears on mobile
- [ ] Menu expands/collapses
- [ ] All links work in mobile menu
- [ ] Menu closes after navigation

### Responsive Design

#### Mobile (< 640px)
- [ ] Layout stacks vertically
- [ ] Touch targets are 44px+
- [ ] Images scale properly
- [ ] Text readable
- [ ] No horizontal scroll

#### Tablet (640px - 1024px)
- [ ] 2-column grids work
- [ ] Spacing appropriate
- [ ] Forms usable

#### Desktop (> 1024px)
- [ ] 3-column grids work
- [ ] Full navigation shows
- [ ] All features visible

---

## 🧪 API Testing (cURL)

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@club.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@club.com",
    "password": "password123"
  }'
```

### Get Projects
```bash
curl http://localhost:5000/api/projects
```

### Get Filtered Projects
```bash
curl "http://localhost:5000/api/projects?type=Web%20Development&status=completed"
```

### Create Project (with token)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "This is a test project",
    "type": "Web Development",
    "status": "completed",
    "tags": ["react", "test"]
  }'
```

### Like Project
```bash
curl -X PATCH http://localhost:5000/api/projects/PROJECT_ID/like \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Forum Ideas
```bash
curl http://localhost:5000/api/forum
```

### Post Idea
```bash
curl -X POST http://localhost:5000/api/forum \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Idea Title",
    "description": "Detailed description",
    "category": "Innovation",
    "tags": ["idea", "test"]
  }'
```

### Vote on Idea
```bash
curl -X PATCH http://localhost:5000/api/forum/IDEA_ID/vote \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"voteType": "upvote"}'
```

### Add Comment
```bash
curl -X POST http://localhost:5000/api/forum/IDEA_ID/comment \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "Great idea!"}'
```

---

## 📊 Test Data Scenarios

### Scenario 1: New User Journey
1. Register account
2. Browse projects
3. Browse ideas
4. Upload a project
5. Post an idea
6. Vote on ideas
7. Comment on ideas
8. View profile

### Scenario 2: Admin Workflow
1. Login as admin
2. Browse pending projects
3. Approve a project
4. Browse pending ideas
5. Approve an idea
6. Check user list

### Scenario 3: Content Discovery
1. Filter projects by type
2. Filter by status
3. Sort ideas by votes
4. Read comments
5. Like multiple projects

### Scenario 4: Error Handling
1. Try to upload without title (should fail)
2. Try invalid email (should fail)
3. Try short password (should fail)
4. Try accessing protected route without auth
5. Try to delete other user's content

---

## 🔍 Browser Console Testing

### Check Local Storage
```javascript
console.log(localStorage.getItem('token'));
```

### Check API Response
```javascript
fetch('http://localhost:5000/api/projects')
  .then(r => r.json())
  .then(d => console.log(d));
```

### Check Context State
```javascript
// In React DevTools, check AuthContext
```

---

## ⚡ Performance Testing

### Page Load Times
- [ ] Home loads < 2s
- [ ] Projects load < 3s
- [ ] Forum loads < 3s

### Network Optimization
- [ ] Check network tab in DevTools
- [ ] Verify image compression
- [ ] Check API response times

### Lighthouse Testing
```bash
# Run in browser DevTools
# Lighthouse → Generate report
# Target: 90+ score
```

---

## 🔐 Security Testing

### Auth Security
- [ ] Passwords not visible in code
- [ ] Token in secure storage
- [ ] HTTPS ready for production
- [ ] No sensitive data in URLs

### Input Validation
- [ ] XSS prevention tested
- [ ] SQL injection n/a (MongoDB)
- [ ] CSRF protection ready
- [ ] Rate limiting ready

### CORS Testing
- [ ] Frontend can call backend
- [ ] Cross-origin requests work
- [ ] Credentials sent properly

---

## 📝 Edge Cases to Test

- [ ] Empty search results
- [ ] Network errors
- [ ] Slow connections (DevTools throttling)
- [ ] Very long text inputs
- [ ] Special characters in input
- [ ] Rapid clicking (duplicate prevention)
- [ ] Back button navigation
- [ ] Page refresh preserves state
- [ ] Multiple tabs open

---

## ✅ Pre-Deployment Checklist

### Functionality
- [ ] All CRUD operations work
- [ ] Authentication flow complete
- [ ] Filters and search work
- [ ] Pagination works
- [ ] Responsive on all devices

### Browser Compatibility
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile browsers

### Performance
- [ ] Lighthouse score 90+
- [ ] Load time < 3s
- [ ] No console errors
- [ ] No memory leaks

### Security
- [ ] No console errors
- [ ] No sensitive data exposed
- [ ] HTTPS ready
- [ ] Validation working

### Documentation
- [ ] All docs updated
- [ ] Setup guide complete
- [ ] API docs accurate
- [ ] Deployment guide ready

---

## 🐛 Known Issues to Monitor

- Monitor for memory leaks in long sessions
- Check mobile performance on slow networks
- Verify database indexes are efficient
- Monitor token refresh on long sessions

---

Good testing practices = stable application! 🎯
