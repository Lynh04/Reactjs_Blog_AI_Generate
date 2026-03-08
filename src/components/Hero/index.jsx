import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered",
      description:
        "Generate blog outlines and content suggestions using advanced AI",
    },
    {
      title: "Rich Editor",
      description:
        "Full-featured text editor with formatting tools and live preview",
    },
    {
      title: "Export Ready",
      description: "Export your finished articles in multiple formats",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-slate-950">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          AI Blog Generator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Transform your ideas into compelling blog posts with AI assistance.
          <br />
          Generate outlines, write content, and export beautiful articles.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 hover:shadow-lg dark:hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => navigate("/editor")}
        size="lg"
        className="cursor-pointer bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-semibold rounded-md"
      >
        Start Writing
      </Button>
    </div>
  );
};

export default Hero;
