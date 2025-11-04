# Visual Editor Guide

## 🎨 Real-Time Visual Editing

Your app now has a **Canva-style visual editor** with **1:1 live preview**! Edit content and see changes instantly on the actual website.

## Features

### ✨ Real-Time Preview
- **Split-screen interface**: Editor on left, **actual website** on right
- **1:1 accurate preview**: Shows your real homepage, not a mock
- **Instant updates**: See changes as you type (300ms debounce)
- **No refresh needed**: Preview updates automatically via iframe messaging
- **Toggle preview**: Hide/show preview with one click
- **Responsive preview**: Test desktop, tablet, and mobile views

### 🎯 Section-Based Editing
- **Hero Section**: Headline, title, description, CTA button
- **Features Section**: Title and description
- **Booking Section**: Form title, description, company name
- **Styling**: Colors and typography

### 🚀 Quick Actions
- **Save**: Persist changes to database and refresh preview
- **Home**: Return to homepage
- **Toggle Preview**: Show/hide live preview
- **Refresh**: Manually reload the preview iframe
- **Viewport Switcher**: Toggle between desktop, tablet, and mobile views
- **Section Switcher**: Jump between sections instantly

## How to Use

### Accessing the Visual Editor
1. Go to `/admin/editor` in your browser
2. Or click "Visual Editor" link in the footer
3. Or click "Visual Editor" button in the admin panel

### Editing Content

#### Step 1: Select a Section
Click one of the section buttons at the top:
- **Hero** - Main landing section
- **Features** - Features showcase
- **Booking** - Booking form section
- **Styling** - Colors and fonts

#### Step 2: Edit Fields
- Type in any field
- Changes appear instantly in the preview
- No need to click save to see preview

#### Step 3: Save Changes
- Click "Save" button in the top toolbar
- Changes are persisted to `cms-data.json`
- Continue editing or return home

### Preview Controls

#### Show/Hide Preview
- Click the eye icon in the toolbar
- Hides preview for more editing space
- Click again to show preview

#### Live Preview Features
- **Actual Website**: Shows your real homepage in an iframe
- **Real Components**: All animations, effects, and interactions work
- **Real-time Updates**: Content changes appear instantly (300ms debounce)
- **Real-time Colors**: Colors update as you change them
- **Real-time Fonts**: Typography changes instantly
- **Responsive Testing**: Switch between desktop (100%), tablet (768px), mobile (375px)
- **Full Functionality**: Booking form, buttons, and all features work in preview

## Interface Layout

```
┌─────────────────────────────────────────────────────┐
│  Home  |  Visual Editor          [👁] [Save]       │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│  [Hero]      │                                       │
│  [Features]  │                                       │
│  [Booking]   │         LIVE PREVIEW                  │
│  [Styling]   │                                       │
│              │                                       │
│  ┌────────┐  │                                       │
│  │ Fields │  │                                       │
│  │        │  │                                       │
│  │        │  │                                       │
│  └────────┘  │                                       │
│              │                                       │
└──────────────┴──────────────────────────────────────┘
```

## Sections Explained

### Hero Section
Edit the main landing area:
- **Headline**: Large text (one word per line)
- **Title**: Smaller heading on the right
- **Description**: Paragraph text
- **Button Text**: CTA button label

### Features Section
Edit the features showcase:
- **Title**: Main heading
- **Description**: Supporting text

### Booking Section
Edit the booking form area:
- **Title**: Form heading
- **Description**: Form subheading
- **Company Name**: Your brand name

### Styling Section
Customize appearance:
- **Primary Color**: Main brand color (with color picker)
- **Accent Color**: Secondary color (with color picker)
- **Heading Font**: Typography for titles
- **Body Font**: Typography for text

## Tips for Best Results

### Content Tips
- Keep headlines short and punchy
- Use clear, action-oriented CTA text
- Write concise descriptions
- Test different wording in real-time

### Styling Tips
- Choose high-contrast colors for readability
- Test color combinations in the preview
- Select readable fonts for body text
- Use display fonts for headings only
- Preview on different screen sizes

### Workflow Tips
1. Start with content first
2. Then adjust styling
3. Use preview to validate changes
4. Save frequently
5. Test on actual homepage

## Keyboard Shortcuts

Currently available:
- **Tab**: Move between fields
- **Enter**: New line in text areas
- **Ctrl/Cmd + S**: Save (coming soon)

## Comparison: Visual Editor vs Admin Panel

### Visual Editor (`/admin/editor`)
- ✅ Real-time preview
- ✅ Instant feedback
- ✅ Compact interface
- ✅ Section-focused editing
- ✅ Quick switching
- ⚠️ Simplified fields

### Admin Panel (`/admin/cms`)
- ✅ Detailed organization
- ✅ All fields visible
- ✅ Card-based layout
- ✅ More context
- ✅ Better for bulk editing
- ⚠️ No live preview

**Recommendation**: Use Visual Editor for quick edits and styling. Use Admin Panel for comprehensive content updates.

## Technical Details

### How It Works
1. Content loaded from `/api/cms` on editor mount
2. Homepage loaded in iframe with `?preview=true` parameter
3. Editor state managed with React hooks
4. Changes trigger debounced updates (300ms)
5. Updates sent to iframe via `postMessage` API
6. Homepage listens for messages and updates content state
7. React re-renders with new content instantly
8. Save button persists to database and refreshes iframe

### Performance
- **Debounced updates**: 300ms delay prevents excessive re-renders
- **Iframe isolation**: Preview runs independently
- **Message-based communication**: Efficient cross-frame updates
- **Lightweight**: Only changed content is updated
- **Responsive**: Works on all screen sizes
- **Fast saves**: Persists to database and refreshes iframe

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive layout

## Troubleshooting

### Preview not updating?
- Check browser console for errors
- Refresh the page
- Clear browser cache

### Changes not saving?
- Check network tab for API errors
- Verify `cms-data.json` permissions
- Check server logs

### Colors not applying?
- Ensure valid hex codes (#RRGGBB)
- Use color picker for accuracy
- Check preview after changing

## Future Enhancements

Planned features:
- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts
- [ ] Drag-and-drop reordering
- [ ] Image upload
- [ ] Mobile preview mode
- [ ] Dark/light mode toggle
- [ ] Export/import settings
- [ ] Version history
- [ ] Collaborative editing
- [ ] Auto-save

## Need More Control?

For advanced editing:
- Use the **Admin Panel** (`/admin/cms`) for detailed control
- Edit `cms-data.json` directly for bulk changes
- Modify component code for custom features

---

**Quick Access Links:**
- Visual Editor: `/admin/editor`
- Admin Panel: `/admin/cms`
- Homepage: `/`
