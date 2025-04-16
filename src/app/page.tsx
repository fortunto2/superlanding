import { Locale } from '@/lib/i18n';
import Hero from "@/components/blocks/Hero";
import Features from "@/components/blocks/Features";
import Testimonials from "@/components/blocks/Testimonials";
import CTA from "@/components/blocks/CTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  // В будущем это будет получено из Strapi API
  const locale = 'en' as Locale;

  // Данные для Hero секции
  const heroData = {
    title: "Turn Vibes into Videos – Instantly.",
    subtitle: "AI-powered filmmaking",
    description: "AI filmmaking for creators, businesses, musicians, and teams.",
    primaryCta: {
      text: "Start Creating for Free",
      link: "/signup"
    },
    secondaryCta: {
      text: "Watch a Demo",
      link: "/demo"
    },
    image: {
      src: "/hero-image.svg",
      alt: "SuperDuperAI filmmaking platform illustration",
      width: 500,
      height: 400
    },
    gradient: true,
    align: "left" as const,
    contrast: "light" as const
  };

  // Данные для Features секции (How It Works)
  const featuresData = {
    title: "Direct your video in 3 easy steps",
    subtitle: "How It Works",
    description: "AI agents handle the rest, allowing you to focus on your creative vision.",
    layout: "grid" as const,
    background: "brand" as const,
    features: [
      {
        title: "Define Your Vision",
        description: "Describe your idea, vibe, and storyline to set the creative direction.",
        icon: "/icons/lightbulb.svg"
      },
      {
        title: "AI Generates the Scene",
        description: "Multi-agent AI creates the script, scene, and characters according to your vision.",
        icon: "/icons/robot.svg"
      },
      {
        title: "Refine and Finalize",
        description: "Adjust the style, text, and export to your preferred format.",
        icon: "/icons/sliders.svg"
      }
    ]
  };

  // Данные для Use Cases секции
  const useCasesData = {
    title: "Made for Creators, Businesses, Musicians & Teams",
    subtitle: "Use Cases",
    description: "SuperDuperAI helps diverse creators bring their visions to life.",
    layout: "alternating" as const,
    features: [
      {
        title: "Creators & Influencers",
        description: "Create more content, grow your audience, and increase your revenue with AI-powered video tools.",
        image: {
          src: "/images/creators.jpg",
          alt: "Creators using SuperDuperAI"
        }
      },
      {
        title: "Small Businesses",
        description: "Create professional video ads without agencies or expensive production costs.",
        image: {
          src: "/images/business.jpg",
          alt: "Small business using SuperDuperAI"
        }
      },
      {
        title: "Musicians & Artists",
        description: "Create music videos and visuals that match your track's vibe, with no budget constraints.",
        image: {
          src: "/images/education.jpg",
          alt: "Musicians using SuperDuperAI"
        }
      },
      {
        title: "Agencies & Teams",
        description: "Rapid prototyping and collaborative work on client projects.",
        image: {
          src: "/images/healthcare.jpg",
          alt: "Agency teams using SuperDuperAI"
        }
      }
    ]
  };

  // Данные для Features секции (What Makes SuperDuperAI Super)
  const superFeaturesData = {
    title: "What Makes SuperDuperAI Super",
    subtitle: "Features",
    description: "Our cutting-edge AI technology empowers you to create professional videos easily.",
    columns: 3 as const,
    features: [
      {
        title: "Custom Characters with AI Memory",
        description: "Create your own AI actor database with personalized LoRA models."
      },
      {
        title: "Cinematic Camera Controls",
        description: "Pans, zooms, bullet-time, and more without an actual camera."
      },
      {
        title: "Multi-Agent AI Workflow",
        description: "Each agent specializes in a specific task for optimal results."
      },
      {
        title: "Fast & Efficient",
        description: "Go from idea to video in minutes, not weeks."
      },
      {
        title: "Cost Saving",
        description: "Cinematography-quality results at a fraction of the cost."
      },
      {
        title: "Easy Editing & Integration",
        description: "Storyboard, drag-drop interface, and export to TikTok, YouTube, and more."
      }
    ]
  };

  // Данные для Testimonials секции
  const testimonialsData = {
    title: "What Our Users Say",
    subtitle: "Testimonials",
    description: "Join thousands of creators who love SuperDuperAI.",
    background: "light" as const,
    testimonials: [
      {
        quote: "We saved weeks. Now we scale faster.",
        author: {
          name: "Alex J.",
          title: "Creative Director",
          company: "Marketing Agency",
          avatar: "/avatars/alex.jpg"
        },
        rating: 5 as const
      },
      {
        quote: "My music video, no budget, huge vibe.",
        author: {
          name: "Jasmine K.",
          title: "Indie Musician",
          avatar: "/avatars/jasmine.jpg"
        },
        rating: 5 as const
      },
      {
        quote: "Twice the content. More subs.",
        author: {
          name: "Marco P.",
          title: "YouTuber",
          avatar: "/avatars/marco.jpg"
        },
        rating: 4 as const
      }
    ]
  };

  // Данные для CTA секции
  const ctaData = {
    title: "Ready to create your next video sensation?",
    description: "Join SuperDuperAI and start creating amazing videos today. No credit card required.",
    primaryButton: {
      text: "Start Creating for Free",
      link: "/signup"
    },
    background: "gradient" as const,
    layout: "centered" as const
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />
      
      <main className="flex-grow">
        <Hero {...heroData} />
        <Features {...featuresData} />
        <Features {...useCasesData} />
        <Features {...superFeaturesData} />
        <Testimonials {...testimonialsData} />
        <CTA {...ctaData} />
      </main>
      
      <Footer />
    </div>
  );
}
