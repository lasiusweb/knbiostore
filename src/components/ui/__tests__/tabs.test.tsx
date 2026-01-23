import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

describe('Tabs Component', () => {
  it('renders tabs correctly', () => {
    render(
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account Content</TabsContent>
        <TabsContent value="password">Password Content</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
