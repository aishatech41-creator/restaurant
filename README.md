# Kuka Exclusive Restaurant Application

A full-stack restaurant management and ordering system with a modern, responsive UI and comprehensive backend API.

## Overview

Kuka Exclusive Restaurant is a complete e-commerce platform for online food ordering and restaurant management. The application features a sleek dark theme with gold accents, seamless user authentication, food catalog management, shopping cart functionality, and integrated payment processing.

---

## Tech Stack

### Frontend
- **React** 18.1.0 with TypeScript
- **TailwindCSS** 4.0 - Custom theme with dark restaurant aesthetic and gold accents
- **React Router DOM** 6.3.0 - Client-side routing
- **Axios** 1.13.2 - HTTP client for API requests
- **Framer Motion** 6.3.10 - Smooth animations and transitions
- **React Leaflet** 4.2.1 - Interactive maps integration
- **React Icons** 4.4.0 - Icon library
- **React Toastify** 9.0.3 - Toast notifications
- **Flutterwave React** 1.3.2 - Payment processing

### Backend
- **Laravel** 12.0 - Modern PHP framework
- **PHP** 8.2+ - Language runtime
- **Laravel Sanctum** 4.0 - API authentication
- **Vite** 7.0.7 - Build tool
- **Tailwind CSS** 4.0 - Styling for admin panel
- **SQLite/MySQL** - Database (via Laravel)

### Testing & Development
- **PHPUnit** 11.5.3 - Backend testing
- **Jest & React Testing Library** - Frontend testing
- **Laravel Sail** - Docker-based local development
- **Prettier & ESLint** - Code formatting and linting

---

## Features

### User Features
- ✅ **User Authentication** - Register, login, and secure logout with Sanctum tokens
- ✅ **Food Catalog** - Browse restaurant menu with filtering by categories
- ✅ **Shopping Cart** - Add/remove items, view cart, clear cart
- ✅ **Order Management** - Place orders, track order status, view order history
- ✅ **Payment Integration** - Secure checkout with Flutterwave payment gateway
- ✅ **User Profile** - View and update user information
- ✅ **Location Tracking** - Interactive map for delivery location
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Real-time Notifications** - Toast notifications for actions and updates

### Admin Features
- ✅ **Food Management** - Create, read, update, and delete food items
- ✅ **Image Upload** - Upload food images with file handling
- ✅ **Order Tracking** - View and manage all orders
- ✅ **Inventory Control** - Manage food availability and pricing
- ✅ **Admin Dashboard** - Centralized admin panel for operations

---

## Project Structure

```
Restaurant/
├── frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Admin/          # Admin dashboard components
│   │   │   ├── Cart/           # Cart management components
│   │   │   ├── Checkout/       # Checkout process components
│   │   │   ├── FoodItem/       # Food item display
│   │   │   ├── Filters/        # Category/filter components
│   │   │   ├── Header/         # Navigation header
│   │   │   ├── Footer/         # Footer section
│   │   │   ├── Contact/        # Contact form components
│   │   │   ├── Sections/       # Layout sections
│   │   │   ├── Showcase/       # Showcase components
│   │   │   └── ...
│   │   ├── Pages/              # Page components
│   │   │   ├── Home/           # Landing page
│   │   │   ├── Menu/           # Food menu page
│   │   │   ├── Admin/          # Admin dashboard
│   │   │   ├── Auth/           # Login/Register pages
│   │   │   ├── Profile/        # User profile
│   │   │   ├── About/          # About page
│   │   │   └── Services/       # Services page
│   │   ├── services/           # API service modules
│   │   │   ├── authService.js
│   │   │   ├── foodService.js
│   │   │   ├── cartService.js
│   │   │   └── orderService.js
│   │   ├── context/            # React Context for state management
│   │   │   ├── StateProvider.js
│   │   │   ├── reducer.js
│   │   │   └── initialState.js
│   │   ├── utils/              # Utility functions and constants
│   │   │   ├── categories.tsx
│   │   │   ├── filters.tsx
│   │   │   ├── functions.tsx
│   │   │   ├── showcaseStatic.tsx
│   │   │   └── fetchSessionData.js
│   │   ├── api/                # Axios configuration
│   │   ├── img/                # Images and media
│   │   └── App.tsx             # Main app component
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend (Laravel API)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/    # API controllers
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── FoodController.php
│   │   │   │   ├── CartController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   └── UploadController.php
│   │   │   └── Middleware/
│   │   ├── Models/             # Database models
│   │   │   ├── User.php
│   │   │   ├── Food.php
│   │   │   ├── Order.php
│   │   │   └── CartItem.php
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/         # Database migrations
│   │   ├── seeders/            # Database seeders
│   │   └── factories/          # Model factories
│   ├── routes/
│   │   ├── api.php             # API routes
│   │   ├── web.php             # Web routes
│   │   └── console.php         # Console commands
│   ├── storage/                # File storage
│   ├── public/
│   │   ├── storage/            # Public file storage (uploads)
│   │   └── index.php           # Entry point
│   ├── resources/              # View resources
│   ├── config/                 # Configuration files
│   ├── bootstrap/              # Bootstrap files
│   ├── tests/                  # Test files
│   ├── composer.json           # PHP dependencies
│   ├── vite.config.js          # Vite build configuration
│   ├── artisan                 # Laravel CLI
│   └── .env.example            # Environment variables template
│
├── public/                     # React build output
├── build/                      # Production builds
├── tsconfig.json               # TypeScript configuration
├── package.json                # Root dependencies
├── CHANGELOG.md                # Version history
└── README.md                   # This file
```

---

## API Endpoints

### Authentication (Public)
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Food (Public)
- `GET /api/food` - Get all food items

### Protected Routes (Require Authentication)

**Authentication:**
- `POST /api/logout` - User logout
- `POST /api/update` - Update user profile

**Orders:**
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `PUT /api/orders/{id}` - Update order status

**Food (Admin Only):**
- `POST /api/food` - Create food item
- `POST /api/food/update/{id}` - Update food item
- `DELETE /api/food/{id}` - Delete food item

**Cart:**
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/{id}` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

**Upload:**
- `POST /api/upload` - Upload file (images)

---

## Getting Started

### Prerequisites
- **PHP** 8.2 or higher
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Composer** for PHP dependencies
- **XAMPP** or similar local server (for local development)
- **MySQL** or compatible database

### Installation

#### 1. Navigate to Repository
```bash
cd c:\xampp\htdocs\Restaurant
```

#### 2. Install Backend Dependencies
```bash
cd backend
composer install
```

#### 3. Setup Laravel Environment
```bash
copy .env.example .env
php artisan key:generate
php artisan migrate
```

#### 4. Install Frontend Dependencies
```bash
cd ..
npm install
```

#### 5. Build Frontend Assets
```bash
npm run build
```

### Running the Application

#### Development Mode
```bash
# Terminal 1 - Start Laravel development server
cd backend
php artisan serve

# Terminal 2 - Start frontend development server (from root)
npm start
```

#### Production Build
```bash
cd backend
composer install --optimize-autoloader --no-dev
npm run build
php artisan migrate --force
```

---

## Configuration

### Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```env
APP_NAME="Kuka Restaurant"
APP_ENV=local
APP_KEY=base64:xxxxxxxxxxxxx
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8000
SESSION_DOMAIN=localhost

FRONTEND_URL=http://localhost:3000
```

### Tailwind Theme Customization
Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: "#1f1f1f",           // Dark background
  secondary: "#2d2d2d",         // Cards/sections
  accent: "#f59e0b",            // Gold accents
  lightGray: "#d1d5db",         // Light gray
  headingColor: "#f3f4f6",      // Headings
  textColor: "#9ca3af",         // Body text
  cartNumBg: "#e80013",         // Red for badges
  cardOverlay: "rgba(0, 0, 0, 0.6)",
  containerbg: "#2d2d2d",
  cartBg: "#1a1a1a",
}
```

---

## Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed with bcrypt)
- phone (Optional)
- address (Optional)
- city (Optional)
- created_at, updated_at

### Food Table
- id (Primary Key)
- name
- description (Text)
- category (String)
- price (Decimal)
- image_url (String)
- availability (Boolean)
- created_at, updated_at

### Orders Table
- id (Primary Key)
- user_id (Foreign Key → Users)
- total_amount (Decimal)
- status (pending|confirmed|delivered)
- delivery_address (Text)
- created_at, updated_at

### CartItems Table
- id (Primary Key)
- user_id (Foreign Key → Users)
- food_id (Foreign Key → Food)
- quantity (Integer)
- created_at, updated_at

---

## Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
cd backend
php artisan test
```

---

## File Upload

The application supports image uploads for food items:
- **Location:** `backend/public/storage/`
- **Allowed Types:** JPG, PNG, GIF, WebP
- **Max Size:** 5MB (configurable in `.env`)

Ensure the storage directory is properly configured:
```bash
cd backend
php artisan storage:link
```

---

## Payment Integration

The application uses **Flutterwave** for payment processing:
1. Sign up at [Flutterwave](https://flutterwave.com)
2. Obtain your public and secret keys
3. Add your public key to frontend Flutterwave component configuration
4. Implement payment verification on the backend
5. Payment processing is handled during checkout

---

## Frontend Architecture

### State Management
- **React Context API** for global state
- **useReducer** hook for complex state logic
- Persistent state storage in localStorage
- Context provider wrapping entire application

### Component Structure
- Functional components with React Hooks
- TypeScript for type safety
- Reusable UI components in `src/components/`
- Page components in `src/Pages/`
- Service modules for API calls

### CSS Styling
- **Tailwind CSS** for utility-first styling
- Custom theme in `tailwind.config.js`
- Dark mode optimized design
- Responsive mobile-first approach
- Glass-morphism effects for modern UI

---

## Backend Architecture

### MVC Pattern
- **Models** in `app/Models/` with Eloquent relationships
- **Controllers** in `app/Http/Controllers/` handling business logic
- **Routes** defined in `routes/api.php` with middleware protection

### API Authentication
- **Laravel Sanctum** for token-based API authentication
- Stateful CORS configuration
- Middleware-protected routes for sensitive operations
- Token expiration and refresh mechanisms

### Database
- **Eloquent ORM** for database operations
- Model relationships (hasMany, belongsTo)
- Database migrations for version control
- Seeders for test data population

---

## Performance Optimizations

- ✅ Code splitting for React components
- ✅ Image optimization and lazy loading
- ✅ Database query optimization with eager loading
- ✅ API response caching (configurable)
- ✅ TailwindCSS JIT compilation
- ✅ Production build minification
- ✅ Gzip compression support

---

## Troubleshooting

### CORS Issues
Ensure `SANCTUM_STATEFUL_DOMAINS` in `.env` matches your frontend URL and that CORS is properly configured in `config/cors.php`.

```bash
# Clear Laravel cache
php artisan config:cache
```

### Database Connection Error
Verify MySQL is running and credentials in `.env` are correct:
```bash
# Test connection
php artisan tinker
# Type: \DB::connection()->getPdo();
```

### Image Upload Not Working
Check storage directory permissions:
```bash
# Windows - Ensure folder exists
mkdir backend\storage\app\public
php artisan storage:link

# Check file permissions
icacls "backend/storage" /grant:r "%username%:F" /t
```

### Frontend Dependencies Missing
```bash
# Clean install
rm -r node_modules package-lock.json
npm ci

# Or rebuild
npm install --legacy-peer-deps
```

### Laravel Artisan Commands Failing
```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

---

## Development Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes following code standards
3. Test locally in both development and production modes
4. Run tests: `npm test` and `php artisan test`
5. Commit with meaningful messages: `git commit -m "feat: add feature"`
6. Create pull request for code review

### Code Standards
- **PHP:** PSR-12 style guide
- **JavaScript/TypeScript:** ESLint configuration
- **React:** Functional components with hooks
- **Comments:** Clear documentation for complex logic

---

## Directory Permissions

For proper file uploads and storage on Windows:
```bash
# Create necessary directories
mkdir backend\storage\app\public
mkdir backend\public\storage

# Run storage link command
php artisan storage:link
```

---

## Security Considerations

- ✅ All passwords hashed with bcrypt (10 rounds)
- ✅ API endpoints protected with Sanctum tokens
- ✅ CORS configured for secure cross-origin requests
- ✅ Input validation on all endpoints (server-side)
- ✅ SQL injection prevention via Eloquent ORM with parameterized queries
- ✅ CSRF protection enabled for form requests
- ✅ Rate limiting available (configurable in middleware)
- ✅ File uploads scanned and restricted by type
- ✅ Authorization checks on protected routes
- ✅ Environment variables for sensitive data

---

## Contributing

Before submitting contributions:
1. Follow PSR-12 (PHP) and React/TypeScript best practices
2. Write unit tests for new features
3. Update documentation for API changes
4. Ensure no console errors or warnings
5. Test on both desktop and mobile viewports
6. Run linters: `npm run lint` (if configured)

---

## License

This project is proprietary software. All rights reserved.

---

## Support & Contact

For issues, questions, or feature requests, please contact the development team or create an issue in the project repository.

---

## Live Demo

To see a live demo of the application, visit: [https://zone-restaurant.vercel.app/](https://zone-restaurant.vercel.app/)

---

## Changelog

See [CHANGELOG.md](./backend/CHANGELOG.md) for version history and updates.

---

**Last Updated:** February 8, 2026
**Version:** 1.0.0
