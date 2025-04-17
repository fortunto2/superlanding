'use client';

import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function Hero({
  title = "Create Stunning Landing Pages in Minutes",
  subtitle = "The fastest way to build and deploy high-converting landing pages with modern designs and powerful features.",
  buttonText = "Get Started",
  buttonLink = "#",
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-hero-gradient bg-grid-white/25 px-4 py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-b-4 border-indigo-700 hover:border-b-2 hover:mt-0.5 hover:brightness-110 transition-all duration-150"
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150"
          >
            <a href="/examples">View Examples</a>
          </Button>
        </div>
      </div>
    </section>
  );
} 