// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')

const userRoutes = require('./api/routes/UserRoutes');
const carRoutes = require('./api/routes/CarRoutes');
const brandRoutes = require('./api/routes/BrandRoutes');
const rentalRoutes = require('./api/routes/RentalRoutes');
const employeeRoutes = require('./api/routes/EmployeeRoutes');
const paymentRoutes = require('./api/routes/PaymentRoutes');
const authRoutes = require('./api/routes/AuthRoutes');
const roleRoutes = require('./api/routes/roleRoutes');

const app = express();


app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
  }));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());

// API routes
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/brands', brandRoutes);
app.use('/rentals', rentalRoutes);
app.use('/employees', employeeRoutes);
app.use('/payments', paymentRoutes);
app.use('/auth', authRoutes);
app.use('/roles', roleRoutes);



// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

