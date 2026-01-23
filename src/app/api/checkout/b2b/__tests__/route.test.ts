/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as route from '../route';
import { getCartByUserId, getCartItems } from '@/lib/db/carts';
import { createOrder } from '@/lib/db/orders';

// Mock DB utilities
jest.mock('@/lib/db/carts', () => ({
  getCartByUserId: jest.fn(),
  getCartItems: jest.fn(),
  removeCartItem: jest.fn(),
}));

jest.mock('@/lib/db/orders', () => ({
  createOrder: jest.fn(),
  addOrderItem: jest.fn(),
}));

describe('B2B Checkout API', () => {
  const mockUser = { id: 1 };
  const mockCart = { id: 10 };
  const mockItems = [
    { id: 101, product_id: 1, variant_id: 1, quantity: 2, price_at_addition: 50 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getCartByUserId as jest.Mock).mockResolvedValue(mockCart);
    (getCartItems as jest.Mock).mockResolvedValue(mockItems);
    (createOrder as jest.Mock).mockResolvedValue({ id: 500 });
  });

  it('handles partial payment with 30% deposit and B2B fields', async () => {
    await testApiHandler({
      appHandler: route,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            userId: mockUser.id,
            shippingAddress: 'B2B Warehouse',
            paymentType: 'partial',
            businessName: 'KN Bio Labs',
            gstNumber: '22AAAAA0000A1Z5',
            taxAmount: 18,
            shippingCharges: 10,
            contactDetails: {
              contact1: { name: 'John Doe', phone: '9876543210' }
            }
          }),
        });

        const json = await res.json();
        expect(res.status).toBe(201);
        // Subtotal 100 + Tax 18 + Shipping 10 = 128
        // 30% of 128 = 38.4
        expect(json.totalAmount).toBe(128);
        expect(json.amountPaid).toBe(38.4);
        expect(json.balanceDue).toBe(89.6);
        expect(createOrder).toHaveBeenCalledWith(
          mockUser.id, 
          mockCart.id, 
          128, 
          'B2B Warehouse', 
          'partially_paid',
          expect.objectContaining({
            businessName: 'KN Bio Labs',
            gstNumber: '22AAAAA0000A1Z5',
            tax_amount: 18,
            contactDetails: expect.anything()
          })
        );
      },
    });
  });

  it('handles full payment correctly', async () => {
    await testApiHandler({
      appHandler: route,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            userId: mockUser.id,
            shippingAddress: 'B2B Warehouse',
            paymentType: 'full'
          }),
        });

        const json = await res.json();
        expect(json.amountPaid).toBe(100);
        expect(json.balanceDue).toBe(0);
      },
    });
  });
});
