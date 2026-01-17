
import { GET } from '../route';
import { GET as GET_BY_ID } from '../[id]/route';
import { NextResponse } from 'next/server';
import * as ProductDB from '../../../../lib/db/products';

jest.mock('next/server', () => {
  const mockNextResponse = jest.fn((body, init) => ({
    json: () => Promise.resolve(JSON.parse(body)), // For new NextResponse with JSON body
    status: init?.status || 200,
    ...init,
  }));
  mockNextResponse.json = jest.fn((data, init) => ({
    json: () => Promise.resolve(data), // For NextResponse.json()
    status: init?.status || 200,
    ...init,
  }));
  return { NextResponse: mockNextResponse };
});

jest.mock('../../../../lib/db/products', () => ({
  getProducts: jest.fn((search?: string, category?: string) => {
    let products = [
      { id: 1, name: 'Test Product 1', price: 100, category: 'Electronics', imageUrl: '' },
      { id: 2, name: 'Test Product 2', price: 200, category: 'Books', imageUrl: '' },
      { id: 3, name: 'Another Product', price: 150, category: 'Electronics', imageUrl: '' },
    ];
    if (search) {
      products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return products;
  }),
  getProductById: jest.fn(),
}));

describe('Product API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/products should return a list of products', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product 1', price: 100 }];
    (ProductDB.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = { url: 'http://localhost/api/products' } as Request;
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(ProductDB.getProducts).toHaveBeenCalledTimes(1);
    expect(NextResponse.json).toHaveBeenCalledWith(mockProducts);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockProducts);
  });

  it('GET /api/products should return filtered products by search query', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product 1', price: 100, category: 'Electronics', imageUrl: '' }];
    (ProductDB.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = { url: 'http://localhost/api/products?search=test' } as Request;
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(ProductDB.getProducts).toHaveBeenCalledWith('test', undefined);
    expect(NextResponse.json).toHaveBeenCalledWith(mockProducts);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockProducts);
  });

  it('GET /api/products should return filtered products by category', async () => {
    const mockProducts = [{ id: 2, name: 'Test Product 2', price: 200, category: 'Books', imageUrl: '' }];
    (ProductDB.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = { url: 'http://localhost/api/products?category=books' } as Request;
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(ProductDB.getProducts).toHaveBeenCalledWith(undefined, 'books');
    expect(NextResponse.json).toHaveBeenCalledWith(mockProducts);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockProducts);
  });

  it('GET /api/products should return filtered products by search and category', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product 1', price: 100, category: 'Electronics', imageUrl: '' }];
    (ProductDB.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = { url: 'http://localhost/api/products?search=test&category=electronics' } as Request;
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(ProductDB.getProducts).toHaveBeenCalledWith('test', 'electronics');
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
