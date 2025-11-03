import { useId } from "react";
import { FaCalendarAlt, FaCalendarCheck, FaBell, FaClock, FaSyncAlt, FaMobileAlt, FaShieldAlt, FaRegClock, FaBolt, FaArrowsAltH, FaCalendarDay } from "react-icons/fa";
import InView from "@/components/ui/in-view";

export default function FeaturesSectionDemo() {
  return (
    <div className="py-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full">
        {grid.map((feature, index) => (
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
              <Grid size={20} />
              <p className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-white relative z-20 mb-4 transition-colors duration-300 group-hover:text-primary">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20 flex-grow transition-colors duration-300 group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
                {feature.description}
              </p>

              {/* Bottom center decorative big icon - show only upper half */}
              <div className="pointer-events-none absolute bottom-0 right-0">
                {/* Base grayscale glow */}
                <div className="absolute bottom-0 right-0 translate-y-[55%] h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl opacity-70" />
                {/* Purple glow only on hover */}
                <div className="absolute bottom-0 right-0 translate-y-[55%] h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-gradient-to-t from-purple-700/50 via-purple-500/30 to-transparent blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                {/* Icon positioned so only quarter is visible in lower-right */}
                <div className="absolute bottom-0 right-0 translate-y-1/2">
                  {getIconForFeature(feature.title, index)}
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
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [7, 1],
    [8, 2],
    [9, 3],
    [10, 4],
    [11, 5],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-purple-900/30 from-purple-100/30 to-purple-300/30 dark:to-purple-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-purple-400/10 dark:stroke-purple-400/10 stroke-purple-600/10 fill-purple-600/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

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
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
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
          {squares.map(([squareX, squareY]: any, index: number) => (
            <rect
              strokeWidth="0"
              key={`square-${index}-${squareX}-${squareY}`}
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function getIconByIndex(index: number) {
  const commonClass = "text-white/20 transition-all duration-300 group-hover:text-purple-400/85 group-hover:drop-shadow-[0_0_28px_rgba(168,85,247,0.35)]";
  const big = 200; // px size for large icon (smaller, clearer)
  switch (index % 8) {
    case 0:
      return <FaCalendarAlt size={big} className={commonClass} />;
    case 1:
      return <FaCalendarCheck size={big} className={commonClass} />;
    case 2:
      return <FaBell size={big} className={commonClass} />;
    case 3:
      return <FaClock size={big} className={commonClass} />;
    case 4:
      return <FaSyncAlt size={big} className={commonClass} />;
    case 5:
      return <FaMobileAlt size={big} className={commonClass} />;
    case 6:
      return <FaShieldAlt size={big} className={commonClass} />;
    default:
      return <FaRegClock size={big} className={commonClass} />;
  }
}

function getIconForFeature(title: string, index: number) {
  const normalized = title.toLowerCase();
  const commonClass = "text-white/20 transition-all duration-300 group-hover:text-purple-400/85 group-hover:drop-shadow-[0_0_28px_rgba(168,85,247,0.35)]";
  const big = 200;

  if (normalized.includes("instant confirmation")) {
    return <FaBolt size={big} className={commonClass} />;
  }
  if (normalized.includes("automatic reminders")) {
    return <FaCalendarDay size={big} className={commonClass} />;
  }
  if (normalized.includes("flexible time slots")) {
    return <FaArrowsAltH size={big} className={commonClass} />;
  }
  if (normalized.includes("24/7 availability")) {
    return <FaRegClock size={big} className={commonClass} />;
  }

  // fallback to index-based icon for others
  return getIconByIndex(index);
}
