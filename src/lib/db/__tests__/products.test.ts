
jest.mock('@supabase/supabase-js');

import { createProduct, getProductById } from '../products';

describe('Product database operations', () => {
  it('should create a new product and retrieve it', async () => {
    const newProduct = { name: 'Test Product', price: 100 };
    const createdProduct = await createProduct(newProduct);
    expect(createdProduct).toEqual({ id: 1, name: 'Created Product', price: 150 });

    const retrievedProduct = await getProductById(createdProduct.id);
    expect(retrievedProduct).toEqual({ id: 1, name: 'Retrieved Product', price: 200 });
  });
});
