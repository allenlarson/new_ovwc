import { type ReactNode } from 'react';
import SectionReveal from './SectionReveal';

interface HeroSectionProps {
  tag: string;
  heading: ReactNode;
  subtext?: string;
  maxWidth?: string;
  center?: boolean;
}

export default function HeroSection({
  tag,
  heading,
  subtext,
  maxWidth = 'max-w-7xl',
  center = false,
}: HeroSectionProps) {
  return (
    <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
      <div className={`${maxWidth} mx-auto relative z-10 ${center ? 'text-center' : ''}`}>
        <SectionReveal>
          <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">
            {tag}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8">
            {heading}
          </h1>
          {subtext && (
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {subtext}
            </p>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
