import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminLoginPage from './LoginPage';

describe('AdminLoginPage', () => {
  it('should allow admin to log in with valid credentials', async () => {
    render(
      <BrowserRouter>
        <AdminLoginPage />
      </BrowserRouter>
    );

    // Fill in the email and password fields
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'softwareinfotech0@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Test@123' },
    });

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert that the login was successful (mock or actual behavior)
    const successMessage = await screen.findByText(/dashboard/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('should show an error for invalid credentials', async () => {
    render(
      <BrowserRouter>
        <AdminLoginPage />
      </BrowserRouter>
    );

    // Fill in the email and password fields with invalid credentials
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert that an error message is displayed
    const errorMessage = await screen.findByText(/login failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});