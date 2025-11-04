"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Save,
    Home,
    Layout,
    Palette,
    Sparkles,
    X
} from "lucide-react";
import Link from "next/link";
import type { CMSContent } from "@/lib/cms-content";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { BookingSection } from "@/components/sections/booking-section";
import { FooterSection } from "@/components/sections/footer-section";
import { ThemeProvider } from "@/components/theme-provider";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const fontOptions = [
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat",
    "Poppins", "Playfair Display", "Arial", "Helvetica",
    "Georgia", "Times New Roman", "Courier New", "Verdana", "Trebuchet MS"
];

type Section = "hero" | "features" | "booking" | "footer" | "styling";

export default function VisualEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeSection, setActiveSection] = useState<Section>("hero");
    const [stylingPanelOpen, setStylingPanelOpen] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragCurrentY, setDragCurrentY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStartY(clientY);
        setDragCurrentY(clientY);
        setIsDragging(true);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const delta = clientY - dragStartY;
        if (delta > 0) { // Only allow dragging down
            setDragCurrentY(clientY);
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        const delta = dragCurrentY - dragStartY;
        if (delta > 100) { // If dragged down more than 100px, close
            setStylingPanelOpen(false);
        }
        setIsDragging(false);
        setDragStartY(0);
        setDragCurrentY(0);
    };

    const fetchContent = async () => {
        try {
            const response = await fetch("/api/cms");
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error("Failed to load content");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);

        const startTime = Date.now();

        try {
            await fetch("/api/cms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });

            // Ensure minimum 800ms for better UX
            const elapsed = Date.now() - startTime;
            const minDelay = 800;
            if (elapsed < minDelay) {
                await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
            }

            setSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save");
            setSaving(false);
        }
    };

    const handleEdit = (field: string, value: string | string[]) => {
        if (!content) return;

        const keys = field.split('.');
        const newContent = JSON.parse(JSON.stringify(content)); // Deep clone

        let current: any = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            // Handle array indices
            if (!isNaN(Number(key))) {
                current = current[Number(key)];
            } else {
                current = current[key];
            }
        }

        const lastKey = keys[keys.length - 1];
        let finalValue = value;

        // Special handling for headline - convert string to array
        if (field === 'hero.headline' && typeof value === 'string') {
            finalValue = value.split('\n').filter(line => line.trim() !== '');
        }

        if (!isNaN(Number(lastKey))) {
            current[Number(lastKey)] = finalValue;
        } else {
            current[lastKey] = finalValue;
        }

        setContent(newContent);
    };

    if (loading || !content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    const sections = [
        { title: "Hero Section", id: "hero" as Section, icon: Layout },
        { title: "Features Section", id: "features" as Section, icon: Sparkles },
        { title: "Booking Section", id: "booking" as Section, icon: Layout },
        { title: "Footer", id: "footer" as Section, icon: Layout },
        { title: "Styling", id: "styling" as Section, icon: Palette },
    ];

    return (
        <>
            <ThemeProvider
                headingFont={content.theme.headingFont}
                bodyFont={content.theme.bodyFont}
                primaryColor={content.theme.primaryColor}
                accentColor={content.theme.accentColor}
            />
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">Visual Editor</h2>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenu>
                                {sections.map((section) => (
                                    <SidebarMenuItem key={section.id}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={activeSection === section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={activeSection === section.id ? '!bg-[#8b5cf6] hover:!bg-[#7c3aed]' : ''}
                                        >
                                            <button
                                                className="font-medium w-full !text-white transition-colors [&>svg]:!text-white"
                                            >
                                                <section.icon className="size-4" />
                                                {section.title}
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarRail />
                </Sidebar>

                <SidebarInset>
                    {/* Header */}
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur sticky top-0 z-50">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center justify-between flex-1">
                            <div className="flex-1" />
                            <div className="flex items-center gap-2">
                                <Link href="/">
                                    <Button variant="outline" size="default">
                                        <Home className="h-4 w-4 mr-2" />
                                        Exit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={handleSave}
                                    disabled={saving}
                                    size="default"
                                    className="relative overflow-hidden transition-all min-w-[100px]"
                                >
                                    {saving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            <span>Save</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Save Success Toast */}
                    {saveSuccess && (
                        <div className="fixed top-20 right-4 z-[70] bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 border border-green-400/20">
                            <div className="relative">
                                <svg className="h-6 w-6 animate-in zoom-in duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                            </div>
                            <div>
                                <p className="font-semibold text-base">Saved!</p>
                                <p className="text-xs text-green-50">Changes applied successfully</p>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1 overflow-auto pb-20 lg:pb-0">
                        {/* Styling Panel Toggle Button - Always visible when styling section is active */}
                        {activeSection === "styling" && (
                            <button
                                onClick={() => setStylingPanelOpen(!stylingPanelOpen)}
                                className="fixed bottom-6 right-6 z-[60] bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:scale-105 transition-all active:scale-95"
                                aria-label={stylingPanelOpen ? "Close styling panel" : "Open styling panel"}
                            >
                                {stylingPanelOpen ? <X className="h-6 w-6" /> : <Palette className="h-6 w-6" />}
                            </button>
                        )}

                        {/* Styling Floating Panel */}
                        {activeSection === "styling" && stylingPanelOpen && (
                            <>
                                {/* Backdrop for mobile - click to close */}
                                <div
                                    className="fixed inset-0 bg-black/60 z-40 lg:hidden animate-in fade-in duration-200"
                                    onClick={() => setStylingPanelOpen(false)}
                                />

                                <div
                                    className="fixed inset-x-0 bottom-0 lg:inset-auto lg:right-8 lg:top-24 z-50 w-full lg:w-96 bg-background border-2 border-primary/20 lg:rounded-lg shadow-2xl max-h-[75vh] lg:max-h-[calc(100vh-8rem)] overflow-hidden rounded-t-3xl lg:rounded-t-lg animate-in slide-in-from-bottom duration-300 lg:animate-none"
                                    style={{
                                        transform: isDragging ? `translateY(${Math.max(0, dragCurrentY - dragStartY)}px)` : 'translateY(0)',
                                        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                                    }}
                                >
                                    {/* Drag handle for mobile - drag to close */}
                                    <div
                                        onTouchStart={handleDragStart}
                                        onTouchMove={handleDragMove}
                                        onTouchEnd={handleDragEnd}
                                        onMouseDown={handleDragStart}
                                        onMouseMove={handleDragMove}
                                        onMouseUp={handleDragEnd}
                                        onMouseLeave={handleDragEnd}
                                        className="lg:hidden w-full flex justify-center pt-4 pb-3 bg-background cursor-grab active:cursor-grabbing touch-none select-none"
                                        aria-label="Drag to close panel"
                                    >
                                        <div className="w-12 h-1.5 bg-muted-foreground/40 rounded-full" />
                                    </div>

                                    <div className="sticky top-0 bg-background border-b px-4 py-3 z-10">
                                        <h2 className="text-lg font-bold">Styling Options</h2>
                                        <p className="text-xs text-muted-foreground">Tap and drag handle to close</p>
                                    </div>

                                    <div className="overflow-y-auto max-h-[calc(75vh-120px)] lg:max-h-[calc(100vh-12rem)]">
                                        <div className="p-4 space-y-6">
                                            <div>
                                                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Colors</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label className="text-sm font-medium mb-2 block">Primary Color</Label>
                                                        <div className="flex gap-2">
                                                            <Input
                                                                type="color"
                                                                value={content.theme.primaryColor}
                                                                onChange={(e) => handleEdit('theme.primaryColor', e.target.value)}
                                                                className="w-20 h-11 cursor-pointer border-2"
                                                            />
                                                            <Input
                                                                type="text"
                                                                value={content.theme.primaryColor}
                                                                onChange={(e) => handleEdit('theme.primaryColor', e.target.value)}
                                                                className="flex-1 font-mono text-sm h-11"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label className="text-sm font-medium mb-2 block">Accent Color</Label>
                                                        <div className="flex gap-2">
                                                            <Input
                                                                type="color"
                                                                value={content.theme.accentColor}
                                                                onChange={(e) => handleEdit('theme.accentColor', e.target.value)}
                                                                className="w-20 h-11 cursor-pointer border-2"
                                                            />
                                                            <Input
                                                                type="text"
                                                                value={content.theme.accentColor}
                                                                onChange={(e) => handleEdit('theme.accentColor', e.target.value)}
                                                                className="flex-1 font-mono text-sm h-11"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Typography</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label className="text-sm font-medium mb-2 block">Heading Font</Label>
                                                        <div className="relative">
                                                            <select
                                                                value={content.theme.headingFont}
                                                                onChange={(e) => handleEdit('theme.headingFont', e.target.value)}
                                                                className="flex h-11 w-full rounded-md border-2 border-input bg-background px-3 py-2 pr-10 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                                style={{ fontFamily: content.theme.headingFont }}
                                                            >
                                                                {fontOptions.map(font => (
                                                                    <option key={font} value={font} style={{ fontFamily: font }}>
                                                                        {font}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label className="text-sm font-medium mb-2 block">Body Font</Label>
                                                        <div className="relative">
                                                            <select
                                                                value={content.theme.bodyFont}
                                                                onChange={(e) => handleEdit('theme.bodyFont', e.target.value)}
                                                                className="flex h-11 w-full rounded-md border-2 border-input bg-background px-3 py-2 pr-10 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                                style={{ fontFamily: content.theme.bodyFont }}
                                                            >
                                                                {fontOptions.map(font => (
                                                                    <option key={font} value={font} style={{ fontFamily: font }}>
                                                                        {font}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom padding for mobile */}
                                            <div className="h-4 lg:hidden" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Full Page Preview for Styling */}
                        {activeSection === "styling" && (
                            <>
                                <HeroSection content={content} isEditable={false} />
                                <FeaturesSection content={content} isEditable={false} />
                                <BookingSection content={content} isEditable={false}>
                                    <div className="space-y-12">
                                        {/* Contact Information */}
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-3xl font-bold tracking-tight mb-2">
                                                    Contact Information
                                                </h3>
                                                <div className="h-1 w-20 bg-primary rounded-full" />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Full Name <span className="text-destructive">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        disabled
                                                        className="flex h-14 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <p className="text-sm text-muted-foreground">Enter your first and last name</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Email Address <span className="text-destructive">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        disabled
                                                        className="flex h-14 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <p className="text-sm text-muted-foreground">We'll send confirmation details to this email</p>
                                                </div>
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
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Date <span className="text-destructive">*</span>
                                                    </label>
                                                    <button
                                                        disabled
                                                        className="flex h-14 w-full items-center justify-start rounded-md border-2 border-input bg-background px-4 py-2 text-base text-muted-foreground hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Pick a date
                                                        <svg className="ml-auto h-5 w-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Time <span className="text-destructive">*</span>
                                                    </label>
                                                    <button
                                                        disabled
                                                        className="flex h-14 w-full items-center justify-between rounded-md border-2 border-input bg-background px-3 py-2 text-base text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Select a date first
                                                        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
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
                                            <div className="space-y-2">
                                                <label className="text-lg font-medium">Message</label>
                                                <textarea
                                                    placeholder="Tell us anything that will help us prepare for your appointment..."
                                                    rows={6}
                                                    disabled
                                                    className="flex w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                                />
                                                <div className="flex justify-between items-center">
                                                    <span></span>
                                                    <span className="text-xs text-muted-foreground">0 / 1000</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-8">
                                            <div className="flex justify-center">
                                                <div className="w-full cursor-not-allowed opacity-50">
                                                    <HoverBorderGradient
                                                        as="div"
                                                        containerClassName="rounded-md w-full"
                                                        className="bg-background text-foreground flex items-center justify-center text-lg font-semibold h-16 w-full"
                                                    >
                                                        Confirm Appointment
                                                    </HoverBorderGradient>
                                                </div>
                                            </div>
                                            <p className="text-center text-sm text-muted-foreground mt-6">
                                                By submitting, you agree to receive appointment confirmations via email
                                            </p>
                                        </div>
                                    </div>
                                </BookingSection>
                                <FooterSection content={content} isEditable={false} />
                            </>
                        )}

                        {/* Section Previews */}
                        {activeSection === "hero" && (
                            <div className="min-h-screen relative">
                                <HeroSection
                                    content={content}
                                    isEditable={true}
                                    onEdit={handleEdit}
                                />
                            </div>
                        )}

                        {activeSection === "features" && (
                            <div className="min-h-screen relative">
                                <FeaturesSection
                                    content={content}
                                    isEditable={true}
                                    onEdit={handleEdit}
                                />
                            </div>
                        )}

                        {activeSection === "booking" && (
                            <div className="min-h-screen relative">
                                <BookingSection
                                    content={content}
                                    isEditable={true}
                                    onEdit={handleEdit}
                                >
                                    {/* Form Preview - matches actual form structure */}
                                    <div className="space-y-12">
                                        {/* Contact Information */}
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-3xl font-bold tracking-tight mb-2">
                                                    Contact Information
                                                </h3>
                                                <div className="h-1 w-20 bg-primary rounded-full" />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Full Name <span className="text-destructive">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        disabled
                                                        className="flex h-14 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <p className="text-sm text-muted-foreground">Enter your first and last name</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Email Address <span className="text-destructive">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        disabled
                                                        className="flex h-14 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                    <p className="text-sm text-muted-foreground">We'll send confirmation details to this email</p>
                                                </div>
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
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Date <span className="text-destructive">*</span>
                                                    </label>
                                                    <button
                                                        disabled
                                                        className="flex h-14 w-full items-center justify-start rounded-md border-2 border-input bg-background px-4 py-2 text-base text-muted-foreground hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Pick a date
                                                        <svg className="ml-auto h-5 w-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-lg font-medium">
                                                        Time <span className="text-destructive">*</span>
                                                    </label>
                                                    <button
                                                        disabled
                                                        className="flex h-14 w-full items-center justify-between rounded-md border-2 border-input bg-background px-3 py-2 text-base text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Select a date first
                                                        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
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
                                            <div className="space-y-2">
                                                <label className="text-lg font-medium">Message</label>
                                                <textarea
                                                    placeholder="Tell us anything that will help us prepare for your appointment..."
                                                    rows={6}
                                                    disabled
                                                    className="flex w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                                />
                                                <div className="flex justify-between items-center">
                                                    <span></span>
                                                    <span className="text-xs text-muted-foreground">0 / 1000</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-8">
                                            <div className="flex justify-center">
                                                <div className="w-full cursor-not-allowed opacity-50">
                                                    <HoverBorderGradient
                                                        as="div"
                                                        containerClassName="rounded-md w-full"
                                                        className="bg-background text-foreground flex items-center justify-center text-lg font-semibold h-16 w-full"
                                                    >
                                                        Confirm Appointment
                                                    </HoverBorderGradient>
                                                </div>
                                            </div>
                                            <p className="text-center text-sm text-muted-foreground mt-6">
                                                By submitting, you agree to receive appointment confirmations via email
                                            </p>
                                        </div>
                                    </div>
                                </BookingSection>
                            </div>
                        )}

                        {activeSection === "footer" && (
                            <div className="min-h-screen flex flex-col relative">
                                <div className="flex-1 bg-background" />
                                <FooterSection
                                    content={content}
                                    isEditable={true}
                                    onEdit={handleEdit}
                                />
                            </div>
                        )}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
