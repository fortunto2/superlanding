import { Hero } from '@/components/blocks/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero 
        title="SuperLanding - AI-Powered Landing Pages" 
        subtitle="Create beautiful, high-converting landing pages in minutes using our AI-powered platform" 
        buttonText="Start Creating" 
        buttonLink="#get-started" 
      />
    </div>
  );
} 