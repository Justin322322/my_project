"use client";

import InView from "@/components/ui/in-view";
import type { CMSContent } from "@/lib/cms-content";

interface BookingSectionProps {
  content: CMSContent;
  isEditable?: boolean;
  onEdit?: (field: string, value: string) => void;
  children?: React.ReactNode;
}

export function BookingSection({ content, isEditable, onEdit, children }: BookingSectionProps) {
  return (
    <section id="booking-form" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-3xl">
        <div className="">
          <InView className="text-center mb-12">
            <h2 
              className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-background transition-all p-2' : ''}`}
              style={{ color: content.theme.primaryColor }}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable && onEdit) {
                  onEdit('bookingForm.title', e.currentTarget.textContent || '');
                }
              }}
            >
              {content.bookingForm.title}
            </h2>
            <p 
              className={`text-lg text-white/80 ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-background transition-all p-2' : ''}`}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable && onEdit) {
                  onEdit('bookingForm.description', e.currentTarget.textContent || '');
                }
              }}
            >
              {content.bookingForm.description}
            </p>
          </InView>

          {children}
        </div>
      </div>
    </section>
  );
}
