# 🚀 Getting Started

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Your appointment booking landing page is now running.

## What You'll See

- A beautiful, modern landing page with:
  - Fixed header with "Book an Appointment" button
  - Hero section with compelling headline
  - About section with 4 benefit cards (with icons)
  - Fully functional booking form
  - Professional footer with contact info and social links
  - Dark mode support

## Next Steps

### 1. Customize Your Content
Edit `app/page.tsx` to update:
- Company name (currently "BookEasy")
- Contact information
- Social media links
- Any text content

### 2. Set Up Google Calendar Integration
Follow the guide in `GOOGLE_CALENDAR_SETUP.md` to:
- Create Google Cloud project
- Enable Calendar API
- Get OAuth credentials
- Configure environment variables

### 3. Deploy Your Site
See `QUICKSTART.md` for deployment instructions to:
- Vercel (recommended)
- Netlify
- Other platforms

## Project Structure

```
client/
├── app/
│   ├── api/book-appointment/    # API endpoint
│   ├── page.tsx                 # Main landing page
│   └── globals.css              # Styles with theme
├── components/ui/               # Reusable components
└── lib/utils.ts                 # Utilities
```

## Need Help?

- Check `README.md` for full documentation
- See `QUICKSTART.md` for detailed setup
- Review `GOOGLE_CALENDAR_SETUP.md` for API integration

## Features Included

✅ Responsive design
✅ Dark mode support
✅ Modern UI with shadcn/ui
✅ Lucide React icons
✅ Form validation
✅ API endpoint ready
✅ Success feedback
✅ Smooth scrolling
✅ Professional styling

Enjoy building your appointment booking system! 🎉
