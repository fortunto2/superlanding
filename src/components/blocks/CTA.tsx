import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

// Define CTA section variants using class-variance-authority
const ctaVariants = cva(
  'w-full py-12 md:py-16',
  {
    variants: {
      layout: {
        centered: 'text-center',
        split: 'split-layout',
        banner: 'banner-layout',
      },
      background: {
        light: 'bg-white text-gray-900',
        dark: 'bg-gray-900 text-white',
        primary: 'bg-blue-600 text-white',
        gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      },
    },
    defaultVariants: {
      layout: 'centered',
      background: 'light',
    },
  }
);

// Button variant styles
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
        secondary: 'bg-white text-blue-600 hover:bg-gray-100 focus-visible:ring-white',
        outline: 'border border-current text-current hover:bg-opacity-10 focus-visible:ring-current',
        ghost: 'text-current hover:bg-opacity-10 focus-visible:ring-current',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-10 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type CTAProps = VariantProps<typeof ctaVariants> & {
  title: string;
  description?: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
  rounded?: boolean;
};

export default function CTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  image,
  layout,
  background,
  className,
  rounded = false,
}: CTAProps) {
  const sectionClasses = ctaVariants({ layout, background, className });
  
  // For variants with dark backgrounds, adjust the button styles
  const isDarkBg = background === 'dark' || background === 'primary' || background === 'gradient';
  
  const primaryButtonVariant = isDarkBg ? 'secondary' : 'default';
  const secondaryButtonVariant = isDarkBg ? 'outline' : 'outline';
  
  // Different layouts
  const contentLayout = layout === 'split' ? (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="cta-title">{title}</h2>
        
        {description && (
          <p className="text-lg opacity-90" data-testid="cta-description">{description}</p>
        )}
        
        <div className="flex flex-wrap gap-4 pt-2" data-testid="cta-buttons">
          {primaryButton && (
            <Button asChild size="lg" variant={primaryButtonVariant}>
              <Link 
                href={primaryButton.link}
                data-testid="cta-primary-button"
              >
                {primaryButton.text}
              </Link>
            </Button>
          )}
          
          {secondaryButton && (
            <Button asChild size="lg" variant={secondaryButtonVariant}>
              <Link 
                href={secondaryButton.link}
                data-testid="cta-secondary-button"
              >
                {secondaryButton.text}
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      {image && (
        <div className="w-full md:w-1/2" data-testid="cta-image">
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={cn("object-contain", rounded && "rounded-lg overflow-hidden")}
            />
          </div>
        </div>
      )}
    </div>
  ) : layout === 'banner' ? (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight" data-testid="cta-title">{title}</h2>
        
        {description && (
          <p className="text-sm md:text-base opacity-90" data-testid="cta-description">{description}</p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4" data-testid="cta-buttons">
        {primaryButton && (
          <Button asChild size="default" variant={primaryButtonVariant}>
            <Link 
              href={primaryButton.link}
              data-testid="cta-primary-button"
            >
              {primaryButton.text}
            </Link>
          </Button>
        )}
        
        {secondaryButton && (
          <Button asChild size="default" variant={secondaryButtonVariant}>
            <Link 
              href={secondaryButton.link}
              data-testid="cta-secondary-button"
            >
              {secondaryButton.text}
            </Link>
          </Button>
        )}
      </div>
    </div>
  ) : (
    // Default centered layout
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="cta-title">{title}</h2>
      
      {description && (
        <p className="text-lg opacity-90" data-testid="cta-description">{description}</p>
      )}
      
      <div className="flex flex-wrap justify-center gap-4 pt-2" data-testid="cta-buttons">
        {primaryButton && (
          <Button asChild size="lg" variant={primaryButtonVariant}>
            <Link 
              href={primaryButton.link}
              data-testid="cta-primary-button"
            >
              {primaryButton.text}
            </Link>
          </Button>
        )}
        
        {secondaryButton && (
          <Button asChild size="lg" variant={secondaryButtonVariant}>
            <Link 
              href={secondaryButton.link}
              data-testid="cta-secondary-button"
            >
              {secondaryButton.text}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
  
  return (
    <section 
      className={cn(sectionClasses, rounded && "rounded-lg")}
      data-testid="cta-section"
    >
      <div className="container mx-auto px-4">
        {contentLayout}
      </div>
    </section>
  );
} 