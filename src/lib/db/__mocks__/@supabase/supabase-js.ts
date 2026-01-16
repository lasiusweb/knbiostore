
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
