import React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

// Define features section variants using class-variance-authority
const featuresVariants = cva(
  'w-full py-16 md:py-24',
  {
    variants: {
      layout: {
        grid: 'grid-layout',
        list: 'list-layout',
        alternating: 'alternating-layout',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      background: {
        light: 'bg-white text-gray-900',
        dark: 'bg-gray-900 text-white',
        brand: 'bg-blue-50 text-gray-900',
      },
    },
    defaultVariants: {
      layout: 'grid',
      align: 'center',
      background: 'light',
    },
  }
);

// Feature card variant styles
const featureCardVariants = cva(
  'h-full p-6 rounded-lg transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200 hover:shadow-md',
        outlined: 'border border-gray-200 hover:border-blue-500',
        flat: 'bg-gray-50 hover:bg-gray-100',
        elevated: 'bg-white shadow-md hover:shadow-lg',
      },
      iconPosition: {
        top: 'flex flex-col items-center gap-4',
        left: 'flex flex-row items-start gap-4',
        hidden: 'icon-hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
      iconPosition: 'top',
    },
  }
);

export type FeatureItem = {
  title: string;
  description: string;
  icon?: string; // Path to icon image
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
};

export type FeaturesProps = VariantProps<typeof featuresVariants> & {
  title?: string;
  subtitle?: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
  cardClassName?: string;
  iconPosition?: 'top' | 'left' | 'hidden';
};

export default function Features({
  title,
  subtitle,
  description,
  features,
  layout,
  align,
  background,
  columns = 3,
  className,
  cardClassName,
  iconPosition = 'top',
}: FeaturesProps) {
  const sectionClasses = featuresVariants({ layout, align, background, className });
  
  // Grid layout configuration based on columns
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];
  
  // Grid or list layout based on the selected layout
  const featuresLayout = layout === 'list' ? (
    <div className="space-y-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          className={cardClassName}
          iconPosition="left"
        />
      ))}
    </div>
  ) : layout === 'alternating' ? (
    <div className="space-y-16">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
        >
          {feature.image && (
            <div className="w-full md:w-1/2">
              <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
          <div className="w-full md:w-1/2 space-y-4">
            {feature.icon && (
              <div className="w-12 h-12 mb-4 text-blue-600">
                <Image
                  src={feature.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold">{feature.title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          className={cardClassName}
          iconPosition={iconPosition}
        />
      ))}
    </div>
  );
  
  return (
    <section 
      className={sectionClasses}
      data-testid="features-section"
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto mb-12 ${align === 'left' ? 'text-left ml-0' : align === 'right' ? 'text-right mr-0' : 'text-center'}`}>
          {subtitle && (
            <p 
              className="text-sm md:text-base font-semibold uppercase tracking-wider text-blue-600 mb-3"
              data-testid="features-subtitle"
            >
              {subtitle}
            </p>
          )}
          
          {title && (
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              data-testid="features-title"
            >
              {title}
            </h2>
          )}
          
          {description && (
            <p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-prose mx-auto"
              data-testid="features-description"
            >
              {description}
            </p>
          )}
        </div>
        
        {featuresLayout}
      </div>
    </section>
  );
}

type FeatureCardProps = {
  feature: FeatureItem;
  className?: string;
  iconPosition?: 'top' | 'left' | 'hidden';
};

function FeatureCard({ feature, className, iconPosition = 'top' }: FeatureCardProps) {
  const isLeftIcon = iconPosition === 'left';
  
  return (
    <Card className={cn("h-full transition-all duration-200 hover:shadow-md", className)} data-testid="feature-card">
      {isLeftIcon ? (
        <div className="flex flex-row items-start gap-4 p-6">
          {feature.icon && iconPosition === 'left' && (
            <div className="min-w-12 text-blue-600 flex-shrink-0">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          )}
          
          <div className="flex-1">
            <CardTitle data-testid="feature-title">{feature.title}</CardTitle>
            <CardDescription className="mt-2" data-testid="feature-description">{feature.description}</CardDescription>
          </div>
        </div>
      ) : (
        <>
          <CardHeader>
            {feature.icon && iconPosition === 'top' && (
              <div className="w-12 h-12 mb-2 text-blue-600 mx-auto">
                <Image
                  src={feature.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            )}
            <CardTitle data-testid="feature-title">{feature.title}</CardTitle>
            <CardDescription data-testid="feature-description">{feature.description}</CardDescription>
          </CardHeader>
          {feature.image && (
            <CardContent className="px-6 pb-6 pt-0">
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt || ""}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          )}
        </>
      )}
    </Card>
  );
} 