
import { GET } from '../route';
import { GET as GET_BY_ID } from '../[id]/route';
import { NextResponse } from 'next/server';
import * as ProductDB from '../../../../lib/db/products';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({ json: () => Promise.resolve(data), status: 200 })),
  },
}));

jest.mock('../../../../lib/db/products', () => ({
  getProducts: jest.fn(),
  getProductById: jest.fn(),
}));

describe('Product API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/products should return a list of products', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product 1', price: 100 }];
    (ProductDB.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const response = await GET();
    const data = await response.json();

    expect(ProductDB.getProducts).toHaveBeenCalledTimes(1);
    expect(NextResponse.json).toHaveBeenCalledWith(mockProducts);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockProducts);
  });

  it('GET /api/products/[id] should return a single product by id', async () => {
    const mockProduct = { id: 1, name: 'Test Product 1', price: 100 };
    (ProductDB.getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const mockRequest = { url: 'http://localhost/api/products/1' } as Request;
    const mockParams = { id: '1' };

    const response = await GET_BY_ID(mockRequest, { params: mockParams });
    const data = await response.json();

    expect(ProductDB.getProductById).toHaveBeenCalledWith(1);
    expect(NextResponse.json).toHaveBeenCalledWith(mockProduct);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockProduct);
  });

  it('GET /api/products/[id] should return 404 if product not found', async () => {
    (ProductDB.getProductById as jest.Mock).mockResolvedValue(undefined); // Or null, depending on getProductById's return for not found

    const mockRequest = { url: 'http://localhost/api/products/999' } as Request;
    const mockParams = { id: '999' };

    const response = await GET_BY_ID(mockRequest, { params: mockParams });
    // Assuming a 404 response for not found
    expect(response.status).toBe(404);
  });
});
