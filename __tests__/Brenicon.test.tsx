
import { screen, render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import BrenIcon from '@/app/components/Layout/Icons/BrenIcon';


    // renders with icon prop
    it('should render with icon prop', () => {
      // Act
      render(<BrenIcon icon={"arrow-right"} dataTestId="test" />);
      
      // Assert
      expect(screen.getByTestId('test')).toBeInTheDocument();
    }
    );
      
