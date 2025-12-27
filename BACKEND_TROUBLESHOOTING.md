# Backend Connection Troubleshooting Guide

## 🔍 Common Issues & Solutions

### 1. MongoDB Connection Issues

The backend requires MongoDB to be running. Here are the solutions:

#### Option A: Install and Start MongoDB Locally
```bash
# On Windows (using Chocolatey)
choco install mongodb

# On macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# On Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB service
# Windows: MongoDB should start automatically
# macOS: brew services start mongodb/brew/mongodb-community
# Linux: sudo systemctl start mongod
```

#### Option B: Use MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buddyup
```

#### Option C: Use Docker (Quick Setup)
```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Node.js Dependencies

Make sure all dependencies are installed:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../Frontend
npm install
```

### 3. Environment Variables

Ensure `backend/.env` has correct values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buddyup
JWT_SECRET=BuddyUp_Super_Secure_JWT_Secret_Key_2024_Random_String_For_Production_Use_Only
NODE_ENV=development
```

### 4. Port Conflicts

Check if port 5000 is already in use:
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux  
lsof -i :5000
```

If port 5000 is busy, change it in `backend/.env`:
```
PORT=5001
```

And update frontend API config in `Frontend/src/api/api.js`:
```javascript
const CONFIG = {
  USE_MOCK_DATA: false,
  BASE_URL: 'http://localhost:5001/api',  // Update port here
  TIMEOUT: 10000
};
```

## 🚀 Quick Start Commands

### Method 1: Use the Development Script
```bash
# From project root
node start-dev.js
```

### Method 2: Start Manually
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd Frontend
npm run dev
```

### Method 3: Start with Mock Data (No Backend Required)
Update `Frontend/src/api/api.js`:
```javascript
const CONFIG = {
  USE_MOCK_DATA: true,  // Enable mock mode
  BASE_URL: 'http://localhost:5000/api',
  TIMEOUT: 10000
};
```

## 🔧 Health Check

Once backend is running, test these URLs:

1. **Health Check**: http://localhost:5000/api/health
2. **Profiles**: http://localhost:5000/api/profiles  
3. **Projects**: http://localhost:5000/api/projects

## 📊 Database Seeding

To populate with sample data:
```bash
# Make a POST request to seed endpoint
curl -X POST http://localhost:5000/api/seed
```

Or use the frontend demo page at: http://localhost:3000/recommendation-demo

## 🐛 Debug Steps

1. **Check MongoDB Connection**:
   ```bash
   # Test MongoDB connection
   mongosh # or mongo (older versions)
   ```

2. **Check Backend Logs**:
   ```bash
   cd backend
   npm run dev
   # Look for connection messages
   ```

3. **Check Frontend Console**:
   - Open browser dev tools
   - Look for network errors
   - Check if API calls are failing

4. **Test API Directly**:
   ```bash
   curl http://localhost:5000/api/health
   ```

## 🔄 Reset Everything

If nothing works, try a complete reset:

```bash
# Stop all processes
# Kill any running servers (Ctrl+C)

# Clean install
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../Frontend  
rm -rf node_modules package-lock.json
npm install

# Restart
cd ..
node start-dev.js
```

## 💡 Alternative: Use Mock Data

If you just want to test the frontend features:

1. Edit `Frontend/src/api/api.js`
2. Set `USE_MOCK_DATA: true`
3. Start only the frontend: `cd Frontend && npm run dev`

This will simulate backend responses without needing a real backend server.