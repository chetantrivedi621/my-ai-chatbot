const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  credentials : true
}));

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();



// Middleware to parse JSON requests
app.use(express.json());

// Mount API routes
app.use('/api/users', userRoutes);



// ADD YOUR NEW ROOT ROUTE HERE
app.get('/', (req, res) => {
  res.send('AI Chatbot API is running');
});



// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server on PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
