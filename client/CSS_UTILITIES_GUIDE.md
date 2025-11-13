# yourDukaan - Modern CSS Utilities Guide

## 🎨 Enhanced UI Features

### Button Styles
```tsx
// Primary button - Emerald green with hover effects
<button className="btn-primary">Shop Now</button>

// Secondary button - Orange with hover effects  
<button className="btn-secondary">Learn More</button>

// Outline button - Transparent with border
<button className="btn-outline">View Details</button>
```

### Card Components
```tsx
// Standard card with hover effect
<div className="card">
  <p>Content here</p>
</div>

// Product card with special hover
<div className="card-product">
  <img src="..." />
  <h3>Product Name</h3>
</div>
```

### Modern Input Fields
```tsx
// Standard input
<input className="input-field" placeholder="Enter text..." />

// Error state input
<input className="input-field input-error" />
```

### Badges
```tsx
<span className="badge badge-success">In Stock</span>
<span className="badge badge-warning">Low Stock</span>
<span className="badge badge-danger">Out of Stock</span>
```

### Navigation Links
```tsx
<a className="nav-link">Products</a>
<a className="nav-link nav-link-active">Home</a>
```

### Special Effects
```tsx
// Glassmorphism
<div className="glass p-6">
  Blurred background effect
</div>

// Gradient text
<h1 className="gradient-text">yourDukaan</h1>

// Glow on hover
<div className="glow-on-hover">
  Glowing emerald effect on hover
</div>

// Image zoom on hover
<div className="image-zoom">
  <img src="..." alt="Product" />
</div>
```

### Animations
```tsx
// Fade in on mount
<div className="fade-in">Content</div>

// Slide in from left
<div className="slide-in">Content</div>

// Pulse animation
<div className="pulse-animate">Notification</div>
```

### Typography
```tsx
// Section heading with underline
<h2 className="section-heading">Featured Products</h2>

// Price display
<span className="price-tag">$99.99</span>

// Star rating
<div className="star-rating">
  ⭐⭐⭐⭐⭐
</div>
```

### Alerts
```tsx
<div className="alert alert-success">
  Success message
</div>

<div className="alert alert-error">
  Error message  
</div>

<div className="alert alert-warning">
  Warning message
</div>

<div className="alert alert-info">
  Info message
</div>
```

### Loading States
```tsx
// Spinner
<div className="loading-spinner w-12 h-12"></div>

// Skeleton loading
<div className="skeleton h-32 w-full"></div>
```

### Special Components
```tsx
// Discount badge (absolute positioned)
<div className="discount-badge">-20%</div>

// Floating action button
<button className="fab">
  +
</button>

// Feature box
<div className="feature-box">
  <h3>Fast Delivery</h3>
  <p>Get your orders in 2 days</p>
</div>
```

## 🎯 Design Features

### Modern Enhancements:
✅ **Smooth Animations** - All interactions are smooth with 300ms transitions
✅ **Hover Effects** - Cards lift up, buttons glow, images zoom
✅ **Custom Scrollbar** - Emerald green themed scrollbar
✅ **Glassmorphism** - Modern frosted glass effects
✅ **Shadow System** - Layered shadows for depth
✅ **Focus States** - Accessible focus rings on all interactive elements
✅ **Dark Mode** - Full dark mode support with adjusted colors
✅ **Responsive** - All utilities work across all screen sizes

### Color System:
- **Primary (Emerald)**: Trust, growth, confirmation actions
- **Secondary (Orange)**: Energy, urgency, call-to-actions
- **Accent (Amber)**: Highlights, warnings, attention
- **Backgrounds**: Clean slate gray with dark mode support

### Key Improvements:
1. **Better Contrast** - Improved readability
2. **Smooth Transitions** - No jarring movements
3. **Hover Feedback** - Clear interactive states
4. **Loading States** - Skeleton screens and spinners
5. **Error Handling** - Clear error states and messages
6. **Accessibility** - Focus rings and ARIA-friendly

## 🚀 Usage Tips

### For Product Cards:
```tsx
<div className="card-product image-zoom fade-in">
  <div className="discount-badge">-25%</div>
  <img src="product.jpg" alt="Product" />
  <h3 className="text-lg font-semibold mt-4">Product Name</h3>
  <div className="star-rating mt-2">⭐⭐⭐⭐⭐</div>
  <p className="price-tag mt-2">$79.99</p>
  <button className="btn-primary w-full mt-4">Add to Cart</button>
</div>
```

### For Hero Section:
```tsx
<section className="glass p-12 rounded-3xl">
  <h1 className="gradient-text text-6xl">
    Welcome to yourDukaan
  </h1>
  <p className="text-xl mt-4">Your Store, Your Way!</p>
  <button className="btn-primary glow-on-hover mt-8">
    Start Shopping
  </button>
</section>
```

### For Feature Section:
```tsx
<div className="grid grid-cols-3 gap-6">
  <div className="feature-box">
    <div className="text-4xl mb-4">🚚</div>
    <h3 className="font-bold text-lg">Fast Delivery</h3>
    <p className="text-sm mt-2">2-day shipping</p>
  </div>
  {/* More features... */}
</div>
```

## 🎨 Color Reference

### Usage in Code:
```tsx
// Background colors
bg-background-50  // Lightest
bg-background-500 // Medium
bg-background-900 // Darkest

// Primary (Emerald)
bg-primary-600    // Main emerald
text-primary-600  // Emerald text
border-primary-600 // Emerald border

// Secondary (Orange)
bg-secondary-600  // Main orange
text-secondary-600 // Orange text

// Accent (Amber)
bg-accent-500     // Main amber
text-accent-500   // Amber text
```

Perfect for an attractive, modern, and user-friendly e-commerce experience! 🛍️
