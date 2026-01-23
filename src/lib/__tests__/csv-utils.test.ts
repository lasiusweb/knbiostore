import { validateProductCSV } from '../csv-utils';

describe('CSV Utils - validateProductCSV', () => {
  const validCSV = `sku,product_name,sale_price,mrp,in_stock,description
SKU001,Bio-Fertilizer,100,120,true,Test description
SKU002,Microbe Pack,80,90,false,Another description`;

  it('validates a correct CSV string', () => {
    const result = validateProductCSV(validCSV);
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(result.data![0].sku).toBe('SKU001');
  });

  it('fails if headers are missing', () => {
    const invalidCSV = `product_name,sale_price
Bio-Fertilizer,100`;
    const result = validateProductCSV(invalidCSV);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Missing required headers');
  });

  it('fails if prices are not numbers', () => {
    const invalidCSV = `sku,product_name,sale_price,mrp,in_stock,description
SKU001,Bio-Fertilizer,abc,120,true,Test`;
    const result = validateProductCSV(invalidCSV);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid sale_price');
  });

  it('handles empty CSV', () => {
    const result = validateProductCSV('');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Empty CSV content');
  });
});
