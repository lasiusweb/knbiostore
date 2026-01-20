
import { NextRequest } from 'next/server';
import { POST, GET } from '../route';
import { PUT, DELETE } from '../[itemId]/route';
import { NextResponse } from 'next/server';
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

jest.mock('../../../../lib/db/carts', () => ({
  createCart: jest.fn(),
  getCartByUserId: jest.fn(),
  addCartItem: jest.fn(),
  updateCartItemQuantity: jest.fn(),
  removeCartItem: jest.fn(),
  getCartItems: jest.fn(),
}));

describe('Cart API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Mock a user ID for testing purposes
  const mockUserId = 1;
  const mockCartId = 1;
  const mockProductId = 101;
  const mockVariantId = 1;
  const mockCartItemId = 1;

  it('POST /api/cart should create a cart and add an item if no cart exists', async () => {
    (CartDB.getCartByUserId as jest.Mock).mockResolvedValue(null);
    (CartDB.createCart as jest.Mock).mockResolvedValue({ id: mockCartId, user_id: mockUserId });
    (CartDB.addCartItem as jest.Mock).mockResolvedValue({ id: mockCartItemId, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_addition: 50 });

    // Mock NextRequest with JSON body
    const mockRequest = {
      json: () => Promise.resolve({ userId: mockUserId, productId: mockProductId, variantId: mockVariantId, quantity: 1, priceAtAddition: 50 }),
    } as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(CartDB.getCartByUserId).toHaveBeenCalledWith(mockUserId);
    expect(CartDB.createCart).toHaveBeenCalledWith(mockUserId);
    expect(CartDB.addCartItem).toHaveBeenCalledWith(mockCartId, mockProductId, mockVariantId, 1, 50);
    expect(NextResponse.json).toHaveBeenCalledWith({ id: mockCartItemId, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_addition: 50 }, { status: 201 });
    expect(response.status).toBe(201);
    expect(data).toHaveProperty('id');
  });

  it('POST /api/cart should add an item to an existing cart', async () => {
    (CartDB.getCartByUserId as jest.Mock).mockResolvedValue({ id: mockCartId, user_id: mockUserId });
    (CartDB.addCartItem as jest.Mock).mockResolvedValue({ id: mockCartItemId, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_addition: 50 });

    const mockRequest = {
      json: () => Promise.resolve({ userId: mockUserId, productId: mockProductId, variantId: mockVariantId, quantity: 1, priceAtAddition: 50 }),
    } as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(CartDB.getCartByUserId).toHaveBeenCalledWith(mockUserId);
    expect(CartDB.createCart).not.toHaveBeenCalled(); // Should not create a new cart
    expect(CartDB.addCartItem).toHaveBeenCalledWith(mockCartId, mockProductId, mockVariantId, 1, 50);
    expect(NextResponse.json).toHaveBeenCalledWith({ id: mockCartItemId, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_addition: 50 }, { status: 201 });
    expect(response.status).toBe(201);
    expect(data).toHaveProperty('id');
  });

  it('GET /api/cart should return cart items for a user', async () => {
    (CartDB.getCartByUserId as jest.Mock).mockResolvedValue({ id: mockCartId, user_id: mockUserId });
    const mockItems = [{ id: mockCartItemId, cart_id: mockCartId, product_id: mockProductId, quantity: 1 }];
    (CartDB.getCartItems as jest.Mock).mockResolvedValue(mockItems);

    const mockRequest = {
      url: 'http://localhost/api/cart?userId=1',
    } as NextRequest;

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(CartDB.getCartByUserId).toHaveBeenCalledWith(mockUserId);
    expect(CartDB.getCartItems).toHaveBeenCalledWith(mockCartId);
    expect(NextResponse.json).toHaveBeenCalledWith(mockItems);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockItems);
  });

  it('PUT /api/cart/[itemId] should update cart item quantity', async () => {
    const mockUpdatedItem = { id: mockCartItemId, quantity: 5 };
    (CartDB.updateCartItemQuantity as jest.Mock).mockResolvedValue(mockUpdatedItem);

    const mockRequest = {
      json: () => Promise.resolve({ quantity: 5 }),
    } as NextRequest;
    const mockParams = { params: Promise.resolve({ itemId: mockCartItemId.toString() }) };

    const response = await PUT(mockRequest, mockParams);
    const data = await response.json();

    expect(CartDB.updateCartItemQuantity).toHaveBeenCalledWith(mockCartItemId, 5);
    expect(NextResponse.json).toHaveBeenCalledWith(mockUpdatedItem);
    expect(response.status).toBe(200);
    expect(data).toEqual(mockUpdatedItem);
  });

  it('DELETE /api/cart/[itemId] should remove a cart item', async () => {
    (CartDB.removeCartItem as jest.Mock).mockResolvedValue(undefined);

    const mockRequest = {} as NextRequest; // DELETE usually doesn't have a body for item removal
    const mockParams = { params: Promise.resolve({ itemId: mockCartItemId.toString() }) };

    const response = await DELETE(mockRequest, mockParams);

    expect(CartDB.removeCartItem).toHaveBeenCalledWith(mockCartItemId);
    expect(response.status).toBe(204); // No Content
  });
});