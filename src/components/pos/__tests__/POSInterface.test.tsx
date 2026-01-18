import React from 'react';
import { render, screen } from '@testing-library/react';
import POSInterface from '../POSInterface';

// Mock dependencies
jest.mock('@/hooks/useOfflineSync', () => ({
  useOfflineSync: jest.fn(() => ({ isSyncing: false, error: null, refetchData: jest.fn() })),
}));

jest.mock('@/lib/db', () => ({
  db: {
    inventory_lots: {
      toArray: jest.fn().mockResolvedValue([]),
    },
  },
}));

jest.mock('dexie-react-hooks', () => ({
  useLiveQuery: jest.fn((callback) => {
    // Simulate initial load
    return [];
  }),
}));

describe('POSInterface', () => {
  it('renders the component title', () => {
    render(<POSInterface />);
    expect(screen.getByText(/Point of Sale/i)).toBeInTheDocument();
  });

  it('shows syncing indicator when isSyncing is true', () => {
    const { useOfflineSync } = require('@/hooks/useOfflineSync');
    useOfflineSync.mockReturnValue({ isSyncing: true, error: null, refetchData: jest.fn() });
    
    render(<POSInterface />);
    expect(screen.getByText(/Syncing/i)).toBeInTheDocument();
  });

  it('renders lot cards when data is available', () => {
    const { useLiveQuery } = require('dexie-react-hooks');
    const mockLots = [
      {
        id: '1',
        lot_number: 'LOT123',
        expiry_date: '2026-12-31',
        available_quantity: 100,
        variant_id: 'v1',
        product_name: 'Product 1', // We might need to handle joined data differently in reality
        sku: 'SKU123',
        price: 500
      }
    ];
    useLiveQuery.mockReturnValue(mockLots);

    render(<POSInterface />);
    
    expect(screen.getByText(/LOT123/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/SKU123/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
  });

  it('increments quantity and updates cart badge', () => {
    const { useLiveQuery } = require('dexie-react-hooks');
    const { fireEvent } = require('@testing-library/react');
    
    const mockLot = {
      id: '1',
      lot_number: 'LOT123',
      product_name: 'Product 1',
      sku: 'SKU123',
      price: 500,
      available_quantity: 100,
      variant_id: 'v1'
    };
    useLiveQuery.mockReturnValue([mockLot]);

    render(<POSInterface />);
    
    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    // The badge should show 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calculates and displays total in sidebar', () => {
    const { useLiveQuery } = require('dexie-react-hooks');
    const { fireEvent } = require('@testing-library/react');
    
    const mockLots = [
      { id: '1', lot_number: 'L1', product_name: 'P1', sku: 'S1', price: 100, available_quantity: 10, variant_id: 'v1' },
      { id: '2', lot_number: 'L2', product_name: 'P2', sku: 'S2', price: 200, available_quantity: 10, variant_id: 'v2' }
    ];
    useLiveQuery.mockReturnValue(mockLots);

    render(<POSInterface />);
    
    const addButtons = screen.getAllByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
    
    // Use exact match for the Cart toggle button
    const cartButton = screen.getByRole('button', { name: /^Cart/i });
    fireEvent.click(cartButton);
    
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
    expect(screen.getByText(/₹300/i)).toBeInTheDocument();
  });

  it('removes item from cart', () => {
    const { useLiveQuery } = require('dexie-react-hooks');
    const { fireEvent } = require('@testing-library/react');
    
    const mockLot = { id: '1', lot_number: 'L1', product_name: 'P1', sku: 'S1', price: 100, available_quantity: 10, variant_id: 'v1' };
    useLiveQuery.mockReturnValue([mockLot]);

    render(<POSInterface />);
    
    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Cart/i }));
    
    const removeButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeButton);
    
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });
});
