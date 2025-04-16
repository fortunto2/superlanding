import { render, screen } from '@testing-library/react';
import Features, { type FeatureItem } from './Features';

describe('Features component', () => {
  const mockFeatures: FeatureItem[] = [
    {
      title: 'Feature 1',
      description: 'Description for feature 1',
      icon: '/icons/feature1.svg',
    },
    {
      title: 'Feature 2',
      description: 'Description for feature 2',
      icon: '/icons/feature2.svg',
    },
    {
      title: 'Feature 3',
      description: 'Description for feature 3',
      icon: '/icons/feature3.svg',
    },
  ];

  it('renders features section with title and subtitle', () => {
    render(
      <Features
        title="Test Features Title"
        subtitle="Test Subtitle"
        description="Test description for features section"
        features={mockFeatures}
      />
    );
    
    expect(screen.getByText('Test Features Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test description for features section')).toBeInTheDocument();
    
    // Check all features are rendered
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
    
    // Check descriptions
    expect(screen.getByText('Description for feature 1')).toBeInTheDocument();
    expect(screen.getByText('Description for feature 2')).toBeInTheDocument();
    expect(screen.getByText('Description for feature 3')).toBeInTheDocument();
  });

  it('renders with different layouts', () => {
    const { rerender } = render(
      <Features
        title="Grid Layout"
        features={mockFeatures}
        layout="grid"
      />
    );
    
    expect(screen.getByText('Grid Layout')).toBeInTheDocument();
    
    // Rerender with list layout
    rerender(
      <Features
        title="List Layout"
        features={mockFeatures}
        layout="list"
      />
    );
    
    expect(screen.getByText('List Layout')).toBeInTheDocument();
  });

  it('renders with different column counts', () => {
    render(
      <Features
        features={mockFeatures}
        columns={2}
      />
    );
    
    // We can't easily test the actual layout as JSDOM doesn't compute styles,
    // but we can ensure the component renders with different props
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards.length).toBe(3);
  });

  it('renders with different card variants', () => {
    render(
      <Features
        features={mockFeatures}
        cardVariant="elevated"
      />
    );
    
    // Again, we can't easily test actual visual appearance in JSDOM
    // but we can check the component renders with the specified props
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards.length).toBe(3);
  });
}); 