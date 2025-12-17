
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HospitalInfoForm from './HospitalInfoForm';

// Mock react-google-autocomplete
vi.mock('react-google-autocomplete', () => {
  return {
    default: ({ onPlaceSelected, onChange, ...props }: any) => (
      <input
        data-testid="google-autocomplete"
        onChange={(e) => {
            onChange?.(e);
            // Simulate place selection if needed for specific tests
            if (e.target.value === 'Gangnam') {
                 onPlaceSelected({
                    formatted_address: 'Seoul Gangnam',
                    address_components: [
                        { long_name: 'Gangnam-gu', types: ['sublocality_level_1'] }
                    ]
                 })
            }
        }}
        {...props}
      />
    ),
  };
});

describe('HospitalInfoForm', () => {
  const mockInfo = {
    name: '',
    representative_name: '',
    business_registration_number: '',
    phone: '',
    district: '',
    address: '',
    detailed_address: '',
    email: '',
    description: '',
    website: '',
    manager_name: '',
    manager_phone: '',
  };

  const mockOnChange = vi.fn();

  it('renders all fields correctly', () => {
    render(<HospitalInfoForm info={mockInfo} onChange={mockOnChange} />);

    expect(screen.getByPlaceholderText('병원 공식 명칭')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('대표자 성함')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('담당자 성함')).toBeInTheDocument();
    expect(screen.getByText('주소')).toBeInTheDocument();
  });

  it('calls onChange when inputs change', () => {
    render(<HospitalInfoForm info={mockInfo} onChange={mockOnChange} />);

    const nameInput = screen.getByPlaceholderText('병원 공식 명칭');
    fireEvent.change(nameInput, { target: { value: 'New Hospital' } });

    expect(mockOnChange).toHaveBeenCalledWith('name', 'New Hospital');
  });
  
  it('calls onChange when manager info changes', () => {
      render(<HospitalInfoForm info={mockInfo} onChange={mockOnChange} />);
      
      const managerInput = screen.getByPlaceholderText('담당자 성함');
      fireEvent.change(managerInput, { target: { value: 'Manager Kim' } });
      
      expect(mockOnChange).toHaveBeenCalledWith('manager_name', 'Manager Kim');
  });
});
