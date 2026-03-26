import { cleanup, render, screen } from '@testing-library/react';
import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App', () => {
  it('renders the empty state when the API returns no events', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: [] });

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Everything is probably alright')).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith('/api/events');
  });
});
