export interface CSVProduct {
  sku: string;
  product_name: string;
  sale_price: number;
  mrp: number;
  in_stock: boolean;
  description: string;
}

export interface CSVValidationResult {
  success: boolean;
  data?: CSVProduct[];
  error?: string;
}

const REQUIRED_HEADERS = ['sku', 'product_name', 'sale_price', 'mrp', 'in_stock', 'description'];

export function validateProductCSV(csvContent: string): CSVValidationResult {
  if (!csvContent || csvContent.trim() === '') {
    return { success: false, error: 'Empty CSV content' };
  }

  const lines = csvContent.trim().split('\n');
  if (lines.length < 2) {
    return { success: false, error: 'CSV must contain headers and at least one data row' };
  }

  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  // Check for missing headers
  const missingHeaders = REQUIRED_HEADERS.filter(h => !headers.includes(h));
  if (missingHeaders.length > 0) {
    return { success: false, error: `Missing required headers: ${missingHeaders.join(', ')}` };
  }

  const products: CSVProduct[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) continue; // Skip malformed rows

    const product: any = {};
    
    // Map headers to values
    headers.forEach((header, index) => {
      const value = values[index];
      
      if (header === 'sale_price' || header === 'mrp') {
        const num = parseFloat(value);
        if (isNaN(num)) {
          product.error = `Invalid ${header} at row ${i + 1}`;
        }
        product[header] = num;
      } else if (header === 'in_stock') {
        product[header] = value.toLowerCase() === 'true';
      } else {
        product[header] = value;
      }
    });

    if (product.error) {
      return { success: false, error: product.error };
    }

    products.push(product as CSVProduct);
  }

  return { success: true, data: products };
}
