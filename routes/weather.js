import express from 'express';
import needle from 'needle';
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const API_NAME = process.env.OPEN_WEATHER_API_NAME;
const API_BASE_URL = `${process.env.OPEN_WEATHER_API_BASE_URL}/${process.env.OPEN_WEATHER_API_TYPE_WEATHER}`;
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const apiResponse = await needle('get', `${API_BASE_URL}`);
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

export default router;