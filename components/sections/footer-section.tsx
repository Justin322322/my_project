"use client";

import TextHoverEffectDemo from "@/components/text-hover-effect-demo";
import type { CMSContent } from "@/lib/cms-content";

interface FooterSectionProps {
  content: CMSContent;
  isEditable?: boolean;
  onEdit?: (field: string, value: string) => void;
}

export function FooterSection({ content, isEditable, onEdit }: FooterSectionProps) {
  return (
    <footer className="bg-black text-white">
      <div className="border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4">
          <TextHoverEffectDemo 
            text={content.footer.brandName || "BookEasy"}
            isEditable={isEditable}
            onEdit={(value) => onEdit?.('footer.brandName', value)}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          {/* Left Side - Tagline */}
          <div className="flex-1">
            <h2 
              className={`text-4xl md:text-5xl font-bold leading-tight ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-black transition-all p-2' : ''}`}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable && onEdit) {
                  onEdit('footer.tagline', e.currentTarget.textContent || '');
                }
              }}
            >
              {content.footer.tagline || 'Let there be change'}
            </h2>
          </div>

          {/* Right Side - Two Column Links */}
          <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Preference Center
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Careers
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                About Us
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Contact Us
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Locations
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Sitemap
              </a>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Privacy Statement
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Terms & Conditions
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Cookie Policy/Settings
              </a>
              <a href="#" className="block text-white hover:text-gray-300 transition-colors cursor-pointer">
                Accessibility Statement
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 <span 
              className={isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-black transition-all px-2 py-1' : ''}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable && onEdit) {
                  onEdit('footer.companyName', e.currentTarget.textContent || '');
                }
              }}
            >
              {content.footer.companyName}
            </span>. All Rights Reserved.
          </p>
          {!isEditable && (
            <a
              href="/admin/editor"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Edit
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
