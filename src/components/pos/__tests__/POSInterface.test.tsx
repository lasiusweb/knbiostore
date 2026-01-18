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
});
