"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FeaturesSectionDemo from "@/components/ui/features-section-demo-1";
import InView from "@/components/ui/in-view";
import TextHoverEffectDemo from "@/components/text-hover-effect-demo";
import LightRays from "@/components/LightRays";

import {
  CalendarIcon,
  CheckCircle2,
  ArrowUp,
  AlertCircle,
  X,
} from "lucide-react";

// Generate time slots from 9 AM to 5:30 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const displayTime = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
      slots.push({ value: time, label: displayTime });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must be less than 100 characters.",
    })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/, {
      message: "Full name can only include letters, spaces, hyphens, and apostrophes.",
    })
    .refine((val) => val.length >= 2, {
      message: "Name cannot be empty after removing spaces.",
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({
      message: "Please enter a valid email address.",
    })
    .max(255, {
      message: "Email must be less than 255 characters.",
    }),
  date: z.date({
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  message: z
    .string()
    .max(1000, {
      message: "Message must be less than 1000 characters.",
    })
    .optional(),
}).refine(
  (data) => {
    // Validate that date + time combination isn't in the past
    if (!data.date || !data.time) {
      return true; // Let individual field validations handle missing values
    }

    const [hours, minutes] = data.time.split(":").map(Number);
    const selectedDateTime = new Date(data.date);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    return selectedDateTime >= now;
  },
  {
    message: "The selected date and time must be in the future.",
    path: ["time"], // Show error on time field
  }
);

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      time: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToForm = () => {
    document.getElementById("booking-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Trim and format values before submission
      const formattedValues = {
        ...values,
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        date: format(values.date, "yyyy-MM-dd"),
        message: values.message?.trim() || undefined,
      };

      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setSubmitError(null);
        form.reset();
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        const errorMessage = data.error || "Failed to book appointment. Please try again.";
        setSubmitError(errorMessage);
        // Scroll to error and focus on first error field
        document.getElementById("booking-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setTimeout(() => {
          const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement;
          firstErrorField?.focus();
        }, 300);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error 
        ? `Network error: ${error.message}. Please check your connection and try again.`
        : "Failed to book appointment. Please try again.";
      setSubmitError(errorMessage);
      // Scroll to form
      document.getElementById("booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen relative">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-8 overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 z-0 pointer-events-none bg-black" aria-hidden>
          <LightRays
            raysOrigin="top-center"
            raysColor="#7c3aed"
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
            {/* Left: Big headline (uses our product copy) */}
            <InView className="md:col-span-7 lg:col-span-8 max-w-[56rem] text-center md:text-left">
              <h1 className="font-extrabold text-white tracking-tight leading-[0.95] sm:leading-[0.9]">
                <span className="block text-[clamp(2.25rem,10vw,4rem)] md:text-[6.2vw] lg:text-[5.2vw]">SCHEDULE</span>
                <span className="block text-[clamp(2.25rem,10vw,4rem)] md:text-[6.2vw] lg:text-[5.2vw]">YOUR</span>
                <span className="block text-[clamp(2.5rem,12vw,4.5rem)] md:text-[7.5vw] lg:text-[6.5vw]"><span className="text-[#8b5cf6]">APPOINTMENT</span></span>
                <span className="block text-[clamp(2.25rem,10vw,4rem)] md:text-[6.2vw] lg:text-[5.2vw]">IN SECONDS</span>
              </h1>
            </InView>

            {/* Right: Eyebrow, title, copy and CTA (app-aligned) */}
            <InView className="md:col-span-5 lg:col-span-4 text-white/90 md:pl-4 text-center md:text-left" delayMs={150}>
              <div className="h-1 w-24 bg-[#8b5cf6] mb-5 mx-auto md:mx-0" />
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">Fast, Easy Booking</h3>
              <p className="text-sm sm:text-base md:text-lg text-white/80 mb-7 max-w-prose mx-auto md:mx-0">
                Pick a date and time that works for you — we&apos;ll automatically add it
                to your calendar.
              </p>
              <div>
                <HoverBorderGradient
                  as="button"
                  onClick={scrollToForm}
                  containerClassName="rounded-full w-full md:w-auto"
                  className="bg-white dark:bg-black text-black dark:text-white flex items-center justify-center text-base md:text-lg font-semibold px-8 py-3 whitespace-nowrap w-full md:w-auto cursor-pointer"
                >
                  Book Now
                </HoverBorderGradient>
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-8 py-20 bg-neutral-900 dark:bg-black">
        <div className="container mx-auto max-w-7xl">
          <InView className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-[#8b5cf6]">
              Fast, Easy, and Hassle-Free Scheduling
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              No more back-and-forth emails. Our online booking form connects
              directly to Google Calendar so your appointment is instantly saved
              and confirmed.
            </p>
          </InView>
          <FeaturesSectionDemo />
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="">
            <InView className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[#8b5cf6]">
                Book Your Appointment
              </h2>
              <p className="text-lg text-white/80">
                Fill out the form below and we&apos;ll confirm your appointment
              </p>
            </InView>

            {submitError && (
              <div
                className="mb-8 bg-destructive/10 border-2 border-destructive/50 rounded-lg p-4 flex items-start gap-3"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive mb-1">
                    Error submitting appointment
                  </p>
                  <p className="text-sm text-destructive/90">{submitError}</p>
                </div>
                <button
                  onClick={() => setSubmitError(null)}
                  className="text-destructive hover:text-destructive/80 shrink-0"
                  aria-label="Dismiss error"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {isSubmitted ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-16 text-center">
                <div className="flex justify-center mb-6">
                  <CheckCircle2 className="h-24 w-24 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-4xl font-bold mb-4">
                  Appointment Confirmed!
                </h3>
                <p className="text-xl text-muted-foreground mb-2">
                  Your appointment has been successfully scheduled.
                </p>
                <p className="text-base text-muted-foreground">
                  Check your email for confirmation details and calendar invite.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    // Focus on first error field when validation fails
                    const firstErrorField = Object.keys(errors)[0];
                    if (firstErrorField) {
                      setTimeout(() => {
                        const errorElement = document.querySelector(
                          `[name="${firstErrorField}"]`
                        ) as HTMLElement;
                        if (errorElement) {
                          errorElement.focus();
                          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }, 100);
                    }
                  })} 
                  className="space-y-12"
                >
                  {/* Contact Information */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">
                        Contact Information
                      </h3>
                      <div className="h-1 w-20 bg-primary rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <InView>
                            <FormItem>
                              <FormLabel className="text-lg font-medium">
                                Full Name <span aria-hidden="true" className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  autoComplete="name"
                                  aria-required="true"
                                  maxLength={100}
                                  className="h-14 text-base border-2 focus-visible:ring-2"
                                  {...field}
                                  onChange={(e) => {
                                    const sanitized = e.target.value
                                      .replace(/[0-9]/g, "")
                                      .slice(0, 100);
                                    field.onChange({
                                      ...e,
                                      target: { ...e.target, value: sanitized },
                                    });
                                    setSubmitError(null);
                                  }}
                                />
                              </FormControl>
                              <FormDescription className="text-sm text-muted-foreground">
                                Enter your first and last name
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          </InView>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <InView delayMs={100}>
                            <FormItem>
                              <FormLabel className="text-lg font-medium">
                                Email Address <span aria-hidden="true" className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your.email@example.com"
                                  type="email"
                                  autoComplete="email"
                                  aria-required="true"
                                  maxLength={255}
                                  className="h-14 text-base border-2 focus-visible:ring-2"
                                  {...field}
                                  onChange={(e) => {
                                    const sanitized = e.target.value
                                      .replace(/\s+/g, "")
                                      .slice(0, 255);
                                    field.onChange({
                                      ...e,
                                      target: { ...e.target, value: sanitized },
                                    });
                                    setSubmitError(null);
                                  }}
                                />
                              </FormControl>
                              <FormDescription className="text-sm text-muted-foreground">
                                We&apos;ll send confirmation details to this email
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          </InView>
                        )}
                      />
                    </div>
                  </div>

                  {/* Appointment Schedule */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">
                        Select Date & Time
                      </h3>
                      <div className="h-1 w-20 bg-primary rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <InView>
                            <FormItem>
                              <FormLabel className="text-lg font-medium">
                                Date <span aria-hidden="true" className="text-destructive">*</span>
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full h-14 text-base pl-4 text-left font-normal justify-start border-2 hover:bg-accent/50",
                                        !field.value && "text-muted-foreground"
                                      )}
                                      aria-label="Pick appointment date"
                                      aria-required="true"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      field.onChange(date);
                                      setSubmitError(null);
                                      
                                      // If date changes, check if current time is still valid
                                      const currentTime = form.getValues("time");
                                      if (date && currentTime) {
                                        const [hours, minutes] = currentTime.split(":").map(Number);
                                        const selectedDateTime = new Date(date);
                                        selectedDateTime.setHours(hours, minutes, 0, 0);
                                        const now = new Date();
                                        
                                        // If the date+time combination is now in the past, clear the time
                                        if (selectedDateTime < now) {
                                          form.setValue("time", "");
                                          form.clearErrors("time");
                                        }
                                      }
                                    }}
                                    disabled={(date) =>
                                      date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          </InView>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => {
                          const selectedDate = form.watch("date");
                          const now = new Date();
                          const isToday = selectedDate && 
                            selectedDate.toDateString() === now.toDateString();
                          
                          // Filter time slots based on selected date
                          const availableTimeSlots = isToday
                            ? timeSlots.filter((slot) => {
                                const [hours, minutes] = slot.value.split(":").map(Number);
                                const slotDateTime = new Date(selectedDate);
                                slotDateTime.setHours(hours, minutes, 0, 0);
                                return slotDateTime > now;
                              })
                            : timeSlots;
                          
                          return (
                            <InView delayMs={100}>
                              <FormItem>
                                <FormLabel className="text-lg font-medium">
                                  Time <span aria-hidden="true" className="text-destructive">*</span>
                                </FormLabel>
                                <Select 
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setSubmitError(null);
                                  }} 
                                  defaultValue={field.value}
                                  disabled={!selectedDate}
                                >
                                  <FormControl>
                                    <SelectTrigger 
                                      className="w-full !h-14 text-base border-2" 
                                      aria-required="true"
                                      aria-disabled={!selectedDate}
                                    >
                                      <SelectValue placeholder={selectedDate ? "Select a time" : "Select a date first"} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableTimeSlots.length > 0 ? (
                                      availableTimeSlots.map((slot) => (
                                        <SelectItem key={slot.value} value={slot.value}>
                                          {slot.label}
                                        </SelectItem>
                                      ))
                                    ) : (
                                      <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                        No available times for today
                                      </div>
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            </InView>
                          );
                        }}
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">
                        Additional Notes <span className="text-muted-foreground font-normal text-xl">(optional)</span>
                      </h3>
                      <div className="h-1 w-20 bg-primary rounded-full" />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => {
                        const currentLength = field.value?.length || 0;
                        const maxLength = 1000;
                        const isNearLimit = currentLength > maxLength * 0.9;
                        
                        return (
                          <InView>
                            <FormItem>
                              <FormLabel className="text-lg font-medium">
                                Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us anything that will help us prepare for your appointment..."
                                  rows={6}
                                  maxLength={maxLength}
                                  className="text-base resize-none border-2 focus-visible:ring-2"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setSubmitError(null);
                                  }}
                                />
                              </FormControl>
                              <div className="flex justify-between items-center">
                                <FormMessage />
                                <span
                                  className={`text-xs ${
                                    isNearLimit
                                      ? "text-destructive"
                                      : "text-muted-foreground"
                                  }`}
                                  aria-live="polite"
                                >
                                  {currentLength} / {maxLength}
                                </span>
                              </div>
                            </FormItem>
                          </InView>
                        );
                      }}
                    />
                  </div>

                  <InView className="pt-8" delayMs={150}>
                    <div className="flex justify-center">
                      <button type="submit" disabled={form.formState.isSubmitting} className="w-full cursor-pointer disabled:cursor-not-allowed">
                        <HoverBorderGradient
                          as="div"
                          containerClassName="rounded-md w-full"
                          className="bg-background text-foreground flex items-center justify-center text-lg font-semibold h-16 w-full"
                        >
                          {form.formState.isSubmitting ? (
                            <>
                              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                              Confirming...
                            </>
                          ) : (
                            "Confirm Appointment"
                          )}
                        </HoverBorderGradient>
                      </button>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-6">
                      By submitting, you agree to receive appointment confirmations via email
                    </p>
                  </InView>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/50 transition-shadow duration-300 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-black text-white">
        {/* Text Hover Effect Section */}
        <div className="border-b border-white/10">
          <div className="container mx-auto max-w-7xl px-4">
            <TextHoverEffectDemo />
          </div>
        </div>

        {/* Footer Content */}
        <div className="container mx-auto max-w-7xl px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
            {/* Left Side - Tagline */}
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Let there be change
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
          <div className="pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              © 2025 BookEasy. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
