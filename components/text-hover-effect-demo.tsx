"use client";

import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useState } from "react";

interface TextHoverEffectDemoProps {
  text?: string;
  isEditable?: boolean;
  onEdit?: (value: string) => void;
}

export default function TextHoverEffectDemo({ 
  text = "BookEasy", 
  isEditable = false,
  onEdit 
}: TextHoverEffectDemoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);

  if (isEditable && isEditing) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            if (onEdit && editValue !== text) {
              onEdit(editValue);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false);
              if (onEdit && editValue !== text) {
                onEdit(editValue);
              }
            }
          }}
          autoFocus
          className="text-6xl md:text-8xl font-bold bg-transparent text-white border-2 border-primary px-4 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    );
  }

  return (
    <div 
      className={`h-[300px] flex items-center justify-center ${isEditable ? 'cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-4 hover:ring-offset-black transition-all rounded-lg' : ''}`}
      onClick={() => isEditable && setIsEditing(true)}
    >
      <TextHoverEffect text={text} />
    </div>
  );
}
