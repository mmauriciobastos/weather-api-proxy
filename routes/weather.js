import express from 'express';
import needle from 'needle';
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const API_NAME = process.env.OPEN_WEATHER_API_NAME;
const API_BASE_URL = `${process.env.OPEN_WEATHER_API_BASE_URL}/${process.env.OPEN_WEATHER_API_TYPE_WEATHER}`;
const ENV = process.env.NODE_ENV || 'production';
const router = express.Router();
import apiCache from 'apicache';

// Cache middleware for 10 minutes
const cache = apiCache.middleware;
router.use(cache('10 minutes'));
    
    //router.get('/', cache('10 minutes'), async (req, res) => {

    router.get('/', async (req, res) => {
    try {
        
        const params = new URLSearchParams({
            [API_NAME]: API_KEY,
            ...req.query
        });
        
        const apiUrl = `${API_BASE_URL}?${params}`;
        
        if(ENV === 'development') {
            console.log(`API URL: ${apiUrl}`);
            // Log the query parameters for debugging
            //console.log('Query Parameters:', req.query);
        }

        const apiResponse = await needle('get', apiUrl);
        const data = apiResponse.body;

        if (apiResponse.statusCode !== 200) {
            return res.status(apiResponse.statusCode).json({ error: 'Error fetching weather data', data: data });
        }

        res.json(data);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
});

router.get('/test', (req, res) => {
    res.json({ message: 'Weather API Proxy is working!', environment: ENV });
});

export default router;