import expres from 'express';
import cors from 'cors';
import weatherRoutes from '../routes/weather.js';
import rateLimit from 'express-rate-limit';

const app = expres();
// Enable CORS for all routes
app.use(cors());
app.use(expres.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.set('trust proxy', 1); // Trust first proxy

// Routes
app.use('/api/weather', weatherRoutes);
weatherRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Weather API Proxy!' });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});