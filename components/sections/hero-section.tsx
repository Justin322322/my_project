"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import InView from "@/components/ui/in-view";
import LightRays from "@/components/LightRays";
import type { CMSContent } from "@/lib/cms-content";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  content: CMSContent;
  isEditable?: boolean;
  onEdit?: (field: string, value: string | string[]) => void;
  scrollToForm?: () => void;
}

export function HeroSection({ content, isEditable, onEdit, scrollToForm }: HeroSectionProps) {
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Sync content with contentEditable elements when content changes
  useEffect(() => {
    if (isEditable) {
      content.hero.headline.forEach((word, index) => {
        const element = headlineRefs.current[index];
        if (element) {
          // Update text if different
          if (element.textContent !== word) {
            element.textContent = word;
          }
          // Highlight the 3rd word (index 2) - typically "APPOINTMENT"
          const isHighlighted = index === 2;
          element.style.color = isHighlighted ? content.theme.primaryColor : 'white';
        }
      });
    }
  }, [content.hero.headline, content.theme.primaryColor, isEditable]);
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-8 overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 z-0 pointer-events-none bg-black" aria-hidden>
        <LightRays
          raysOrigin="top-center"
          raysColor={content.theme.accentColor}
          raysSpeed={1.0}
          lightSpread={1.2}
          rayLength={2}
          pulsating={true}
          fadeDistance={1.0}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.05}
          distortion={0.08}
        />
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-12 items-center gap-8 sm:gap-10 lg:gap-16">
          <InView className="md:col-span-7 lg:col-span-8 max-w-[56rem] text-center md:text-left">
            <h1 className="font-extrabold text-white tracking-tight leading-[0.95] sm:leading-[0.9]">
              {content.hero.headline.map((word, index) => {
                // Highlight the 3rd word (index 2) - typically "APPOINTMENT"
                const isHighlighted = index === 2;
                return (
                  <span 
                    key={index}
                    ref={(el) => { headlineRefs.current[index] = el; }}
                    className={`block ${isHighlighted
                      ? "text-[clamp(2.5rem,12vw,4.5rem)] md:text-[7.5vw] lg:text-[6.5vw]"
                      : "text-[clamp(2.25rem,10vw,4rem)] md:text-[6.2vw] lg:text-[5.2vw]"
                    } ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-black transition-all px-2' : ''}`}
                    style={{ color: isHighlighted ? content.theme.primaryColor : 'white' }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      if (isEditable && onEdit) {
                        // Get only text content, strip any HTML
                        const text = e.currentTarget.textContent || '';
                        if (text !== word) {
                          onEdit(`hero.headline.${index}`, text);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.currentTarget.blur();
                      }
                    }}
                    onInput={(e) => {
                      // Preserve color while editing the highlighted word
                      if (isEditable && isHighlighted) {
                        e.currentTarget.style.color = content.theme.primaryColor;
                      }
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>
          </InView>

          <InView className="md:col-span-5 lg:col-span-4 text-white/90 md:pl-4 text-center md:text-left" delayMs={150}>
            <div className="h-1 w-24 mb-5 mx-auto md:mx-0" style={{ backgroundColor: content.theme.primaryColor }} />
            <h3 
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-black transition-all p-2' : ''}`}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable && onEdit) {
                  onEdit('hero.title', e.currentTarget.textContent || '');
                }
              }}
            >
              {content.hero.title}
            </h3>
            <p 
              className={`text-sm sm:text-base md:text-lg text-white/80 mb-7 max-w-prose mx-auto md:mx-0 ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-black transition-all p-2' : ''}`}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable && onEdit) {
                  onEdit('hero.description', e.currentTarget.textContent || '');
                }
              }}
            >
              {content.hero.description}
            </p>
            <div>
              <HoverBorderGradient
                as="button"
                onClick={scrollToForm}
                containerClassName="rounded-full w-full md:w-auto"
                className={`bg-white dark:bg-black text-black dark:text-white flex items-center justify-center text-base md:text-lg font-semibold px-8 py-3 whitespace-nowrap w-full md:w-auto cursor-pointer ${isEditable ? 'hover:ring-2 hover:ring-primary hover:ring-offset-4 transition-all' : ''}`}
              >
                <span
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (isEditable && onEdit) {
                      e.stopPropagation();
                      onEdit('hero.ctaText', e.currentTarget.textContent || '');
                    }
                  }}
                  onClick={(e) => {
                    if (isEditable) {
                      e.stopPropagation();
                    }
                  }}
                  className={isEditable ? 'cursor-text' : ''}
                >
                  {content.hero.ctaText}
                </span>
              </HoverBorderGradient>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
