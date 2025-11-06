const express = require('express');
const app = express();
const router = require('./routes'); // Import your main routes

// Middleware setup, database connection logic (may need external config/env vars)
app.use(express.json());
app.use('/api', router); // Use your routes

// ONLY if you still want to run the server locally with 'npm start',
// you can include this block, but Vercel ignores it.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}

// IMPORTANT: Export the app object for Vercel
module.exports = app;