
const express = require('express');
const cors = require('cors');
const db = require('./models');

const challengeRoutes = require('./routes/challengeRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();
const PORT = process.env.PORT || 5007;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/challenges', challengeRoutes);
app.use('/api/submissions', submissionRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'CTF Platform API is running!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database (create tables)
    await db.sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
    
    // // Create default user for testing
    // const [user, created] = await db.User.findOrCreate({
    //   where: { login: 'testuser' },
    //   defaults: {
    //     login: 'testuser',
    //     password: 'hashedpassword123'
    //   }
    // });
    
    // if (created) {
    //   console.log('Default test user created.');
    // }
    
    // Start server
    app.listen(PORT, () => {
      console.log(`CTF Platform API is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();

module.exports = app;
