import React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

// Define testimonials section variants using class-variance-authority
const testimonialsVariants = cva(
  'w-full py-16 md:py-24',
  {
    variants: {
      layout: {
        grid: 'grid-layout',
        slider: 'slider-layout',
        masonry: 'masonry-layout',
      },
      background: {
        light: 'bg-white text-gray-900',
        dark: 'bg-gray-900 text-white',
        brand: 'bg-blue-50 text-gray-900',
      },
    },
    defaultVariants: {
      layout: 'grid',
      background: 'light',
    },
  }
);

// Testimonial card variant styles
const testimonialCardVariants = cva(
  'h-full p-6 rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200 shadow-sm',
        outlined: 'border border-gray-200',
        filled: 'bg-gray-50',
        elevated: 'bg-white shadow-md',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type TestimonialItem = {
  quote: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: 1 | 2 | 3 | 4 | 5;
};

export type TestimonialsProps = VariantProps<typeof testimonialsVariants> & {
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials: TestimonialItem[];
  columns?: 1 | 2 | 3;
  className?: string;
  cardVariant?: VariantProps<typeof testimonialCardVariants>['variant'];
  cardSize?: VariantProps<typeof testimonialCardVariants>['size'];
};

export default function Testimonials({
  title,
  subtitle,
  description,
  testimonials,
  layout,
  background,
  columns = 2,
  className,
  cardVariant = 'default',
  cardSize = 'md',
}: TestimonialsProps) {
  const sectionClasses = testimonialsVariants({ layout, background, className });
  
  // Grid layout configuration based on columns
  const gridCols = {
    1: '',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns];
  
  // Display testimonials based on layout
  const testimonialsLayout = layout === 'slider' ? (
    // Simple slider implementation (non-functional in this example, would need JS for real sliding)
    <div className="flex overflow-x-auto pb-6 space-x-6 snap-x">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="snap-center flex-shrink-0 w-full md:w-[calc(100%/2-0.75rem)]">
          <TestimonialCard 
            testimonial={testimonial} 
            variant={cardVariant}
            size={cardSize}
          />
        </div>
      ))}
    </div>
  ) : layout === 'masonry' ? (
    // Simple masonry-like layout
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="break-inside-avoid">
          <TestimonialCard 
            testimonial={testimonial} 
            variant={cardVariant}
            size={cardSize}
          />
        </div>
      ))}
    </div>
  ) : (
    // Default grid layout
    <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard 
          key={index} 
          testimonial={testimonial} 
          variant={cardVariant}
          size={cardSize}
        />
      ))}
    </div>
  );
  
  return (
    <section 
      className={sectionClasses}
      data-testid="testimonials-section"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          {subtitle && (
            <p 
              className="text-sm md:text-base font-semibold uppercase tracking-wider text-blue-600 mb-3"
              data-testid="testimonials-subtitle"
            >
              {subtitle}
            </p>
          )}
          
          {title && (
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              data-testid="testimonials-title"
            >
              {title}
            </h2>
          )}
          
          {description && (
            <p 
              className="text-lg text-gray-600 dark:text-gray-300"
              data-testid="testimonials-description"
            >
              {description}
            </p>
          )}
        </div>
        
        {testimonialsLayout}
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  testimonial: TestimonialItem;
  variant?: VariantProps<typeof testimonialCardVariants>['variant'];
  size?: VariantProps<typeof testimonialCardVariants>['size'];
};

function TestimonialCard({ testimonial, variant = 'default', size = 'md' }: TestimonialCardProps) {
  const cardClasses = testimonialCardVariants({ variant, size });
  
  return (
    <div className={cardClasses} data-testid="testimonial-card">
      {testimonial.rating && (
        <div className="flex mb-4" data-testid="testimonial-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
      )}
      
      <blockquote>
        <p className="text-lg font-medium mb-6" data-testid="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      
      <div className="flex items-center">
        {testimonial.author.avatar && (
          <div className="mr-4">
            <Image
              src={testimonial.author.avatar}
              alt={`${testimonial.author.name}'s avatar`}
              width={48}
              height={48}
              className="rounded-full object-cover"
              data-testid="testimonial-avatar"
            />
          </div>
        )}
        
        <div>
          <p className="font-bold" data-testid="testimonial-author">{testimonial.author.name}</p>
          {(testimonial.author.title || testimonial.author.company) && (
            <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="testimonial-author-title">
              {[testimonial.author.title, testimonial.author.company]
                .filter(Boolean)
                .join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 