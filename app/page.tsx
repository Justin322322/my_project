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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  date: z.date({
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  message: z.string().optional(),
});

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      // Format the date to YYYY-MM-DD for the API
      const formattedValues = {
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
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
        form.reset();
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert(data.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book appointment. Please try again.");
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
                Pick a date and time that works for you — we'll automatically add it
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
            <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                Book Your Appointment
              </h2>
              <p className="text-lg text-white/80">
                Fill out the form below and we'll confirm your appointment
              </p>
            </InView>

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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
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
                                Full Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  className="h-14 text-base border-2 focus-visible:ring-2"
                                  {...field}
                                />
                              </FormControl>
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
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your.email@example.com"
                                  type="email"
                                  className="h-14 text-base border-2 focus-visible:ring-2"
                                  {...field}
                                />
                              </FormControl>
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
                                Date
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
                                    onSelect={field.onChange}
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
                        render={({ field }) => (
                          <InView delayMs={100}>
                            <FormItem>
                              <FormLabel className="text-lg font-medium">
                                Time
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full !h-14 text-base border-2">
                                    <SelectValue placeholder="Select a time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot.value} value={slot.value}>
                                      {slot.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          </InView>
                        )}
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
                      render={({ field }) => (
                        <InView>
                          <FormItem>
                            <FormLabel className="text-lg font-medium">
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us anything that will help us prepare for your appointment..."
                                rows={6}
                                className="text-base resize-none border-2 focus-visible:ring-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </InView>
                      )}
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
