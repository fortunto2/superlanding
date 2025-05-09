import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

// Define hero variants using class-variance-authority
const heroVariants = cva(
  'relative flex flex-col w-full overflow-hidden',
  {
    variants: {
      size: {
        small: 'py-12 md:py-16',
        medium: 'py-16 md:py-24',
        large: 'py-24 md:py-32',
      },
      align: {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
      },
      contrast: {
        light: 'text-gray-900',
        dark: 'text-white',
      },
    },
    defaultVariants: {
      size: 'medium',
      align: 'center',
      contrast: 'light',
    },
  }
);

export interface HeroProps extends VariantProps<typeof heroVariants> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  backgroundImage?: string;
  className?: string;
  gradient?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  backgroundImage,
  size,
  align,
  contrast,
  className,
  gradient = false,
}: HeroProps) {
  const heroClasses = heroVariants({ size, align, contrast, className });
  
  // Default gradient if enabled
  const gradientStyle = gradient ? {
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  } : {};
  
  // Custom background image if provided
  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : gradientStyle;
  
  return (
    <section 
      className={heroClasses}
      style={backgroundStyle}
      role="region"
      aria-labelledby="hero-title"
      data-testid="hero-section"
    >
      {/* Optional overlay for background images */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 z-0"
          data-testid="background-overlay"
        />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'} gap-8 md:flex-row md:gap-12 md:justify-between`}>
          <div className={`w-full ${image ? 'md:w-1/2' : 'md:max-w-3xl'} space-y-6`}>
            {subtitle && (
              <p 
                className="text-sm md:text-base font-semibold uppercase tracking-wider text-blue-600"
                data-testid="hero-subtitle"
              >
                {subtitle}
              </p>
            )}
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              id="hero-title"
              data-testid="hero-title"
            >
              {title}
            </h1>
            
            {description && (
              <p 
                className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-prose"
                data-testid="hero-description"
              >
                {description}
              </p>
            )}
            
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 pt-2" data-testid="hero-cta-container">
                {primaryCta && (
                  <Button asChild size="lg">
                    <Link 
                      href={primaryCta.link}
                      data-testid="hero-primary-cta"
                    >
                      {primaryCta.text}
                    </Link>
                  </Button>
                )}
                
                {secondaryCta && (
                  <Button asChild variant="outline" size="lg">
                    <Link 
                      href={secondaryCta.link}
                      data-testid="hero-secondary-cta"
                    >
                      {secondaryCta.text}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {image && (
            <div className="w-full md:w-1/2 flex justify-center md:justify-end" data-testid="hero-image-container">
              <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  priority
                  data-testid="hero-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 