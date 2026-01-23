import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScarcityBadge } from '../ScarcityBadge';
import { CountdownTimer } from '../CountdownTimer';

describe('Marketing Urgency Components', () => {
  describe('ScarcityBadge', () => {
    it('renders "Low Stock" when stock is below threshold', () => {
      render(<ScarcityBadge stock={5} threshold={10} />);
      expect(screen.getByText(/Only 5 units left/i)).toBeInTheDocument();
    });

    it('renders nothing when stock is above threshold', () => {
      const { container } = render(<ScarcityBadge stock={20} threshold={10} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('CountdownTimer', () => {
    it('renders the remaining time', () => {
      // Set target to 1 hour from now
      const targetDate = new Date();
      targetDate.setHours(targetDate.getHours() + 1);
      
      render(<CountdownTimer targetDate={targetDate.toISOString()} />);
      expect(screen.getByText(/H/i)).toBeInTheDocument();
      expect(screen.getByText(/M/i)).toBeInTheDocument();
    });

    it('renders "Expired" when time is up', () => {
      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 1);
      
      render(<CountdownTimer targetDate={pastDate.toISOString()} />);
      expect(screen.getByText(/Offer Ended/i)).toBeInTheDocument();
    });
  });
});
