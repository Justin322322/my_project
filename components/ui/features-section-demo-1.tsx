import React, { useId, type SVGProps } from "react";
import { FaCalendarAlt, FaCalendarCheck, FaBell, FaClock, FaSyncAlt, FaMobileAlt, FaShieldAlt, FaRegClock, FaBolt, FaArrowsAltH, FaCalendarDay } from "react-icons/fa";
import InView from "@/components/ui/in-view";

interface FeatureCard {
  title: string;
  description: string;
}

interface FeaturesSectionDemoProps {
  cards?: FeatureCard[];
  isEditable?: boolean;
  onEdit?: (field: string, value: string) => void;
  primaryColor?: string;
}

export default function FeaturesSectionDemo({ cards = grid, isEditable, onEdit, primaryColor = "#8b5cf6" }: FeaturesSectionDemoProps) {
  return (
    <div className="py-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full">
        {cards.map((feature, index) => (
          <InView
            key={feature.title}
            delayMs={index * 100}
            className="relative"
          >
            <div
              className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-8 overflow-hidden h-[360px] flex flex-col justify-start group shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-shadow duration-300"
            >
              {/* Corner L-markers (exactly in the corners) */}
              <div className="pointer-events-none absolute top-0 left-0 opacity-70">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M1 19V1H19" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-0 opacity-70">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M19 1v18H1" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <Grid size={20} primaryColor={primaryColor} />
              <p 
                className={`text-xl md:text-2xl font-bold text-neutral-800 dark:text-white relative z-20 mb-4 transition-colors duration-300 group-hover:text-primary ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-neutral-900 p-1' : ''}`}
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable && onEdit) {
                    onEdit(`features.cards.${index}.title`, e.currentTarget.textContent || '');
                  }
                }}
              >
                {feature.title}
              </p>
              <p 
                className={`text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20 flex-grow transition-colors duration-300 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 ${isEditable ? 'cursor-text hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-neutral-900 p-1' : ''}`}
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable && onEdit) {
                    onEdit(`features.cards.${index}.description`, e.currentTarget.textContent || '');
                  }
                }}
              >
                {feature.description}
              </p>

              {/* Bottom center decorative big icon - show only upper half */}
              <div className="pointer-events-none absolute bottom-0 right-0">
                {/* Base grayscale glow */}
                <div className="absolute bottom-0 right-0 translate-y-[55%] h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl opacity-70" />
                {/* Color glow only on hover - uses theme color */}
                <div 
                  className="absolute bottom-0 right-0 translate-y-[55%] h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-gradient-to-t to-transparent blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${primaryColor}80, ${primaryColor}4d, transparent)`
                  }}
                />
                {/* Icon positioned so only quarter is visible in lower-right */}
                <div 
                  className="absolute bottom-0 right-0 translate-y-1/2 transition-all duration-300 [color:rgba(255,255,255,0.2)]"
                  style={{
                    '--hover-color': `${primaryColor}d9`,
                    '--hover-glow': `drop-shadow(0 0 28px ${primaryColor}59)`,
                  } as React.CSSProperties}
                >
                  <div className="group-hover:[color:var(--hover-color)] group-hover:[filter:var(--hover-glow)] transition-all duration-300">
                    {getIconForFeature(feature.title, index, primaryColor)}
                  </div>
                </div>
              </div>
            </div>
          </InView>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Instant Confirmation",
    description:
      "Get immediate confirmation of your booking with automated email notifications sent to both you and your clients.",
  },
  {
    title: "Google Calendar Sync",
    description:
      "Automatically sync appointments with Google Calendar, ensuring you never miss a meeting or double-book.",
  },
  {
    title: "Automatic Reminders",
    description:
      "Send automated reminders to clients before their appointments, reducing no-shows and improving attendance rates.",
  },
  {
    title: "Flexible Time Slots",
    description:
      "Choose from customizable time slots that fit your schedule, with options for different appointment durations.",
  },
  {
    title: "Easy Rescheduling",
    description:
      "Allow clients to easily reschedule or cancel appointments with just a few clicks, keeping your calendar up to date.",
  },
  {
    title: "Mobile Friendly",
    description:
      "Book appointments on any device with our fully responsive design that works seamlessly on desktop, tablet, and mobile.",
  },
  {
    title: "Secure & Private",
    description:
      "Your data is protected with industry-standard encryption and security measures, ensuring complete privacy and compliance.",
  },
  {
    title: "24/7 Availability",
    description:
      "Accept bookings around the clock, even when you're offline, so clients can schedule at their convenience.",
  },
];

export const Grid = ({
  pattern,
  size,
  primaryColor = "#8b5cf6",
}: {
  pattern?: number[][];
  size?: number;
  primaryColor?: string;
}) => {
  const p = pattern ?? [
    [7, 1],
    [8, 2],
    [9, 3],
    [10, 4],
    [11, 5],
  ];
  
  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div 
        className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, ${hexToRgba(primaryColor, 0.3)}, ${hexToRgba(primaryColor, 0.3)})`
        }}
      >
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay"
          primaryColor={primaryColor}
        />
      </div>
    </div>
  );
};

interface GridPatternProps extends SVGProps<SVGSVGElement> {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
  primaryColor?: string;
}

export function GridPattern({ width, height, x, y, squares, primaryColor = "#8b5cf6", ...props }: GridPatternProps) {
  const patternId = useId();
  
  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path 
            d={`M.5 ${height}V.5H${width}`} 
            fill="none"
            stroke={hexToRgba(primaryColor, 0.1)}
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY]: number[], index: number) => (
            <rect
              strokeWidth="0"
              key={`square-${index}-${squareX}-${squareY}`}
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
              fill={hexToRgba(primaryColor, 0.1)}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function getIconByIndexRaw(index: number, size: number) {
  switch (index % 8) {
    case 0:
      return <FaCalendarAlt size={size} />;
    case 1:
      return <FaCalendarCheck size={size} />;
    case 2:
      return <FaBell size={size} />;
    case 3:
      return <FaClock size={size} />;
    case 4:
      return <FaSyncAlt size={size} />;
    case 5:
      return <FaMobileAlt size={size} />;
    case 6:
      return <FaShieldAlt size={size} />;
    default:
      return <FaRegClock size={size} />;
  }
}

function getIconForFeature(title: string, index: number, primaryColor: string) {
  const normalized = title.toLowerCase();
  const big = 200;

  if (normalized.includes("instant confirmation")) {
    return <FaBolt size={big} />;
  }
  if (normalized.includes("automatic reminders")) {
    return <FaCalendarDay size={big} />;
  }
  if (normalized.includes("flexible time slots")) {
    return <FaArrowsAltH size={big} />;
  }
  if (normalized.includes("24/7 availability")) {
    return <FaRegClock size={big} />;
  }

  // fallback to index-based icon for others
  return getIconByIndexRaw(index, big);
}
