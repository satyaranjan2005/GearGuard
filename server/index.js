const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: '*'}));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/departments', require('./routes/department'));
app.use('/api/maintenance-teams', require('./routes/maintainanceTeam'));
app.use('/api/maintenance-requests', require('./routes/maintainanceRequest'));
app.use('/api/equipment', require('./routes/equipments'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});