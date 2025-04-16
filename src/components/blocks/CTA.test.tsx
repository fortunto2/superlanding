import { render, screen } from '@testing-library/react';
import CTA from './CTA';

describe('CTA component', () => {
  const defaultProps = {
    title: 'Get Started Today',
    description: 'Join thousands of satisfied customers and transform your business.',
    primaryButton: {
      text: 'Start Free Trial',
      link: '/trial',
    },
    secondaryButton: {
      text: 'Learn More',
      link: '/learn',
    },
  };

  it('renders CTA with title and description', () => {
    render(<CTA {...defaultProps} />);
    
    expect(screen.getByText('Get Started Today')).toBeInTheDocument();
    expect(screen.getByText('Join thousands of satisfied customers and transform your business.')).toBeInTheDocument();
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders with just a title and primary button', () => {
    const minimalProps = {
      title: 'Simple CTA',
      primaryButton: {
        text: 'Click Here',
        link: '/click',
      },
    };
    
    render(<CTA {...minimalProps} />);
    
    expect(screen.getByText('Simple CTA')).toBeInTheDocument();
    expect(screen.getByText('Click Here')).toBeInTheDocument();
    expect(screen.queryByTestId('cta-description')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cta-secondary-button')).not.toBeInTheDocument();
  });

  it('renders with different layouts', () => {
    const { rerender } = render(
      <CTA
        {...defaultProps}
        layout="centered"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    
    // Rerender with split layout
    rerender(
      <CTA
        {...defaultProps}
        layout="split"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    
    // Rerender with banner layout
    rerender(
      <CTA
        {...defaultProps}
        layout="banner"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
  });

  it('renders with image when provided', () => {
    const propsWithImage = {
      ...defaultProps,
      layout: 'split' as const,
      image: {
        src: '/images/cta-image.jpg',
        alt: 'CTA Image',
        width: 500,
        height: 300,
      },
    };
    
    render(<CTA {...propsWithImage} />);
    
    expect(screen.getByTestId('cta-image')).toBeInTheDocument();
  });

  it('renders with different background styles', () => {
    const { rerender } = render(
      <CTA
        {...defaultProps}
        background="light"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    
    // Rerender with dark background
    rerender(
      <CTA
        {...defaultProps}
        background="dark"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    
    // Rerender with primary background
    rerender(
      <CTA
        {...defaultProps}
        background="primary"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    
    // Rerender with gradient background
    rerender(
      <CTA
        {...defaultProps}
        background="gradient"
      />
    );
    
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
  });
}); 