import expres from 'express';
import cors from 'cors';
import weatherRoutes from '../routes/weather.js';

const app = expres();
// Enable CORS for all routes
app.use(cors());
app.use(expres.json());

// Routes
app.use('/api/weather', weatherRoutes);
weatherRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Weather API Proxy!' });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});