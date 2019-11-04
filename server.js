//DEPENDENCIES
const express = require('express');
const connectDB = require('./config/db');

//INITIALIZE EXPRESS
const app = express();
//CONNECT DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running for WorkoutPlanner'));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/plans', require('./routes/api/plans'));
app.use('/api/exercises', require('./routes/api/exercises'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));