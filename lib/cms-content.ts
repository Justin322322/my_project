// CMS Content Configuration
export interface CMSContent {
  hero: {
    headline: string[];
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
  };
  features: {
    title: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  bookingForm: {
    title: string;
    description: string;
  };
  footer: {
    brandName: string;
    companyName: string;
    tagline: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    headingFont: string;
    bodyFont: string;
  };
}

export const defaultContent: CMSContent = {
  hero: {
    headline: ["SCHEDULE", "YOUR", "APPOINTMENT", "IN SECONDS"],
    eyebrow: "Fast, Easy Booking",
    title: "Fast, Easy Booking",
    description: "Pick a date and time that works for you — we'll automatically add it to your calendar.",
    ctaText: "Book Now"
  },
  features: {
    title: "Fast, Easy, and Hassle-Free Scheduling",
    description: "No more back-and-forth emails. Our online booking form connects directly to Google Calendar so your appointment is instantly saved and confirmed.",
    cards: [
      {
        title: "Instant Confirmation",
        description: "Get immediate confirmation of your booking with automated email notifications sent to both you and your clients."
      },
      {
        title: "Google Calendar Sync",
        description: "Automatically sync appointments with Google Calendar, ensuring you never miss a meeting or double-book."
      },
      {
        title: "Automatic Reminders",
        description: "Send automated reminders to clients before their appointments, reducing no-shows and improving attendance rates."
      },
      {
        title: "Flexible Time Slots",
        description: "Choose from customizable time slots that fit your schedule, with options for different appointment durations."
      },
      {
        title: "Easy Rescheduling",
        description: "Allow clients to easily reschedule or cancel appointments with just a few clicks, keeping your calendar up to date."
      },
      {
        title: "Mobile Friendly",
        description: "Book appointments on any device with our fully responsive design that works seamlessly on desktop, tablet, and mobile."
      },
      {
        title: "Secure & Private",
        description: "Your data is protected with industry-standard encryption and security measures, ensuring complete privacy and compliance."
      },
      {
        title: "24/7 Availability",
        description: "Accept bookings around the clock, even when you're offline, so clients can schedule at their convenience."
      }
    ]
  },
  bookingForm: {
    title: "Book Your Appointment",
    description: "Fill out the form below and we'll confirm your appointment"
  },
  footer: {
    brandName: "BookEasy",
    companyName: "BookEasy",
    tagline: "Making appointments simple"
  },
  theme: {
    primaryColor: "#8b5cf6",
    accentColor: "#7c3aed",
    headingFont: "Inter",
    bodyFont: "Inter"
  }
};
