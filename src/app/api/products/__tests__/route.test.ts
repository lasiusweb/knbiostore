
import { testApiHandler } from 'next-test-api-route-handler';
import { GET as handler } from '../route';
import { GET as handlerById } from '../[id]/route';

jest.mock('../../../../lib/db/products', () => ({
  getProducts: jest.fn(() => ([{ id: 1, name: 'Test Product', price: 100 }])),
  getProductById: jest.fn((id: number) => ({ id, name: 'Test Product', price: 100 })),
}));

describe('Product API endpoints', () => {
  it('should return a list of products', async () => {
    await testApiHandler({
      appHandler: handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json).toEqual([{ id: 1, name: 'Test Product', price: 100 }]);
      },
    });
  });

  it('should return a single product by id', async () => {
    await testApiHandler({
      appHandler: handlerById,
      params: { id: '1' },
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json).toEqual({ id: 1, name: 'Test Product', price: 100 });
      },
    });
  });
});
