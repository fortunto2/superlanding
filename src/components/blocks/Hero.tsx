'use client';

import React from 'react';
import { Button } from "../ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export function Hero({
  title = 'Build Stunning Landing Pages with AI',
  subtitle = 'Create high-converting, beautiful landing pages in minutes using AI-powered tools and templates',
  buttonText = 'Get Started',
  buttonLink = '#',
}: Partial<HeroProps>) {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 z-0" />
      <div className="container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Button size="lg" asChild>
            <a href={buttonLink}>{buttonText}</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#learn-more">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
} 