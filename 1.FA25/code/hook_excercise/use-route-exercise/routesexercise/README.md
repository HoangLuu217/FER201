# React Router Exercises

This project demonstrates React Router v6 implementation with three comprehensive exercises covering basic routing, dynamic routing, and nested routes.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📚 Exercises Overview

### Exercise 1: Basic Routing and Navigation
**Objective**: Understand how to define routes and use navigation links.

**Features Implemented**:
- ✅ Three main pages: Home (`/`), Products (`/san-pham`), Contact (`/lien-he`)
- ✅ Navigation bar with `NavLink` components
- ✅ Active state highlighting for current page
- ✅ Responsive design with modern UI

**Key Components**:
- `Navbar.jsx` - Navigation component with active state management
- `Home.jsx` - Landing page with feature cards
- `Products.jsx` - Product listing with links to detail pages
- `Contact.jsx` - Contact information and form

**Key Concepts Demonstrated**:
- `BrowserRouter` setup in `index.js`
- `Routes` and `Route` components for route definition
- `NavLink` with active state styling
- Basic navigation structure

### Exercise 2: Dynamic Routing and Programmatic Navigation
**Objective**: Use dynamic parameters (`useParams`) and programmatic navigation (`useNavigate`).

**Features Implemented**:
- ✅ Dynamic route `/san-pham/:productId` for product details
- ✅ Product listing with links to individual products (IDs: 101, 102, 103)
- ✅ `useParams()` hook to extract product ID from URL
- ✅ `useNavigate()` hook for programmatic navigation
- ✅ "Back to Products" button functionality

**Key Components**:
- `ProductDetail.jsx` - Dynamic product detail page
- Enhanced `Products.jsx` - Product grid with detail links

**Key Concepts Demonstrated**:
- Dynamic route parameters with `:productId`
- `useParams()` hook for accessing URL parameters
- `useNavigate()` hook for programmatic navigation
- Error handling for non-existent products

### Exercise 3: Nested Routes and Layout Management
**Objective**: Apply nested routes to build an admin dashboard layout.

**Features Implemented**:
- ✅ Dashboard layout with sidebar navigation
- ✅ Nested routes for `/dashboard`, `/dashboard/settings`, `/dashboard/reports`
- ✅ `Outlet` component for rendering child routes
- ✅ Shared layout across dashboard pages
- ✅ Index route for dashboard home

**Key Components**:
- `DashboardLayout.jsx` - Main dashboard layout with sidebar
- `DashboardHome.jsx` - Dashboard home page with statistics
- `Settings.jsx` - Settings page with form controls
- `Reports.jsx` - Reports page with mock data and charts

**Key Concepts Demonstrated**:
- Nested route structure
- `Outlet` component for child route rendering
- Layout sharing and code organization
- Index routes for default child content

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Main navigation component
│   └── Navbar.css         # Navigation styles
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Products.jsx       # Product listing
│   ├── Contact.jsx        # Contact page
│   ├── ProductDetail.jsx  # Dynamic product detail
│   ├── DashboardLayout.jsx # Dashboard layout
│   ├── DashboardLayout.css # Dashboard styles
│   ├── DashboardHome.jsx  # Dashboard home
│   ├── Settings.jsx       # Settings page
│   └── Reports.jsx        # Reports page
├── App.js                 # Main app with routing
├── App.css               # Global styles
├── index.js              # App entry point with BrowserRouter
└── index.css            # Base styles
```

## 🎯 Key Learning Points

### 1. Router Setup
```jsx
// index.js
import { BrowserRouter } from 'react-router-dom';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. Basic Routing
```jsx
// App.js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/san-pham" element={<Products />} />
  <Route path="/lien-he" element={<Contact />} />
</Routes>
```

### 3. Dynamic Routing
```jsx
<Route path="/san-pham/:productId" element={<ProductDetail />} />

// In ProductDetail.jsx
const { productId } = useParams();
```

### 4. Programmatic Navigation
```jsx
const navigate = useNavigate();

const handleGoBack = () => {
  navigate('/san-pham');
};
```

### 5. Nested Routes
```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
  <Route path="reports" element={<Reports />} />
</Route>

// In DashboardLayout.jsx
<Outlet />
```

### 6. Active Navigation
```jsx
<NavLink 
  to="/san-pham"
  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
>
  Sản Phẩm
</NavLink>
```

## 🎨 Styling Features

- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Modern UI**: Clean, professional design with subtle shadows and transitions
- **Active States**: Visual feedback for current page in navigation
- **Component Styling**: Modular CSS files for each major component
- **Color Scheme**: Professional blue-gray palette

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📖 Additional Resources

- [React Router v6 Documentation](https://reactrouter.com/)
- [React Router Migration Guide](https://reactrouter.com/en/main/upgrading/v5)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)

## 🎓 Exercise Benefits

1. **Exercise 1** teaches fundamental routing concepts and navigation patterns
2. **Exercise 2** demonstrates dynamic content and programmatic navigation
3. **Exercise 3** shows advanced layout management and code organization

Each exercise builds upon the previous one, creating a comprehensive understanding of React Router v6 capabilities.

---

**Note**: This project uses React Router v6, which has significant changes from v5. The exercises are designed to showcase modern React Router patterns and best practices.