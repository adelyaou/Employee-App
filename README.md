# Employee Management System

A comprehensive employee management application built with modern web technologies and containerized for Kubernetes deployment. This system provides complete CRUD functionality for employee management with secure authentication and role-based access control.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Docker Setup](#docker-setup)
  - [Kubernetes Deployment](#kubernetes-deployment)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Employee Management System is a full-stack web application designed to manage employee information efficiently. It consists of:

- **Backend**: Express.js REST API with MySQL database
- **Frontend**: Vue 3 + Vite single-page application
- **Database**: MySQL 8.0
- **Deployment**: Kubernetes with Kustomize overlays for multi-environment support

The application features secure JWT-based authentication, role-based access control, and comprehensive employee CRUD operations.

---

## 📁 Project Structure

```
employee-app/
├── employee-be/                 # Backend API
│   ├── src/
│   │   ├── config/             # Database configuration
│   │   ├── controllers/        # Business logic (auth, employees)
│   │   ├── middlewares/        # Authentication middleware
│   │   ├── models/             # Database models (User, Employee)
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Utility functions
│   │   └── server.js           # Express server
│   ├── dockerfile              # Backend Docker image
│   ├── package.json            # Backend dependencies
│   └── hash-existing-users.js  # Password migration script
│
├── employee-fe/                 # Frontend SPA
│   ├── src/
│   │   ├── api/                # API client configuration
│   │   ├── components/         # Vue components
│   │   ├── router/             # Vue Router configuration
│   │   ├── services/           # API service layer
│   │   ├── views/              # Page components
│   │   ├── App.vue             # Root component
│   │   └── main.js             # Vue app entry point
│   ├── dockerfile              # Frontend Docker image
│   ├── vite.config.js          # Vite build configuration
│   ├── package.json            # Frontend dependencies
│   └── index.html              # HTML entry point
│
├── employee-manifest/           # Kubernetes manifests
│   ├── base/                   # Base Kustomize configuration
│   │   ├── backend/            # Backend deployment & service
│   │   ├── frontend/           # Frontend deployment & service
│   │   ├── database/           # MySQL deployment & service
│   │   ├── configmap.yaml      # Configuration
│   │   ├── secret.yaml         # Secrets (credentials)
│   │   ├── rbac.yaml           # Role-based access control
│   │   └── networkpolicy-*.yaml # Network policies
│   └── overlays/
│       ├── dev/                # Development environment
│       ├── stag/               # Staging environment
│       └── prod/               # Production environment
│
├── Jenkinsfile                  # CI/CD pipeline configuration
└── Dockerfile.jenkins           # Jenkins Docker image
```

---

## 🛠 Technologies

### Backend

- **Framework**: Express.js 5.1.0
- **Database**: MySQL 8.0 with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Additional**: CORS, Morgan logging, dotenv

### Frontend

- **Framework**: Vue 3.5.21
- **Build Tool**: Vite 7.1.7
- **Routing**: Vue Router 4.5.1
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap 5.3.8
- **Notifications**: SweetAlert2
- **Styling**: CSS with dark theme

### DevOps & Deployment

- **Containerization**: Docker
- **Orchestration**: Kubernetes with Kustomize
- **CI/CD**: Jenkins
- **Image Registry**: Docker Hub

---

## ✨ Features

### Authentication & Security

- User registration with email verification
- JWT-based login authentication
- Secure password hashing with bcrypt
- Auth middleware for protected routes
- Token expiration (7 days default)
- CORS configuration for security

### Employee Management

- **Create**: Add new employee records
- **Read**: View employee list with details
- **Update**: Modify employee information
- **Delete**: Remove employee records
- Employee fields: name, email, phone, position, department, salary, hire date

### User Interface

- Dark-themed modern design
- Responsive layout
- Sidebar navigation
- Form validation
- Alert notifications
- Loading states

### Deployment

- Multi-environment support (dev, staging, production)
- Kubernetes manifests with Kustomize
- Security contexts and RBAC
- Network policies for pod communication
- Resource limits and health checks
- Persistent volumes for database
- ConfigMaps and Secrets management

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ (for backend)
- **Node.js**: v20+ (for frontend build)
- **MySQL**: v8.0
- **Docker**: Latest version
- **Kubernetes**: v1.20+ (optional, for K8s deployment)
- **Git**: For version control

### Local Development

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd employee-app/employee-be

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employee_app
DB_USER=emp_user
DB_PASS=karyawan!
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
EOF

# Start development server
npm run dev
```

Server will run on `http://localhost:4000`

#### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd employee-app/employee-fe

# Install dependencies
npm install

# Create .env file
cat > .env.local << EOF
VITE_API_URL=http://localhost:4000/api
EOF

# Start development server
npm run dev
```

Application will be available on `http://localhost:5173`

#### 3. Database Setup

```bash
# Using Docker (recommended)
docker run --name employee-mysql \
  -e MYSQL_ROOT_PASSWORD=admin \
  -e MYSQL_DATABASE=employee_app \
  -e MYSQL_USER=emp_user \
  -e MYSQL_PASSWORD=karyawan! \
  -p 3306:3306 \
  -d mysql:8.0

# Or using local MySQL
mysql -u root -p -e "
CREATE DATABASE employee_app;
CREATE USER 'emp_user'@'localhost' IDENTIFIED BY 'karyawan!';
GRANT ALL PRIVILEGES ON employee_app.* TO 'emp_user'@'localhost';
FLUSH PRIVILEGES;
"
```

### Docker Setup

#### Build Images

```bash
# Backend image
cd employee-app/employee-be
docker build -t adelyao/employee-be:latest .

# Frontend image
cd employee-app/employee-fe
docker build -t adelyao/employee-fe:latest .
```

#### Run with Docker Compose

```bash
cd employee-app
docker-compose up -d
```

---

### Kubernetes Deployment

#### Prerequisites

- Kubernetes cluster running
- kubectl configured
- kustomize installed

#### Deploy to Development Environment

```bash
# Navigate to manifests
cd employee-app/employee-manifest

# Deploy to development
kubectl apply -k overlays/dev

# Verify deployment
kubectl get deployments -n default
kubectl get pods -n default
kubectl get services -n default
```

#### Access Services

```bash
# Backend (port-forward)
kubectl port-forward svc/dev-backend-service 4000:4000

# Frontend (port-forward)
kubectl port-forward svc/dev-frontend-service 8080:8080

# Database (port-forward)
kubectl port-forward svc/dev-db 3306:3306
```

#### Deploy Staging/Production

```bash
# Staging
kubectl apply -k overlays/stag

# Production (3 replicas)
kubectl apply -k overlays/prod
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Employee Endpoints

All employee endpoints require `Authorization: Bearer <token>` header

#### List Employees

```http
GET /api/employees

Response:
[
  {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "position": "Senior Developer",
    "salary": 75000,
    "phone": "+62812345678",
    "department": "Engineering",
    "hired_date": "2023-01-15"
  }
]
```

#### Get Employee

```http
GET /api/employees/:id
```

#### Create Employee

```http
POST /api/employees
Content-Type: application/json

{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "position": "Product Manager",
  "salary": 80000,
  "phone": "+62812345679",
  "department": "Product"
}
```

#### Update Employee

```http
PUT /api/employees/:id
Content-Type: application/json

{
  "name": "Bob Johnson",
  "position": "Senior Product Manager",
  "salary": 90000
}
```

#### Delete Employee

```http
DELETE /api/employees/:id
```

#### Health Check

```http
GET /api/health

Response: "OK"
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employee_app
DB_USER=emp_user
DB_PASS=karyawan!

# Frontend
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# Security
BCRYPT_SALT_ROUNDS=10

# Logging
LOG_LEVEL=debug
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:4000/api
```

### Kubernetes ConfigMap (configmap.yaml)

```yaml
DB_NAME: 'employee_app'
DB_HOST: 'db'
DB_PORT: '3306'
FRONTEND_URL: 'http://localhost:30080'
```

### Kubernetes Secret (secret.yaml)

Credentials are base64 encoded:

```yaml
DB_USER: 'ZW1wX3VzZXI=' # emp_user
DB_PASSWORD: 'a2FyeWF3YW4h' # karyawan!
MYSQL_ROOT_PASSWORD: 'YWRtaW4=' # admin
```

---

## 🔄 CI/CD Pipeline

The Jenkins pipeline automates the build and deployment process:

### Pipeline Stages

1. **Prepare Workspace**: Clean and checkout code
2. **Install yq**: Install YAML processor for manifest updates
3. **Build and Push Docker Images**: Build and push to Docker Hub
4. **Update Manifests**: Update Kubernetes manifests with new image tags
5. **ArgoCD Sync**: Trigger ArgoCD for automatic deployment

### Running the Pipeline

```bash
# Trigger via Jenkins UI or CLI
# The pipeline will:
# 1. Build backend and frontend Docker images
# 2. Tag with branch name and build number
# 3. Push to Docker Hub registry
# 4. Update Kubernetes manifests for all environments
# 5. Auto-sync with ArgoCD (if enabled)
```

---

## 🔒 Security

### Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with configurable salt rounds
- **CORS**: Restricted to frontend URL
- **RBAC**: Kubernetes role-based access control
- **Network Policies**: Pod-to-pod communication restrictions
- **Security Context**: Non-root user execution
- **Secrets Management**: Kubernetes secrets for sensitive data
- **Auth Middleware**: Route protection

### Best Practices

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Rotate secrets regularly
- Enable HTTPS in production
- Implement rate limiting (future enhancement)
- Regular security audits

---

## 🐛 Troubleshooting

### Backend Issues

#### Database Connection Error

```
Error: Unable to connect to database
```

**Solution**:

- Verify MySQL is running: `docker ps | grep mysql`
- Check database credentials in `.env`
- Ensure DB_HOST is correct (localhost for local, service name for K8s)

#### JWT Token Expired

```
Error: Invalid/Expired token
```

**Solution**:

- Re-login to get new token
- Check JWT_EXPIRES_IN setting
- Verify JWT_SECRET is consistent

### Frontend Issues

#### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:

- Ensure VITE_API_URL matches backend CORS origin
- Check FRONTEND_URL in backend .env
- Verify backend CORS middleware configuration

#### Vite not starting

```
Error: Cannot find module
```

**Solution**:

- Run `npm install` to install dependencies
- Clear node_modules: `rm -rf node_modules && npm install`

### Kubernetes Issues

#### Pod not starting

```
kubectl get pods
# Check pod status
kubectl describe pod <pod-name>
```

**Solution**:

- Check image availability: `kubectl logs <pod-name>`
- Verify resource limits
- Check secrets and configmaps exist

#### Service unreachable

```
kubectl port-forward svc/<service-name> <port>:<port>
```

**Solution**:

- Verify service selector matches pod labels
- Check network policies aren't blocking traffic
- Ensure pods are running and healthy

#### Image pull errors

```
Failed to pull image
```

**Solution**:

- Verify image exists in registry
- Check imagePullPolicy setting
- Verify registry credentials

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Sequelize ORM](https://sequelize.org/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kustomize Guide](https://kustomize.io/)
- [JWT.io](https://jwt.io/)

---

## 📝 License

This project is part of PKL (Praktik Kerja Lapangan) - Internship Program

---

## 👥 Authors

- **Developer**: Octavian Adelya
- **Registry**: docker.io/adelyao

---

## 📞 Support

For issues and questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review Kubernetes logs: `kubectl logs <pod-name>`
3. Check backend server logs during local development
4. Verify configuration in `.env` files

---

**Last Updated**: November 2025
