"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, AlertCircle, ArrowLeft, Save, Eye, Palette, Type, FileText } from "lucide-react";
import Link from "next/link";
import type { CMSContent } from "@/lib/cms-content";

const fontOptions = [
  "Inter",
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Playfair Display"
];

export default function CMSAdmin() {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/cms");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load content" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Content saved successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: "Failed to save content" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save content" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Content Management
                </h1>
                <p className="text-sm text-muted-foreground">Manage your website content and styling</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/editor">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Visual Editor
                </Button>
              </Link>
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={saving} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === "success" 
              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
          }`}>
            {message.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
            )}
            <p className={message.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}>
              {message.text}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="styling" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Styling
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-6 pr-4">
                {/* Hero Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Hero Section</CardTitle>
                        <CardDescription>Main landing section at the top of your page</CardDescription>
                      </div>
                      <Badge variant="secondary">Primary</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hero-headline" className="text-base">Headline</Label>
                      <p className="text-sm text-muted-foreground mb-2">One word per line for best display</p>
                      <Textarea
                        id="hero-headline"
                        value={content.hero.headline.join("\n")}
                        onChange={(e) => setContent({
                          ...content,
                          hero: { ...content.hero, headline: e.target.value.split("\n") }
                        })}
                        rows={4}
                        className="font-mono"
                      />
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hero-title" className="text-base">Title</Label>
                        <Input
                          id="hero-title"
                          value={content.hero.title}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, title: e.target.value }
                          })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="hero-cta" className="text-base">CTA Button Text</Label>
                        <Input
                          id="hero-cta"
                          value={content.hero.ctaText}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, ctaText: e.target.value }
                          })}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="hero-description" className="text-base">Description</Label>
                      <Textarea
                        id="hero-description"
                        value={content.hero.description}
                        onChange={(e) => setContent({
                          ...content,
                          hero: { ...content.hero, description: e.target.value }
                        })}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Features Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Features Section</CardTitle>
                        <CardDescription>Highlight your key features and benefits</CardDescription>
                      </div>
                      <Badge variant="secondary">Secondary</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="features-title" className="text-base">Title</Label>
                      <Input
                        id="features-title"
                        value={content.features.title}
                        onChange={(e) => setContent({
                          ...content,
                          features: { ...content.features, title: e.target.value }
                        })}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="features-description" className="text-base">Description</Label>
                      <Textarea
                        id="features-description"
                        value={content.features.description}
                        onChange={(e) => setContent({
                          ...content,
                          features: { ...content.features, description: e.target.value }
                        })}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Form Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Booking Form Section</CardTitle>
                        <CardDescription>Text above your appointment booking form</CardDescription>
                      </div>
                      <Badge variant="secondary">Form</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="booking-title" className="text-base">Title</Label>
                      <Input
                        id="booking-title"
                        value={content.bookingForm.title}
                        onChange={(e) => setContent({
                          ...content,
                          bookingForm: { ...content.bookingForm, title: e.target.value }
                        })}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="booking-description" className="text-base">Description</Label>
                      <Textarea
                        id="booking-description"
                        value={content.bookingForm.description}
                        onChange={(e) => setContent({
                          ...content,
                          bookingForm: { ...content.bookingForm, description: e.target.value }
                        })}
                        rows={2}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Footer Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Footer Section</CardTitle>
                        <CardDescription>Bottom of page branding</CardDescription>
                      </div>
                      <Badge variant="secondary">Footer</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="footer-company" className="text-base">Company Name</Label>
                        <Input
                          id="footer-company"
                          value={content.footer.companyName}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, companyName: e.target.value }
                          })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="footer-tagline" className="text-base">Tagline</Label>
                        <Input
                          id="footer-tagline"
                          value={content.footer.tagline}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, tagline: e.target.value }
                          })}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Styling Tab */}
          <TabsContent value="styling" className="space-y-6">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-6 pr-4">
                {/* Colors */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>Color Scheme</CardTitle>
                        <CardDescription>Customize your brand colors</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="primary-color" className="text-base">Primary Color</Label>
                        <p className="text-sm text-muted-foreground mb-3">Main brand color for buttons and accents</p>
                        <div className="flex gap-3 items-center">
                          <Input
                            id="primary-color"
                            type="color"
                            value={content.theme.primaryColor}
                            onChange={(e) => setContent({
                              ...content,
                              theme: { ...content.theme, primaryColor: e.target.value }
                            })}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={content.theme.primaryColor}
                            onChange={(e) => setContent({
                              ...content,
                              theme: { ...content.theme, primaryColor: e.target.value }
                            })}
                            className="flex-1 font-mono"
                            placeholder="#8b5cf6"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="accent-color" className="text-base">Accent Color</Label>
                        <p className="text-sm text-muted-foreground mb-3">Secondary color for highlights</p>
                        <div className="flex gap-3 items-center">
                          <Input
                            id="accent-color"
                            type="color"
                            value={content.theme.accentColor}
                            onChange={(e) => setContent({
                              ...content,
                              theme: { ...content.theme, accentColor: e.target.value }
                            })}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={content.theme.accentColor}
                            onChange={(e) => setContent({
                              ...content,
                              theme: { ...content.theme, accentColor: e.target.value }
                            })}
                            className="flex-1 font-mono"
                            placeholder="#7c3aed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-3">Color Preview</p>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div 
                            className="h-20 rounded-md border-2 border-border"
                            style={{ backgroundColor: content.theme.primaryColor }}
                          />
                          <p className="text-xs text-center mt-2 text-muted-foreground">Primary</p>
                        </div>
                        <div className="flex-1">
                          <div 
                            className="h-20 rounded-md border-2 border-border"
                            style={{ backgroundColor: content.theme.accentColor }}
                          />
                          <p className="text-xs text-center mt-2 text-muted-foreground">Accent</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Typography */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>Typography</CardTitle>
                        <CardDescription>Choose fonts for your website</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="heading-font" className="text-base">Heading Font</Label>
                        <p className="text-sm text-muted-foreground mb-3">Used for titles and headings</p>
                        <select
                          id="heading-font"
                          value={content.theme.headingFont}
                          onChange={(e) => setContent({
                            ...content,
                            theme: { ...content.theme, headingFont: e.target.value }
                          })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {fontOptions.map(font => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="body-font" className="text-base">Body Font</Label>
                        <p className="text-sm text-muted-foreground mb-3">Used for paragraphs and text</p>
                        <select
                          id="body-font"
                          value={content.theme.bodyFont}
                          onChange={(e) => setContent({
                            ...content,
                            theme: { ...content.theme, bodyFont: e.target.value }
                          })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {fontOptions.map(font => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-3">
                      <p className="text-sm font-medium">Font Preview</p>
                      <div 
                        className="text-2xl font-bold"
                        style={{ fontFamily: content.theme.headingFont }}
                      >
                        This is a heading
                      </div>
                      <div 
                        className="text-base"
                        style={{ fontFamily: content.theme.bodyFont }}
                      >
                        This is body text. The quick brown fox jumps over the lazy dog.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Bottom Save Button */}
        <div className="flex justify-end pt-6 border-t mt-6">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
