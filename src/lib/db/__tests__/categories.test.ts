
jest.mock('@supabase/supabase-js');

import { createCategory, getCategoryById } from '../categories';

describe('Category database operations', () => {
  it('should create a new category and retrieve it', async () => {
    const newCategory = { name: 'Test Category' };
    const createdCategory = await createCategory(newCategory);
    expect(createdCategory).toEqual({ id: 1, name: 'Created Category' });

    const retrievedCategory = await getCategoryById(createdCategory.id);
    expect(retrievedCategory).toEqual({ id: 1, name: 'Retrieved Category' });
  });
});
