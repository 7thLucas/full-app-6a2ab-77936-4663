# NovaStack Command Center — Design System

## Visual Identity
- **Aesthetic**: Dark tech — command-center precision, authoritative, minimal, powerful
- **Primary Audience**: Single founder-operator; professional, operational, high-density information display
- **Tone**: No decorative elements. Every component serves control and clarity.

## Color Palette

### Dark Mode (Primary)
- **Background Base**: `#0A0A0F` — near-black with a slight blue tint
- **Surface / Card**: `#111118` — elevated surface
- **Surface Raised**: `#16161F` — modals, dropdowns
- **Border**: `#1E1E2E` — subtle dividers
- **Border Strong**: `#2A2A3E` — active borders
- **Primary Accent**: `#6C63FF` — electric indigo (primary brand color)
- **Primary Hover**: `#8B85FF` — lighter indigo on hover
- **Secondary Accent**: `#00D4FF` — cyan for data highlights and live metrics
- **Success**: `#10B981` — emerald green
- **Warning**: `#F59E0B` — amber
- **Error / Danger**: `#EF4444` — red
- **Text Primary**: `#F0F0FF` — near-white with slight blue cast
- **Text Secondary**: `#8B8BA8` — muted blue-gray
- **Text Tertiary**: `#4A4A6A` — low-contrast labels

### Light Mode (Secondary)
- **Background Base**: `#F4F4F8`
- **Surface / Card**: `#FFFFFF`
- **Border**: `#E0E0EC`
- **Primary Accent**: `#5B54E8`
- **Text Primary**: `#0D0D1A`
- **Text Secondary**: `#5A5A78`

## Typography
- **Font Family**: `Inter` (primary), `JetBrains Mono` (code, addresses, hashes)
- **Scale**:
  - Page Title: 24px / 700
  - Section Header: 18px / 600
  - Card Title: 14px / 600
  - Body: 14px / 400
  - Caption / Meta: 12px / 400
  - Code / Address: 12px mono / 400

## Spacing & Layout
- **Sidebar Width**: 240px (collapsed: 64px)
- **Top Bar Height**: 56px
- **Card Padding**: 20px
- **Grid Gutter**: 16px
- **Border Radius**: 10px (cards), 6px (buttons/inputs), 4px (badges)

## Elevation / Shadow (Dark Mode)
- **Card**: `0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)`
- **Modal**: `0 20px 60px rgba(0,0,0,0.7)`
- **Dropdown**: `0 8px 24px rgba(0,0,0,0.5)`

## Component Patterns

### Navigation Sidebar
- Dark background `#0D0D14`
- Active item: left border `#6C63FF`, background `rgba(108,99,255,0.12)`, text `#F0F0FF`
- Inactive item: text `#8B8BA8`, hover background `rgba(255,255,255,0.04)`
- Module icons: 18px, left-aligned with labels
- Collapsible on mobile with hamburger toggle

### Top Bar
- Background: `#0D0D14` with bottom border `#1E1E2E`
- Global search bar centered, width 480px max, placeholder "Search everything..."
- Right side: AI assistant button, notifications, dark/light toggle, user avatar

### Dashboard Cards (Stat Counters)
- Background: `#111118`
- Accent number: 28px / 700, color `#6C63FF` or `#00D4FF`
- Label: 12px / 400, `#8B8BA8`
- Hover: border `#2A2A3E`, slight elevation increase

### Data Tables
- Row height: 48px
- Header: `#16161F`, text `#8B8BA8`, 12px uppercase
- Row separator: `#1E1E2E`
- Row hover: `rgba(108,99,255,0.06)`
- Status badges: pill shape, 10px radius, color-coded per status

### Status Badges
- **Active / Live**: green `#10B981` bg `rgba(16,185,129,0.12)`
- **In Progress**: cyan `#00D4FF` bg `rgba(0,212,255,0.10)`
- **Pending**: amber `#F59E0B` bg `rgba(245,158,11,0.10)`
- **Blocked**: red `#EF4444` bg `rgba(239,68,68,0.10)`
- **Completed**: gray `#6B7280` bg `rgba(107,114,128,0.10)`
- **Draft**: purple `#A855F7` bg `rgba(168,85,247,0.10)`

### Buttons
- **Primary**: bg `#6C63FF`, text white, hover `#8B85FF`, radius 6px, padding 10px 20px
- **Secondary**: bg transparent, border `#2A2A3E`, text `#F0F0FF`, hover bg `rgba(255,255,255,0.06)`
- **Destructive**: bg `#EF4444`, text white
- **Ghost**: transparent, text `#8B8BA8`, hover text `#F0F0FF`

### Forms & Inputs
- Border: `#2A2A3E`, background `#0A0A0F`
- Focus ring: `#6C63FF` 2px
- Label: 12px / 500, `#8B8BA8` uppercase spaced
- Placeholder: `#4A4A6A`

### Charts & Data Visualization
- Line color: `#6C63FF` (primary), `#00D4FF` (secondary)
- Area fill: `rgba(108,99,255,0.15)`
- Grid lines: `#1E1E2E`
- Axis labels: `#4A4A6A`, 11px

## Module-Specific Accents
- **Dashboard**: Indigo `#6C63FF` primary
- **Blockchains**: Cyan `#00D4FF`
- **Tokens**: Gold `#F59E0B`
- **Treasury**: Emerald `#10B981`
- **AI Agents**: Purple `#A855F7`
- **Wallets**: Blue `#3B82F6`
- **White Papers**: Slate `#64748B`
- **Tasks**: Amber `#F59E0B`
- **Documents**: Gray-blue `#6B7280`

## Responsive Breakpoints
- **Mobile**: < 768px — sidebar hidden (slide-in drawer), single column
- **Tablet**: 768px–1279px — sidebar collapsed (64px), 2-column grids
- **Desktop**: ≥ 1280px — full sidebar (240px), 3–4 column grids

## Animation & Transitions
- Page transitions: 150ms ease-out
- Hover states: 100ms ease
- Modal open: 200ms scale + fade
- Sidebar collapse: 200ms ease-in-out
- No gratuitous animations — every motion is functional

## Iconography
- **Library**: Lucide React (consistent, clean line icons)
- **Size**: 18px nav, 16px inline, 20px standalone actions
- **Color**: Inherits text color; accented only for status indicators