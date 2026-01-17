
jest.mock('@supabase/supabase-js');

import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  addOrderItem,
  updateOrderStatus,
} from '../orders';

// Mock data
const mockUserId = 1;
const mockCartId = 1;
const mockProductId = 101;
const mockVariantId = 1;
const mockOrderId = 1;

describe('Order database operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new order', async () => {
    const mockOrder = { id: mockOrderId, user_id: mockUserId, cart_id: mockCartId, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' };
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [mockOrder],
          error: null,
        })),
      })),
    });

    const order = await createOrder(mockUserId, mockCartId, 150, 'Shipping Address', 'paid');
    expect(order).toEqual(mockOrder);
  });

  it('should get an order by ID', async () => {
    const mockOrder = { id: mockOrderId, user_id: mockUserId, cart_id: mockCartId, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' };
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: mockOrder,
            error: null,
          })),
        })),
      })),
    });

    const order = await getOrderById(mockOrderId);
    expect(order).toEqual(mockOrder);
  });

  it('should get orders by user ID', async () => {
    const mockOrders = [
      { id: mockOrderId, user_id: mockUserId, cart_id: mockCartId, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' },
    ];
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: mockOrders,
          error: null,
        })),
      })),
    });

    const orders = await getOrdersByUserId(mockUserId);
    expect(orders).toEqual(mockOrders);
  });

  it('should add an item to an order', async () => {
    const mockOrderItem = { id: 1, order_id: mockOrderId, product_id: mockProductId, variant_id: mockVariantId, quantity: 1, price_at_purchase: 50 };
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [mockOrderItem],
          error: null,
        })),
      })),
    });

    const orderItem = await addOrderItem(mockOrderId, mockProductId, mockVariantId, 1, 50);
    expect(orderItem).toEqual(mockOrderItem);
  });

  it('should update order status', async () => {
    const mockUpdatedOrder = { id: mockOrderId, user_id: mockUserId, cart_id: mockCartId, total_amount: 150, status: 'completed', shipping_address: 'Shipping Address', payment_status: 'paid' };
    require('@supabase/supabase-js').createClient().from.mockReturnValueOnce({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [mockUpdatedOrder],
            error: null,
          })),
        })),
      })),
    });

    const updatedOrder = await updateOrderStatus(mockOrderId, 'completed');
    expect(updatedOrder).toEqual(mockUpdatedOrder);
  });
});
