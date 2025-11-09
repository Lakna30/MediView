# MediView Hospital Management System - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design + Healthcare SaaS References)

**Justification:** MediView is a utility-focused, information-dense application requiring stability, accessibility, and efficient data management. Drawing inspiration from Material Design's structure combined with modern healthcare dashboards (Epic MyChart, Zocdoc, Athenahealth).

**Core Principles:**
- Clarity and Trust: Clean, professional interface that inspires confidence
- Efficiency: Minimal clicks to complete critical tasks
- Information Hierarchy: Clear visual distinction between primary and secondary data
- Role-Appropriate Interfaces: Each user role sees only relevant information

## Typography

**Font Families:**
- Primary: Inter (headings, UI elements, data labels)
- Secondary: System UI (body text, form inputs for performance)

**Type Scale:**
- Page Titles: text-3xl font-semibold
- Section Headers: text-xl font-semibold
- Card Titles: text-lg font-medium
- Body/Labels: text-base font-normal
- Supporting Text: text-sm text-gray-600
- Data Values: text-base font-medium (for emphasis on important medical data)

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-6
- Section spacing: mb-8, gap-6
- Card spacing: p-6, gap-4
- Form field gaps: space-y-4
- Dashboard grid gaps: gap-6

**Grid Structure:**
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Data tables: Full-width with horizontal scroll on mobile
- Forms: Single column max-w-2xl centered
- Side navigation: Fixed 240px width on desktop, collapsible on mobile

## Component Library

### Navigation
**Admin/Doctor/Staff Dashboard:**
- Fixed left sidebar with icon + text navigation
- Top header with search bar, notifications bell, user profile dropdown
- Breadcrumb navigation for nested pages

**Patient Portal:**
- Top horizontal navigation bar
- Mobile: Hamburger menu

### Core UI Elements

**Cards:**
- White background, subtle border (border-gray-200)
- Rounded corners: rounded-lg
- Shadow: shadow-sm hover:shadow-md transition
- Used for: appointment cards, patient profiles, stat displays

**Buttons:**
- Primary: Solid fill for main actions (book appointment, save record)
- Secondary: Outlined for alternative actions
- Sizes: px-4 py-2 (default), px-6 py-3 (large CTA)
- Text: font-medium

**Badges/Status Indicators:**
- Appointment status: Confirmed (green), Pending (yellow), Cancelled (red)
- User roles: Small pills with role-specific colors
- Pill style: px-3 py-1 rounded-full text-sm

### Forms & Inputs

**Form Layout:**
- Left-aligned labels above inputs
- Input fields: Full-width with border, rounded-md, p-3
- Required field indicator: Red asterisk
- Error states: Red border + error message below
- Helper text: text-sm text-gray-500

**Specialized Inputs:**
- Date/Time pickers for appointments
- Search with autocomplete for patient lookup
- File upload for medical documents
- QR code scanner interface for health card verification

### Data Display

**Tables:**
- Striped rows for readability (alternate gray background)
- Sticky header on scroll
- Action column on right (edit, view, delete icons)
- Responsive: Stack on mobile or horizontal scroll

**Patient Information Cards:**
- Profile photo + name + ID at top
- Key vitals/info in grid layout (2 columns)
- Medical history in expandable sections
- Action buttons at bottom

**Appointment Calendar:**
- Week/month view toggle
- Time slots in grid format
- Color-coded by appointment type
- Click to view/edit appointment details

### Digital Health Card

**Design:**
- Card-like container with subtle shadow and border
- Patient photo, name, ID number prominently displayed
- QR code centered and large (200x200px minimum)
- Valid until date
- Hospital logo/branding at top
- Download/Print buttons

### Dashboard Widgets

**Stat Cards (Admin/Doctor):**
- Large number display (text-4xl font-bold)
- Label below (text-sm)
- Icon on left side
- Percentage change indicator with up/down arrow

**Upcoming Appointments List:**
- Chronological list with time, patient name, purpose
- Avatar/photo on left
- Status badge on right

**Recent Activity Feed:**
- Timeline-style layout
- Icons for different activity types
- Timestamp for each entry

### Notification System

**In-App Notifications:**
- Dropdown from bell icon in header
- List of notifications with unread indicator
- Click to mark as read or view details

**Notification Toast:**
- Top-right position
- Auto-dismiss after 5 seconds
- Success (green), warning (yellow), error (red), info (blue)

## Images

**Minimal Image Usage:**
- Profile photos: Circular avatars (40x40px small, 80x80px large)
- Medical document thumbnails in record viewer
- Hospital logo in header (120x40px)
- Health card: Patient photo (120x120px)
- Empty states: Small illustrations for "no appointments," "no records" (240x180px)

**No Hero Images:** This is a functional dashboard application; focus on data presentation rather than marketing imagery.

## Accessibility & Quality Standards

- Minimum contrast ratio 4.5:1 for all text
- Focus states visible on all interactive elements (ring-2 ring-blue-500)
- ARIA labels on icon-only buttons
- Keyboard navigation support throughout
- Screen reader friendly table headers and form labels
- Loading states for all async operations (skeleton screens preferred)