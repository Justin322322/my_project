"use client";

import InView from "@/components/ui/in-view";
import FeaturesSectionDemo from "@/components/ui/features-section-demo-1";
import type { CMSContent } from "@/lib/cms-content";

interface FeaturesSectionProps {
  content: CMSContent;
  isEditable?: boolean;
  onEdit?: (field: string, value: string) => void;
}

export function FeaturesSection({ content, isEditable, onEdit }: FeaturesSectionProps) {
  return (
    <section className="px-6 md:px-8 py-20 bg-neutral-900 dark:bg-black">
      <div className="container mx-auto max-w-7xl">
        <InView className="text-center mb-12">
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-3 tracking-tight ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-neutral-900 transition-all p-2' : ''}`}
            style={{ color: content.theme.primaryColor }}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isEditable && onEdit) {
                onEdit('features.title', e.currentTarget.textContent || '');
              }
            }}
          >
            {content.features.title}
          </h2>
          <p 
            className={`text-lg text-neutral-300 max-w-2xl mx-auto ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-neutral-900 transition-all p-2' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => {
              if (isEditable && onEdit) {
                onEdit('features.description', e.currentTarget.textContent || '');
              }
            }}
          >
            {content.features.description}
          </p>
        </InView>
        <FeaturesSectionDemo 
          cards={content.features.cards}
          isEditable={isEditable}
          onEdit={onEdit}
          primaryColor={content.theme.primaryColor}
        />
      </div>
    </section>
  );
}
