# Quick Start Guide

## Running the Application

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

## Features

### ✅ Completed Features

- **Responsive Landing Page** with modern design
- **Hero Section** with clear call-to-action
- **About Section** showcasing benefits with icons
- **Booking Form** with all required fields:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Date picker (required)
  - Time picker (required)
  - Message/Notes (optional)
- **Success Message** after form submission
- **Footer** with contact info and social media links
- **Smooth Scrolling** to booking form
- **Dark Mode Support** (theme included)
- **API Route** for handling form submissions

### 🔧 To Be Configured

- **Google Calendar API Integration** - See `GOOGLE_CALENDAR_SETUP.md`
- **Email Notifications** - Configure your preferred email service
- **Custom Domain** - Deploy and configure your domain

## Project Structure

```
client/
├── app/
│   ├── api/
│   │   └── book-appointment/
│   │       └── route.ts          # API endpoint for bookings
│   ├── globals.css               # Global styles with theme
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main landing page
├── components/
│   └── ui/                       # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## Customization

### Change Colors

Edit `app/globals.css` to modify the color scheme:
- `--primary`: Main brand color
- `--secondary`: Secondary color
- `--accent`: Accent color

### Update Content

Edit `app/page.tsx` to change:
- Company name (currently "BookEasy")
- Headlines and descriptions
- Contact information
- Social media links

### Modify Form Fields

In `app/page.tsx`, update the `formData` state and form JSX to add/remove fields.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel (recommended for Next.js):

```bash
npm install -g vercel
vercel
```

Or deploy to other platforms:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

## Next Steps

1. Set up Google Calendar API (see `GOOGLE_CALENDAR_SETUP.md`)
2. Configure email notifications
3. Add your branding and content
4. Test the booking flow
5. Deploy to production
6. Set up analytics (Google Analytics, Plausible, etc.)

## Support

For issues or questions:
- Check the documentation
- Review the code comments
- Consult Next.js documentation: https://nextjs.org/docs
- Consult shadcn/ui documentation: https://ui.shadcn.com/
