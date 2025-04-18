import React from "react";
import { Lightbulb, Bot, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-600" />, 
    title: "Define Your Vision",
    description: "Describe your idea, vibe, or story."
  },
  {
    icon: <Bot className="w-8 h-8 text-purple-600" />, 
    title: "AI Generates the Scene",
    description: "Multi-agent AI creates the script, shot, and characters."
  },
  {
    icon: <SlidersHorizontal className="w-8 h-8 text-pink-600" />, 
    title: "Refine and Finalize",
    description: "Adjust style, text, and export your video."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">How It Works</h2>
        <p className="text-lg text-muted-foreground">Direct your video in 3 easy steps – AI agents handle the rest.</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center bg-white dark:bg-card rounded-xl shadow-lg p-8 w-full md:w-1/3 transition-transform hover:scale-105">
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 