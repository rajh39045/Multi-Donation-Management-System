# Multi Donation Coordination System

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-00D1B2?style=for-the-badge&logo=mongodb&logoColor=white" alt="Tech Stack">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status">
</p>

---

## 📌 Project Description

**Multi Donation Coordination System** is a comprehensive full-stack web application designed to streamline the process of managing donations (food, money, and clothes) efficiently. The system facilitates coordination between donors, volunteers, NGOs, and administrators through a transparent and automated workflow.

This platform enables donors to contribute various types of donations, allows volunteers and NGOs to request available donations, and provides administrators with full control over the donation lifecycle. The system also generates digital certificates for eligible donors as a token of appreciation.

---

## ✨ Key Features

### 🔹 User Management
- **Role-based Registration & Authentication**: Support for DONOR, VOLUNTEER, NGO, and ADMIN roles
- **Secure JWT-based Authentication**: Protected routes with token verification
- **Profile Management**: Users can view and update their profiles

### 🔹 Donation Management
- **Multiple Donation Types**: Food, Money, and Clothes donations
- **Create Donations**: Donors can create new donations with type-specific details
- **Status Tracking**: Track donation status (PENDING → MATCHED → COMPLETED)
- **My Donations Dashboard**: View personal donation history

### 🔹 Request System
- **Request Donations**: Volunteers and NGOs can request available donations
- **Approve/Reject Requests**: Donors can approve or reject incoming requests
- **Automated Status Updates**: Donation status updates automatically on approval

### 🔹 Certificate Generation
- **Automatic Eligibility Check**: Certificates generated when donors meet criteria (5+ donations OR ₹5000+ total)
- **PDF Download**: Professional PDF certificates with unique certificate IDs
- **Digital Verification**: Unique certificate IDs for verification

### 🔹 Admin Controls
- **Full System Overview**: Admin can view all donations system-wide
- **Status Management**: Admin can update donation statuses directly
- **User Management**: Track total donations and cases handled

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **React Router DOM 7** | Client-side Routing |
| **Tailwind CSS 4** | Styling |
| **Framer Motion** | Animations |
| **Axios** | HTTP Client |
| **React Hot Toast** | Notifications |
| **React Icons** | Icon Library |
| **Vite** | Build Tool |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express.js** | Web Framework |
| **MongoDB / Mongoose** | Database & ODM |
| **JSON Web Token (JWT)** | Authentication |
| **Bcrypt.js** | Password Hashing |
| **PDFKit** | PDF Generation |
| **QRCode** | QR Code Generation |
| **UUID** | Unique ID Generation |
| **CORS** | Cross-Origin Resource Sharing |
| **Dotenv** | Environment Variables |

---

## 📂 Project Structure

```
FoodManagementSystem/
├── 📂 client/                    # React Frontend
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 api/               # API Service Layer
│   │   │   ├── authApi.js
│   │   │   ├── axiosInstance.js
│   │   │   └── donationApi.js
│   │   ├── 📂 app/
│   │   │   └── AppRoutes.jsx      # Main Route Configuration
│   │   ├── 📂 assets/            # Static Assets
│   │   ├── 📂 components/       # Reusable Components
│   │   │   ├── 📂 home/          # Home Page Components
│   │   │   └── 📂 layout/       # Layout Components
│   │   ├── 📂 context/           # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── 📂 hooks/             # Custom Hooks
│   │   ├── 📂 layouts/           # Page Layouts
│   │   ├── 📂 pages/             # Page Components
│   │   │   ├── Certificates.jsx
│   │   │   ├── CreateDonation.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Donations.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyDonations.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Requests.jsx
│   │   ├── 📂 routes/            # Route Protection
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleProtectedRoute.jsx
│   │   ├── 📂 services/         # Service Layer
│   │   ├── 📂 utils/            # Utilities
│   │   ├── index.css             # Global Styles
│   │   └── main.jsx              # Entry Point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── 📂 server/                    # Express Backend
│   ├── 📂 config/               # Configuration Files
│   ├── 📂 controllers/         # Business Logic
│   │   ├── authController.js
│   │   ├── certificateController.js
│   │   ├── donationController.js
│   │   └── requestController.js
│   ├── 📂 middleware/          # Middleware Functions
│   │   └── authMiddleware.js
│   ├── 📂 models/              # Mongoose Models
│   │   ├── Certificate.js
│   │   ├── Donation.js
│   │   ├── Request.js
│   │   └── User.js
│   ├── 📂 routes/              # API Routes
│   │   ├── authRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── donationRoutes.js
│   │   └── requestRoutes.js
│   ├── 📂 utils/               # Utility Functions
│   ├── package.json
│   └── server.js               # Server Entry Point
│
├── 📄 README.md
├── 📄 TODO.md
└── 📄 package.json            # Root package.json (optional)
```

---

## 🚀 Installation Steps

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/FoodManagementSystem.git
cd FoodManagementSystem
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=4000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/multidonation
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/multidonation

# JWT Secret Key
JWT_SECRET=your_super_secret_key_here_min_32_chars
```

### Step 4: Start the Backend Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

### Step 5: Install Frontend Dependencies

Open a new terminal and navigate to the client folder:

```bash
cd client
npm install
```

### Step 6: Start the Frontend Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 🚀 Quick Start (Both servers together)

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

---

## 🔐 Environment Variables

### Server (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `4000` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/multidonation` |
| `JWT_SECRET` | JWT secret key for token generation | Yes | `your_secret_key_min_32_characters` |

---

## 📱 Usage Instructions

### User Registration

1. Navigate to the registration page
2. Fill in the required details:
   - **Full Name**
   - **Email Address**
   - **Password**
   - **Role** (Donor/Volunteer/NGO)
   - **Location**
3. Click "Register" button
4. Redirected to login page upon success

### User Login

1. Enter email and password
2. Click "Login" button
3. Redirected to dashboard based on role

### Dashboard Access by Role

| Role | Access Features |
|------|-----------------|
| **DONOR** | Create Donation, My Donations, Requests, Profile, Certificates |
| **VOLUNTEER** | Available Donations, Profile |
| **NGO** | Available Donations, Profile |
| **ADMIN** | All Donations, Status Management, Full System Access |

### Creating a Donation (Donor Role)

1. Navigate to "Create Donation" from sidebar
2. Select donation type (Food/Money/Clothes)
3. Based on type:
   - **Money**: Enter amount in INR
   - **Food/Clothes**: Enter quantity
4. Enter pickup location
5. Submit donation
6. Status changes from PENDING → MATCHED → COMPLETED

### Requesting a Donation (NGO/Volunteer Role)

1. Navigate to "Donations" page
2. View available donations
3. Click "Request" on desired donation
4. Donor receives notification and can approve/reject

### Certificate Download

1. Navigate to "Certificates" page
2. View eligible certificates
3. Click "Download" to get PDF certificate

---

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |

### Donation Routes (`/api/donations`)

| Method | Endpoint | Description | Auth Required | Access |
|--------|----------|-------------|---------------|--------|
| POST | `/` | Create donation | Yes | DONOR |
| GET | `/my` | Get my donations | Yes | DONOR |
| GET | `/` | Get all donations | Yes | ALL |
| GET | `/all` | Get all donations (admin) | Yes | ADMIN |
| PUT | `/:id` | Update donation status | Yes | ADMIN |

### Request Routes (`/api/requests`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create request | Yes |
| GET | `/` | Get all requests | Yes |
| PATCH | `/:id/approve` | Approve request | Yes |

### Certificate Routes (`/api/certificates`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/:id` | Download certificate PDF | Yes |

### Protected Test Route

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/test` | Test protected route | Yes |

---

## 🗄️ Database Schema

### Users Collection (`users`)

```javascript
{
  _id: ObjectId,
  name: String,           // Required
  email: String,         // Required, Unique
  password: String,      // Required, Hashed
  role: String,          // Enum: ["DONOR", "VOLUNTEER", "NGO", "ADMIN"]
  location: String,
  totalDonations: Number, // Default: 0
  totalCasesHandled: Number, // Default: 0
  createdAt: Date,
  updatedAt: Date
}
```

### Donations Collection (`donations`)

```javascript
{
  _id: ObjectId,
  donor: ObjectId,       // Ref: User
  type: String,         // Enum: ["FOOD", "MONEY", "CLOTHES"]
  amount: Number,       // For MONEY type
  quantity: Number,    // For FOOD/CLOTHES type
  location: String,    // Required
  status: String,      // Enum: ["PENDING", "MATCHED", "COMPLETED"]
  createdAt: Date,
  updatedAt: Date
}
```

### Requests Collection (`requests`)

```javascript
{
  _id: ObjectId,
  donation: ObjectId,   // Ref: Donation
  requestedBy: ObjectId, // Ref: User
  status: String,      // Enum: ["PENDING", "APPROVED", "REJECTED"]
  createdAt: Date,
  updatedAt: Date
}
```

### Certificates Collection (`certificates`)

```javascript
{
  _id: ObjectId,
  user: ObjectId,       // Ref: User
  type: String,         // Enum: ["DONOR", "VOLUNTEER"]
  totalDonations: Number,
  certificateId: String, // Unique
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📸 Screenshots

> _Placeholders for project screenshots_

### 🏠 Home Page
```
[Screenshot: Home Page - Landing page with hero section]
```

### 🔐 Login Page
```
[Screenshot: Login Page - User login form]
```

### 📝 Registration Page
```
[Screenshot: Registration Page - User registration form]
```

### 📊 Dashboard
```
[Screenshot: Dashboard - Overview with statistics cards]
```

### 🎁 Create Donation
```
[Screenshot: Create Donation Page - Donation creation form]
```

### 📜 Certificates
```
[Screenshot: Certificates Page - List of downloadable certificates]
```

---

## 🚨 Error Handling

| Error Type | Message | Solution |
|------------|---------|----------|
| 400 | User already exists | Use different email |
| 400 | Invalid credentials | Check email/password |
| 401 | No token provided | Login first |
| 401 | Token invalid | Re-login |
| 403 | Access denied | Insufficient permissions |
| 404 | Donation not found | Check donation ID |
| 500 | Server error | Contact administrator |

---

## 🔮 Future Enhancements

### Phase 1: Enhanced Features
- [ ] Email notifications for donation status updates
- [ ] Real-time chat between donors and recipients
- [ ] Donation pickup scheduling with calendar integration
- [ ] Mobile app development (React Native)

### Phase 2: Advanced Analytics
- [ ] Admin dashboard with charts and analytics
- [ ] Donation impact visualization
- [ ] Social sharing of contributions
- [ ] Leaderboard for top donors

### Phase 3: Integration
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] NGO verification system
- [ ] Government API integration
- [ ] Blockchain for transparent transactions

### Phase 4: Scaling
- [ ] Multi-language support
- [ ] Microservices architecture
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [github.com/your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database
- [React](https://react.dev/) for the frontend library
- [Express.js](https://expressjs.com/) for the backend framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- All contributors and open-source community

---

<p align="center">
  Made with ❤️ for a better world
</p>
