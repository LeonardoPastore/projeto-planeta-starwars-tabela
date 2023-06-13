import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './mock/mockData';
import useFetch from '../services/fetchAPI';
import App from '../App';

describe('App', () => {
  it('renders planets data from API', async () => {
    const url = 'http://example.com/api/planets';
    const mockData = { results: [{ name: 'Mars' }, { name: 'Venus' }] };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Venus')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('handles API error', async () => {
    const url = 'http://example.com/api/planets';

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('API Error'))
    );

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('Error fetching data from API')).toBeInTheDocument();

    global.fetch.mockRestore();
  });
  
});