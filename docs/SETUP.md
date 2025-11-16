# Farm2Door - Local Development Setup Guide

## Prerequisites

Ensure you have the following installed:
- **Node.js**: v20 LTS or higher (https://nodejs.org/)
- **PostgreSQL**: v15 or higher (https://www.postgresql.org/)
- **Git**: Latest version (https://git-scm.com/)
- **npm**: Comes with Node.js

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/farm2door.git
cd farm2door
```

### 2. Install Dependencies
```bash
npm install --workspaces
```

This installs dependencies for both backend and frontend in one command.

### 3. Database Setup

#### Create PostgreSQL Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user (in psql shell)
CREATE DATABASE farm2door_dev;
CREATE USER farm2door WITH PASSWORD 'farm2door_password';
ALTER ROLE farm2door SET client_encoding TO 'utf8';
ALTER ROLE farm2door SET default_transaction_isolation TO 'read committed';
ALTER ROLE farm2door SET default_transaction_deferrable TO on;
ALTER ROLE farm2door SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE farm2door_dev TO farm2door;
\q
```

#### Run Migrations
```bash
cd backend
npm run migrate
```

### 4. Environment Configuration

#### Backend Configuration
Create `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your values:
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm2door_dev
DB_USER=farm2door
DB_PASSWORD=farm2door_password
JWT_SECRET=your_dev_secret_key_here
```

#### Frontend Configuration
Create `frontend/.env`:
```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Farm2Door
```

### 5. Initialize Test Data (Optional)
```bash
cd backend
npm run seed
```

## Running the Application

### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3000`

### Terminal 2: Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will open on `http://localhost:5173`

## Testing

### Run All Tests
```bash
npm run test --workspaces
```

### Run Tests with UI
```bash
npm run test:ui --workspaces
```

### Run Tests with Coverage
```bash
npm run test:coverage --workspaces
```

### Run Specific Test File
```bash
cd backend
npm run test -- src/services/auth.test.ts
```

## Linting & Formatting

### Lint Code
```bash
npm run lint --workspaces
```

### Fix Linting Issues
```bash
npm run lint:fix --workspaces
```

### Format Code
```bash
npm run format --workspaces
```

### Type Checking
```bash
npm run type-check --workspaces
```

## Building

### Build Backend
```bash
cd backend
npm run build
npm start
```

### Build Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Database Management

### Create New Migration
```bash
cd backend
npm run migrate -- create migration_name
```

### Rollback Migrations
```bash
cd backend
npm run migrate -- rollback
```

### Check Database Status
```bash
psql -U farm2door -d farm2door_dev -c "\dt"
```

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:

**Backend (port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**Frontend (port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
1. Ensure PostgreSQL service is running
2. Check `DB_HOST` in `.env` (should be `localhost` for local development)
3. Verify database credentials match `.env` file
4. Create database if it doesn't exist (see step 3 above)

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --workspaces
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npm run type-check --workspaces
```

### Module Not Found
```bash
# Ensure all dependencies are installed
npm install --workspaces
# Clear Vite/build cache
rm -rf dist/ .next/
```

## Development Workflow

### Creating a New Feature

1. **Create feature branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Write tests first** (TDD)
   ```bash
   # Backend
   cd backend
   npm run test -- src/services/feature.test.ts
   
   # Frontend
   cd frontend
   npm run test -- src/components/Feature.test.tsx
   ```

3. **Implement feature**
   - Keep type safety (TypeScript strict mode)
   - Follow eslint rules
   - Aim for 70%+ test coverage

4. **Format and lint**
   ```bash
   npm run format --workspaces
   npm run lint:fix --workspaces
   ```

5. **Run full test suite**
   ```bash
   npm run test:all --workspaces
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/feature-name
   ```

## Debugging

### Debug Backend with VS Code
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend Debug",
      "program": "${workspaceFolder}/backend/node_modules/.bin/tsx",
      "args": ["watch", "src/index.ts"],
      "cwd": "${workspaceFolder}/backend",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

### Debug Frontend with VS Code
Install "Debugger for Chrome" extension and create `.vscode/launch.json`:
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Frontend Debug",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/frontend/src"
}
```

## Performance Monitoring

### Backend Logging
Logs are written to console in development mode. Configure in `backend/src/config/logger.ts`

### Frontend DevTools
Use React DevTools extension in Chrome for component debugging.

## API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "userType": "customer"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Products (using token)
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Documentation

- **API Documentation**: See `docs/API.md`
- **Architecture**: See `docs/ARCHITECTURE.md` (coming soon)
- **Database Schema**: See `docs/DATABASE.md` (coming soon)

## Getting Help

- Check existing GitHub Issues
- Create new issue with detailed description
- Contact team lead for guidance

## Useful Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Material-UI Documentation](https://mui.com/)

## Next Steps

After setup:
1. Run tests to verify everything works: `npm run test --workspaces`
2. Check out user stories in `implementation-tasks.md`
3. Start with Authentication (US1) implementation
4. Follow TDD workflow for each feature
