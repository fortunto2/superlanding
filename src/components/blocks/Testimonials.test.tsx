import { render, screen } from '@testing-library/react';
import Testimonials, { type TestimonialItem } from './Testimonials';

describe('Testimonials component', () => {
  const mockTestimonials: TestimonialItem[] = [
    {
      quote: 'This is an amazing product that has completely transformed our business processes.',
      author: {
        name: 'John Doe',
        title: 'CEO',
        company: 'Tech Corp',
        avatar: '/avatars/john.jpg',
      },
      rating: 5,
    },
    {
      quote: 'The customer support is exceptional and the product is very intuitive.',
      author: {
        name: 'Jane Smith',
        title: 'Marketing Director',
        company: 'Creative Agency',
      },
      rating: 4,
    },
    {
      quote: 'We\'ve seen a 40% increase in productivity since implementing this solution.',
      author: {
        name: 'Robert Johnson',
        company: 'Enterprise Ltd',
      },
    },
  ];

  it('renders testimonials section with title and subtitle', () => {
    render(
      <Testimonials
        title="What Our Customers Say"
        subtitle="Testimonials"
        description="Read what our customers have to say about our products and services."
        testimonials={mockTestimonials}
      />
    );
    
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Read what our customers have to say about our products and services.')).toBeInTheDocument();
    
    // Check all testimonials are rendered
    expect(screen.getByText('"This is an amazing product that has completely transformed our business processes."')).toBeInTheDocument();
    expect(screen.getByText('"The customer support is exceptional and the product is very intuitive."')).toBeInTheDocument();
    expect(screen.getByText('"We\'ve seen a 40% increase in productivity since implementing this solution."')).toBeInTheDocument();
    
    // Check author information
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Robert Johnson')).toBeInTheDocument();
    
    // Check author titles/companies
    expect(screen.getByText('CEO, Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Marketing Director, Creative Agency')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Ltd')).toBeInTheDocument();
  });

  it('renders with different layouts', () => {
    const { rerender } = render(
      <Testimonials
        title="Grid Layout"
        testimonials={mockTestimonials}
        layout="grid"
      />
    );
    
    expect(screen.getByText('Grid Layout')).toBeInTheDocument();
    
    // Rerender with slider layout
    rerender(
      <Testimonials
        title="Slider Layout"
        testimonials={mockTestimonials}
        layout="slider"
      />
    );
    
    expect(screen.getByText('Slider Layout')).toBeInTheDocument();
    
    // Rerender with masonry layout
    rerender(
      <Testimonials
        title="Masonry Layout"
        testimonials={mockTestimonials}
        layout="masonry"
      />
    );
    
    expect(screen.getByText('Masonry Layout')).toBeInTheDocument();
  });

  it('renders with different column counts', () => {
    render(
      <Testimonials
        testimonials={mockTestimonials}
        columns={2}
      />
    );
    
    // Check all testimonial cards are rendered
    const testimonialCards = screen.getAllByTestId('testimonial-card');
    expect(testimonialCards.length).toBe(3);
  });

  it('displays correct star ratings', () => {
    render(
      <Testimonials
        testimonials={mockTestimonials}
      />
    );
    
    // We can't easily test the actual stars in JSDOM, but we can check that rating elements exist
    const ratingElements = screen.getAllByTestId('testimonial-rating');
    expect(ratingElements.length).toBe(2); // Only 2 testimonials have ratings
  });
}); 