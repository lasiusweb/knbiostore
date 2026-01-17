
jest.mock('@supabase/supabase-js');

import {
  createCart,
  getCartByUserId,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  getCartItems,
} from '../carts';

// Mock data
const mockUserId = 1;
const mockProductId = 101;
const mockVariantId = 1;
const mockCartId = 1;

describe('Cart database operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new cart', async () => {
    const mockCart = { id: mockCartId, user_id: mockUserId };
    // Mock for supabase.from('carts').insert().select()
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [mockCart],
          error: null,
        })),
      })),
    });

    const cart = await createCart(mockUserId);
    expect(cart).toEqual(mockCart);
  });

  it('should get a cart by user ID', async () => {
    const mockCart = { id: mockCartId, user_id: mockUserId };
    // Mock for supabase.from('carts').select().eq()
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [mockCart],
          error: null,
        })),
      })),
    });

    const cart = await getCartByUserId(mockUserId);
    expect(cart).toEqual(mockCart);
  });

  it('should add an item to the cart', async () => {
    const mockCartItem = { id: 1, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_addition: 50 };
    // Mock for supabase.from('cart_items').insert().select()
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [mockCartItem],
          error: null,
        })),
      })),
    });

    const cartItem = await addCartItem(mockCartId, mockProductId, mockVariantId, 1, 50);
    expect(cartItem).toEqual(mockCartItem);
  });

  it('should update cart item quantity', async () => {
    const mockUpdatedItem = { id: 1, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 2, price_at_addition: 50 };
    // Mock for supabase.from('cart_items').update().eq().select()
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [mockUpdatedItem],
            error: null,
          })),
        })),
      })),
    });

    const updatedItem = await updateCartItemQuantity(1, 2);
    expect(updatedItem).toEqual(mockUpdatedItem);
  });

  it('should remove a cart item', async () => {
    // Mock for supabase.from('cart_items').delete().eq()
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          count: null,
          data: [],
          error: null,
          status: 204,
          statusText: 'No Content',
        })),
      })),
    });

    await removeCartItem(1);
    // Expect no error to be thrown
    expect(true).toBe(true);
  });

  it('should get all cart items for a cart ID', async () => {
    const mockCartItems = [
      { id: 1, cart_id: mockCartId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_addition: 50 },
      { id: 2, cart_id: mockCartId, product_id: mockProductId + 1, variant_id: mockVariantId + 1, quantity: 2, price_at_addition: 75 },
    ];
    // Mock for supabase.from('cart_items').select().eq()
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: mockCartItems,
          error: null,
        })),
      })),
    });

    const cartItems = await getCartItems(mockCartId);
    expect(cartItems).toEqual(mockCartItems);
  });
});
