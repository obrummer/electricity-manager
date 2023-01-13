import app from '../app';
import supertest from 'supertest';
import dayjs from 'dayjs';

const api = supertest(app);

describe('ElectricityPrice tests', () => {
  it('Electricity response is 200 and returned as json', async () => {
    const yesterday = dayjs().subtract(1, 'day').format('DD.MM.YYYY');
    await api
      .get(`/api/electricitypricebydate?startDate=${yesterday}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
