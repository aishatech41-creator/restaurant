module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primary: "#1f1f1f", // Rich Black / Dark Charcoal
        secondary: "#2d2d2d", // Slightly lighter for cards/sections
        accent: "#f59e0b", // Gold/Amber
        lightGray: "#d1d5db", // Light gray for text
        headingColor: "#f3f4f6", // Almost white for headings
        textColor: "#9ca3af", // Muted gray for body text
        cartNumBg: "#e80013",
        cardOverlay: "rgba(0, 0, 0, 0.6)", // Darker overlay
        btnOverlay: "rgba(0, 0, 0, 0.2)",
        containerbg: "#2d2d2d",
        cartBg: "#1a1a1a",
        cartItem: "#333333",
        cartTotal: "#222222",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right bottom, rgba(31, 31, 31, 0.9), rgba(31, 31, 31, 0.8)), url('https://firebasestorage.googleapis.com/v0/b/restaurant-app-7639d.appspot.com/o/hero-bg.jpg?alt=media&token=')", // Placeholder
      }
    },
    plugins: [],
  },
};
