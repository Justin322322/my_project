# Appointment Booking Landing Page

A modern, responsive appointment booking landing page built with Next.js 16, React 19, TypeScript, and Tailwind CSS with shadcn/ui components.

## 🚀 Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Your appointment booking landing page is now running.

## 🚀 Features

- **Modern Design**: Clean, professional landing page with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode**: Full dark mode support with custom theme
- **Icon Library**: Uses Lucide React icons (most popular icon library)
- **Form Validation**: Client-side validation for all form fields
- **API Integration**: Ready-to-use API endpoint for form submissions
- **Google Calendar Ready**: Prepared for Google Calendar API integration
- **Smooth Scrolling**: Seamless navigation to booking form
- **Success Feedback**: Clear confirmation message after booking

## 📋 Page Sections

### Header
- Logo (top left)
- "Book an Appointment" CTA button (scrolls to form)

### Hero Section
- Headline: "Schedule Your Appointment in Seconds"
- Subheadline with value proposition
- "Book Now" CTA button

### About Section
- Title: "Fast, Easy, and Hassle-Free Scheduling"
- Description of the service
- 4 benefit cards with icons:
  - ✅ Instant confirmation
  - 🗓️ Google Calendar sync
  - 🔔 Automatic reminders
  - 📞 Flexible time slots

### Booking Form Section
- Name (required)
- Email (required)
- Phone (optional)
- Appointment Date (date picker, required)
- Appointment Time (time picker, required)
- Message/Notes (textarea, optional)
- Submit button with loading state
- Success message with celebration emoji

### Footer
- Company branding
- Contact information (phone, email, address)
- Social media links (Facebook, Twitter, Instagram, LinkedIn)
- Privacy Policy & Terms of Service links
- Copyright notice

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: Custom theme from tweakcn.com

## 📦 Project Structure

```
client/
├── app/
│   ├── api/book-appointment/    # API endpoint
│   ├── page.tsx                 # Main landing page
│   └── globals.css              # Styles with theme
├── components/ui/               # Reusable components
└── lib/utils.ts                 # Utilities
```

## 🔧 Configuration

All setup and configuration instructions are in [SETUP.md](./SETUP.md), including:
- Google Cloud Console setup
- OAuth 2.0 credentials
- Environment variables configuration
- Vercel deployment
- Troubleshooting

## 📝 Customization

### Update Branding

Edit `app/page.tsx`:
- Change "BookEasy" to your company name
- Update contact information in the footer
- Modify social media links

### Modify Colors

Edit `app/globals.css`:
- Adjust CSS variables for light/dark themes
- Change primary, secondary, and accent colors

### Add/Remove Form Fields

Edit `app/page.tsx`:
- Update the `formData` state
- Add/remove input fields in the form JSX
- Update the API route to handle new fields

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Complete setup and configuration guide
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🔐 Security

- All sensitive data should be stored in environment variables
- Never commit `.env.local` to version control
- Implement rate limiting on API routes
- Validate and sanitize all user inputs
- Use HTTPS in production

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email info@bookeasy.com or open an issue in the repository.

---

Built with ❤️ using Next.js and shadcn/ui
