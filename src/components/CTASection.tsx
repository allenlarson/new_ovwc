'use client';

import { type ReactNode } from 'react';
import SectionReveal from './SectionReveal';

interface CTASectionProps {
  heading: ReactNode;
  subtext: string;
  onCtaClick: () => void;
  buttonText?: string;
}

export default function CTASection({
  heading,
  subtext,
  onCtaClick,
  buttonText = 'Start a Project',
}: CTASectionProps) {
  return (
    <section className="py-32 px-6 mesh-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <SectionReveal>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight mb-6">
            {heading}
          </h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            {subtext}
          </p>
          <button
            onClick={onCtaClick}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-lg hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {buttonText}
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
