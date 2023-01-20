import app from '../app';
import supertest from 'supertest';

const api = supertest(app);

describe('ElectricityPrice tests', () => {
  it('Electricity response fails without query params', async () => {
    try {
      await api.get(`/api/electricitypricebydate`);
    } catch (error) {
      expect(error).toBe('error Start date and end date are required');
    }
  });
});
