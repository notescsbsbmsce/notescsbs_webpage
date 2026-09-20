# NOTES CSBS - Design System & Custom Error Pages Specification

## 1. Overview & Aesthetics

NOTES CSBS features an **"Editorial Intelligence"** design system tailored for academic excellence at BMS College of Engineering. The system seamlessly adapts across **Light Mode** and **Dark Mode**, utilizing curated HSL color tokens, glassmorphism, subtle micro-animations, crisp typography (Inter & serif titles), and high-contrast accessibility.

---

## 2. Color Palette & Mode Adaptivity

### Dark Mode (Default)
- **Background**: `hsl(224, 71%, 4%)` (`#030712`) / `bg-slate-950`
- **Card Surface**: `hsl(224, 71%, 7%)` / `bg-slate-900/60` with `border-white/10`
- **Primary Accent**: `hsl(217, 91%, 60%)` / Indigo-Blue glow (`#3b82f6`)
- **Secondary Accent**: Emerald Green (`#10b981`) for verification, Crimson Amber for alerts
- **Text Main**: `hsl(210, 40%, 98%)` (`#f8fafc`)
- **Text Muted**: `hsl(215, 20.2%, 65.1%)` (`#94a3b8`)

### Light Mode
- **Background**: `hsl(0, 0%, 100%)` / `bg-slate-50`
- **Card Surface**: `hsl(0, 0%, 100%)` / `bg-white` with `border-slate-200` & `shadow-sm`
- **Primary Accent**: `hsl(221.2, 83.2%, 53.3%)` / Deep Royal Blue (`#2563eb`)
- **Text Main**: `hsl(222.2, 84%, 4.9%)` (`#020817`)
- **Text Muted**: `hsl(215.4, 16.3%, 46.9%)` (`#64748b`)

---

## 3. Custom Error Pages Specification

### 3.1. 404 - Page Lost in Orbit (Not Found)
Triggered when a user navigates to an invalid, non-existent, or removed URL.

#### Light Mode Visuals:
- **Background**: Crisp `#F8FAFC` background with a soft radial indigo tint (`bg-gradient-to-b from-blue-50/50 via-slate-50 to-white`).
- **Typography**: Giant `404` header in bold gradient text (`bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`).
- **Card Surface**: White frosted card (`bg-white/80 border-slate-200/80 shadow-xl shadow-blue-500/5`).
- **Interactive Controls**:
  - Primary button: Royal Blue background with white text and hover scale (`bg-blue-600 hover:bg-blue-700 text-white`).
  - Secondary button: Outline style (`border-slate-300 hover:bg-slate-100 text-slate-700`).
- **Semester Quick Jump Grid**: Light grey pills (`bg-slate-100 border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600`).

#### Dark Mode Visuals:
- **Background**: Deep space obsidian (`bg-slate-950`) with an ambient blue backdrop glow (`bg-blue-500/10 blur-3xl`).
- **Typography**: Giant `404` header in bright electric blue gradient (`bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`).
- **Card Surface**: Translucent dark panel (`bg-slate-900/60 border-white/10 backdrop-blur-xl shadow-2xl`).
- **Interactive Controls**:
  - Primary button: Neon blue accent (`bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25`).
  - Secondary button: Dark outline (`bg-slate-800/60 border-white/10 hover:bg-slate-800 text-slate-300`).
- **Semester Quick Jump Grid**: Translucent dark pills (`bg-white/5 border-white/10 hover:border-blue-500/50 text-slate-300 hover:text-white`).

---

### 3.2. 500 - System Runtime Failure (Error Boundary)
Triggered when an unexpected JavaScript error occurs in component rendering.

#### Light Mode Visuals:
- **Badge**: Crimson alert badge (`bg-red-50 text-red-700 border-red-200`).
- **Icon**: Red warning shield (`text-red-600`).
- **Action Buttons**:
  - "Try Refreshing": Solid primary button (`bg-slate-900 text-white hover:bg-slate-800`).
  - "Clear Cache & Reload": Destructive outline button (`border-red-200 text-red-600 hover:bg-red-50`).
- **Stack Trace Box**: Collapsible light monospace container (`bg-slate-100 border-slate-200 text-slate-800 font-mono text-xs`).

#### Dark Mode Visuals:
- **Badge**: Dark crimson alert badge (`bg-red-500/10 text-red-400 border-red-500/20`).
- **Icon**: Pulsing red warning shield (`text-red-400`).
- **Action Buttons**:
  - "Try Refreshing": Solid white/accent button (`bg-white text-slate-950 hover:bg-slate-200`).
  - "Clear Cache & Reload": Dark red outline (`bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20`).
- **Stack Trace Box**: Collapsible dark monospace box (`bg-slate-900 border-white/10 text-red-300 font-mono text-xs`).

---

### 3.3. 403 - Restricted Access (Security Clearance Barrier)
Triggered when an unauthenticated or non-admin user attempts to access `/admin`.

#### Light Mode Visuals:
- **Badge**: Amber warning tag (`bg-amber-50 text-amber-800 border-amber-200`).
- **Card**: Clean white card with amber left border accent.
- **Button**: Return home or authenticate via Google/Email.

#### Dark Mode Visuals:
- **Badge**: Dark amber glowing tag (`bg-amber-500/10 text-amber-400 border-amber-500/20`).
- **Card**: Dark glassmorphic card with glowing lock indicator.
- **Button**: Glass action buttons with subtle amber hover ring.

---

## 4. Implementation Structure

- **Page Component**: [`src/pages/NotFound.tsx`](file:///d:/notes%20csbs/src/pages/NotFound.tsx) (Handles 404 lost routes with semester navigation and search recovery).
- **Error Boundary Component**: [`src/components/ErrorBoundary.tsx`](file:///d:/notes%20csbs/src/components/ErrorBoundary.tsx) (Catches application runtime crashes and displays the 500 error view).
- **Theme Manager**: [`src/components/ThemeToggle.tsx`](file:///d:/notes%20csbs/src/components/ThemeToggle.tsx) (Controls `.dark` class state on `<html>` root for seamless mode transitions).
