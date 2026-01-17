
import { NextRequest } from 'next/server';
import { POST } from '../route';
import { NextResponse } from 'next/server';
import * as OrderDB from '../../../../lib/db/orders';
import * as CartDB from '../../../../lib/db/carts';

jest.mock('next/server', () => {
  const mockNextResponse = jest.fn((body, init) => ({
    json: () => Promise.resolve(JSON.parse(body)),
    status: init?.status || 200,
    ...init,
  }));
  mockNextResponse.json = jest.fn((data, init) => ({
    json: () => Promise.resolve(data),
    status: init?.status || 200,
    ...init,
  }));
  return { NextResponse: mockNextResponse, NextRequest: jest.fn() };
});

jest.mock('../../../../lib/db/orders', () => ({
  createOrder: jest.fn(),
  addOrderItem: jest.fn(),
}));

jest.mock('../../../../lib/db/carts', () => ({
  getCartByUserId: jest.fn(),
  getCartItems: jest.fn(),
  removeCartItem: jest.fn(),
}));

describe('Checkout API endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUserId = 1;
  const mockCartId = 1;
  const mockProductId = 101;
  const mockVariantId = 1;
  const mockOrderId = 1;

  const mockCartItems = [
    { id: 1, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 2, price_at_addition: 50 },
  ];
  const mockTotalAmount = mockCartItems[0].quantity * mockCartItems[0].price_at_addition;

  it('POST /api/checkout should create an order and clear the cart', async () => {
    (CartDB.getCartByUserId as jest.Mock).mockResolvedValue({ id: mockCartId, user_id: mockUserId });
    (CartDB.getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (OrderDB.createOrder as jest.Mock).mockResolvedValue({ id: mockOrderId, ...mockCartItems[0] });
    (OrderDB.addOrderItem as jest.Mock).mockResolvedValue({});
    (CartDB.removeCartItem as jest.Mock).mockResolvedValue(undefined);

    const mockRequest = {
      json: () => Promise.resolve({
        userId: mockUserId,
        shippingAddress: '123 Main St',
        paymentInfo: { method: 'card', token: 'mock_token' },
      }),
    } as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(CartDB.getCartByUserId).toHaveBeenCalledWith(mockUserId);
    expect(CartDB.getCartItems).toHaveBeenCalledWith(mockCartId);
    expect(OrderDB.createOrder).toHaveBeenCalledWith(mockUserId, mockCartId, mockTotalAmount, '123 Main St', 'paid');
    expect(OrderDB.addOrderItem).toHaveBeenCalledWith(mockOrderId, mockProductId, mockVariantId, mockCartItems[0].quantity, mockCartItems[0].price_at_addition);
    expect(CartDB.removeCartItem).toHaveBeenCalledWith(mockCartItems[0].id);
    expect(NextResponse.json).toHaveBeenCalledWith({ orderId: mockOrderId }, { status: 201 });
    expect(response.status).toBe(201);
    expect(data).toEqual({ orderId: mockOrderId });
  });

  it('POST /api/checkout should return 400 if user ID is missing', async () => {
    const mockRequest = {
      json: () => Promise.resolve({
        shippingAddress: '123 Main St',
        paymentInfo: { method: 'card', token: 'mock_token' },
      }),
    } as NextRequest;

    const response = await POST(mockRequest);
    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Missing required fields' }, { status: 400 });
    expect(response.status).toBe(400);
  });

  it('POST /api/checkout should return 404 if cart not found for user', async () => {
    (CartDB.getCartByUserId as jest.Mock).mockResolvedValue(null);
    const mockRequest = {
      json: () => Promise.resolve({
        userId: mockUserId,
        shippingAddress: '123 Main St',
        paymentInfo: { method: 'card', token: 'mock_token' },
      }),
    } as NextRequest;

    const response = await POST(mockRequest);
    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Cart not found' }, { status: 404 });
    expect(response.status).toBe(404);
  });

  it('POST /api/checkout should return 400 if cart is empty', async () => {
    (CartDB.getCartByUserId as jest.Mock).mockResolvedValue({ id: mockCartId, user_id: mockUserId });
    (CartDB.getCartItems as jest.Mock).mockResolvedValue([]);
    const mockRequest = {
      json: () => Promise.resolve({
        userId: mockUserId,
        shippingAddress: '123 Main St',
        paymentInfo: { method: 'card', token: 'mock_token' },
      }),
    } as NextRequest;

    const response = await POST(mockRequest);
    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Cart is empty' }, { status: 400 });
    expect(response.status).toBe(400);
  });
});
