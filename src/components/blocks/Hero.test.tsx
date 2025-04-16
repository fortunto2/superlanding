import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero component', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test description for the hero component',
    primaryCta: {
      text: 'Get Started',
      link: '/get-started',
    },
    secondaryCta: {
      text: 'Learn More',
      link: '/learn-more',
    },
  };

  it('renders the component with minimum props', () => {
    render(<Hero title="Test Title" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
  });

  it('renders the component with all props', () => {
    render(<Hero {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test description for the hero component')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders with correct alignment', () => {
    render(<Hero title="Test Title" align="left" />);
    
    // Проверка наличия классов для выравнивания
    const section = screen.getByRole('region');
    expect(section).toHaveClass('text-left');
  });

  it('renders with background image when provided', () => {
    render(
      <Hero 
        title="Test Title" 
        backgroundImage="/images/test-bg.jpg"
      />
    );
    
    // Проверяем, что есть оверлей для фонового изображения
    expect(screen.getByTestId('background-overlay')).toBeInTheDocument();
  });
}); 