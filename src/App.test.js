import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    test('check to render declaration form', () => {
      render(<App />);
      const linkElement = screen.getByText(/Health Covid-19 Declaration/i);
      expect(linkElement).toBeInTheDocument();
    });
});