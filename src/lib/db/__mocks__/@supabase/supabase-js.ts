
export const createClient = jest.fn(() => ({
  from: jest.fn((table: string) => {
    if (table === 'products') {
      return {
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 1, name: 'Created Product', price: 150 }],
            error: null,
          })),
        })),
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: [{ id: 1, name: 'Retrieved Product', price: 200 }],
            error: null,
          })),
        })),
      };
    }
    if (table === 'categories') {
      return {
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 1, name: 'Created Category' }],
            error: null,
          })),
        })),
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: [{ id: 1, name: 'Retrieved Category' }],
            error: null,
          })),
        })),
      };
    }
    if (table === 'carts') {
      return {
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 1, user_id: 1 }],
            error: null,
          })),
        })),
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => ({
              data: { id: 1, user_id: 1 },
              error: null,
            })),
            data: [{ id: 1, user_id: 1 }],
            error: null,
          })),
        })),
      };
    }
    if (table === 'cart_items') {
      return {
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 1, cart_id: 1, product_id: 101, variant_id: 1, quantity: 1, price_at_addition: 50 }],
            error: null,
          })),
        })),
        update: jest.fn(() => ({
          eq: jest.fn(() => ({
            select: jest.fn(() => ({
              data: [{ id: 1, cart_id: 1, product_id: 101, variant_id: 1, quantity: 2, price_at_addition: 50 }],
              error: null,
            })),
          })),
        })),
        delete: jest.fn(() => ({
          eq: jest.fn(() => ({
            count: null,
            data: [],
            error: null,
            status: 204,
            statusText: 'No Content',
          })),
        })),
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: [
              { id: 1, cart_id: 1, product_id: 101, variant_id: 1, quantity: 1, price_at_addition: 50 },
              { id: 2, cart_id: 1, product_id: 102, variant_id: 2, quantity: 2, price_at_addition: 75 },
            ],
            error: null,
          })),
        })),
      };
    }
    if (table === 'orders') {
      return {
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 1, user_id: 1, cart_id: 1, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' }],
            error: null,
          })),
        })),
        select: jest.fn(() => ({
          eq: jest.fn((column, value) => {
            if (column === 'id') {
              return {
                single: jest.fn(() => ({
                  data: { id: value, user_id: 1, cart_id: 1, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' },
                  error: null,
                })),
                data: [{ id: value, user_id: 1, cart_id: 1, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' }],
                error: null,
              };
            }
            if (column === 'user_id') {
              return {
                data: [{ id: 1, user_id: value, cart_id: 1, total_amount: 150, status: 'pending', shipping_address: 'Shipping Address', payment_status: 'paid' }],
                error: null,
              };
            }
            return { data: [], error: null };
          }),
        })),
        update: jest.fn(() => ({
          eq: jest.fn(() => ({
            select: jest.fn(() => ({
              data: [{ id: 1, user_id: 1, cart_id: 1, total_amount: 150, status: 'completed', shipping_address: 'Shipping Address', payment_status: 'paid' }],
              error: null,
            })),
          })),
        })),
      };
    }
    if (table === 'order_items') {
      return {
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 1, order_id: 1, product_id: 101, variant_id: 1, quantity: 1, price_at_purchase: 50 }],
            error: null,
          })),
        })),
      };
    }
    return {
        insert: jest.fn(() => ({
            select: jest.fn(() => ({ data: [], error: null})),
        })),
        select: jest.fn(() => ({
            eq: jest.fn(() => ({ data: [], error: null})),
        })),
    }
  }),
}));
