import {
  getElectricityPrice,
  getIndicators,
} from '../services/electricityPriceService';
import express from 'express';
const electricityPriceRouter = express.Router();
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// Get electricity price by date
electricityPriceRouter.get(
  '/electricitypricebydate',
  async (req, res, next) => {
    try {
      if (!req.query.startDate || !req.query.endDate) {
        throw new Error('Start date and end date are required');
      } else {
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;
        const prices = await getElectricityPrice(
          dayjs(startDate, 'DD.MM.YYYY').subtract(1, 'day').format('YYYYMMDD'),
          dayjs(endDate, 'DD.MM.YYYY').format('YYYYMMDD'),
        );

        res.json(prices);
      }
    } catch (error) {
      next(error);
    }
  },
);

// Get indicators
electricityPriceRouter.get('/indicators', async (_req, res, next) => {
  try {
    const indicators = await getIndicators();
    res.json(indicators);
  } catch (error) {
    next(error);
  }
});

export default electricityPriceRouter;
