# AI PROMPTS FOR ADMIN PANEL UI

## 🎯 PROMPT 1: ADMIN LOGIN PAGE

```
Create an admin login page for a Next.js app using App Router.

Requirements:
- Route: /app/admin/page.tsx
- Use React Server Components and Client Components appropriately
- Use Tailwind CSS for styling
- Use shadcn/ui components if possible

Features:
1. Simple password input form
2. Submit button
3. Client-side form handling
4. Call POST /api/admin/auth with password
5. On success: Set session and redirect to /admin/dashboard
6. On error: Show error message
7. Responsive design

UI Design:
- Centered card layout
- College branding (BMSCE CSBS)
- Clean, professional look
- Loading state during submission
- Error state for wrong password

Use TypeScript.
Use 'use client' directive where needed.
Add proper form validation.
```

---

## 🎯 PROMPT 2: ADMIN DASHBOARD LAYOUT

```
Create an admin dashboard layout component for a Next.js app.

Requirements:
- File: /app/admin/layout.tsx
- Wrap all admin pages
- Include navigation sidebar
- Include header with logout button

Layout structure:
┌─────────────────────────────────────┐
│ Header (Logo, Admin Panel, Logout) │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │   Main Content Area      │
│          │   (children)             │
│          │                          │
└──────────┴──────────────────────────┘

Sidebar navigation items:
- 📊 Dashboard (overview)
- ➕ Add Resource
- 📚 Manage Resources
- 📈 Analytics (optional)

Features:
1. Check authentication on mount (redirect if not logged in)
2. Mobile responsive (collapsible sidebar)
3. Active route highlighting
4. Logout functionality (clear cookie, redirect to /admin)

Use Tailwind CSS.
Use TypeScript.
Use Next.js Link for navigation.
```

---

## 🎯 PROMPT 3: ADD RESOURCE FORM

```
Create a comprehensive form for adding resources to the database.

Requirements:
- Route: /app/admin/add/page.tsx
- Use client component ('use client')
- Use Tailwind CSS and shadcn/ui form components

Form fields:
1. Semester (Dropdown: 3, 4, 5, 6, 7, 8)
2. Subject (Dropdown - dynamic based on semester)
3. Resource Type (Radio buttons or tabs):
   - Notes
   - CIE1
   - CIE2
   - CIE3
   - SEE
   - Book
4. Unit (Dropdown: 1, 2, 3, 4, 5) - Show only if type is Notes or Book
5. Title (Text input)
6. File/Link Section:
   - If Semester 3: Show file upload input (PDF only)
   - If Semester 4-8: Show Drive link input
7. Year (Optional number input)
8. Submit button

Logic:
1. When semester changes: Update subject dropdown options
2. When semester === 3: Show file upload, hide link input
3. When semester > 3: Show link input, hide file upload
4. On submit:
   - If Sem 3: Upload file first (POST /api/admin/upload-file), then add resource
   - If Sem 4-8: Directly add resource with Drive link
5. Show success message and reset form
6. Show loading state during submission

Subject data by semester (example):
const SUBJECTS = {
  3: ['OOPS', 'DSA', 'MATHS-3', 'DE', 'UNIX'],
  4: ['FABS', 'DBMS', 'COA', 'OS', 'MATHS-4'],
  5: ['AI', 'ML', 'CN', 'SE', 'CD'],
  // Add more...
};

Validation:
- All required fields must be filled
- Drive link must be valid URL (regex check)
- File must be PDF and < 10MB

Use react-hook-form or similar for form management.
Add proper TypeScript types.
Include error handling and user feedback.
```

---

## 🎯 PROMPT 4: MANAGE RESOURCES PAGE

```
Create a page to view, edit, and delete existing resources.

Requirements:
- Route: /app/admin/manage/page.tsx
- Fetch all resources from GET /api/resources
- Display in a data table
- Include filters, search, and actions

Features:
1. Filter controls:
   - Semester dropdown
   - Subject dropdown
   - Resource type dropdown
   - Search box (search by title)

2. Data table columns:
   - Semester
   - Subject
   - Type
   - Unit
   - Title
   - Link (truncated, with copy button)
   - Storage (drive/supabase icon)
   - Created Date
   - Actions (Edit, Delete)

3. Table functionality:
   - Sorting by columns
   - Pagination (20 items per page)
   - Row selection (optional)

4. Actions:
   - Edit: Open inline edit mode or modal
   - Delete: Confirm dialog, then DELETE /api/admin/delete-resource
   - View: Open link in new tab

5. Bulk actions (optional):
   - Delete selected
   - Export to CSV

UI Components:
- Use shadcn/ui Table component
- Use shadcn/ui Dialog for confirmations
- Use shadcn/ui Select for dropdowns
- Responsive design

State management:
- Use React useState for filters
- Use useEffect to fetch filtered data
- Debounce search input

Use TypeScript.
Add loading states and error handling.
```

---

## 🎯 PROMPT 5: EDIT RESOURCE MODAL

```
Create a modal component for editing existing resources.

Requirements:
- Component: /components/admin/EditResourceModal.tsx
- Reusable component
- Pre-fill form with existing data

Props:
{
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

Form fields (editable):
- Title
- File URL / Drive Link
- Unit
- Subject
- Resource Type

Form fields (read-only):
- Semester
- Storage Type

Features:
1. Pre-populate form with resource data
2. Validate changes
3. Call PUT /api/admin/update-resource
4. Show success/error messages
5. Close modal on success
6. Call onSuccess callback to refresh parent table

Use shadcn/ui Dialog component.
Use react-hook-form for form management.
Add proper TypeScript types.
```

---

## 🎯 PROMPT 6: DELETE CONFIRMATION DIALOG

```
Create a reusable delete confirmation dialog component.

Requirements:
- Component: /components/admin/DeleteConfirmDialog.tsx

Props:
{
  resourceTitle: string;
  resourceId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

Features:
1. Show resource title in warning message
2. "Cancel" and "Delete" buttons
3. Destructive styling for delete button
4. Loading state during deletion
5. Call onConfirm callback
6. Show success/error toast

Dialog content:
"Are you sure you want to delete '{resourceTitle}'? This action cannot be undone."

Use shadcn/ui AlertDialog component.
Use TypeScript.
Add accessibility attributes.
```

---

## 🎯 PROMPT 7: ANALYTICS DASHBOARD (OPTIONAL)

```
Create an analytics dashboard showing resource statistics.

Requirements:
- Route: /app/admin/analytics/page.tsx
- Fetch all resources and compute statistics
- Display charts and metrics

Metrics to show:
1. Total resources count
2. Resources per semester (bar chart)
3. Resources per subject (pie chart)
4. Resources per type (horizontal bar)
5. Recent additions (list of last 10)
6. Most popular subjects
7. Storage breakdown (Supabase vs Drive)

Use chart library: recharts or chart.js

Dashboard layout:
┌────────┬────────┬────────┐
│ Total  │ Sem 3  │ Sem 4  │
├────────┴────────┴────────┤
│  Bar Chart: Per Semester │
├──────────────┬───────────┤
│ Pie: Types   │  Recent   │
│              │  List     │
└──────────────┴───────────┘

Data fetching:
- Fetch all resources: GET /api/resources
- Compute statistics client-side
- Use useMemo for expensive calculations

Use Tailwind CSS for layout.
Use TypeScript.
Add responsive design.
```

---

## 🎯 PROMPT 8: RESOURCE CARD COMPONENT (REUSABLE)

```
Create a reusable resource card component for displaying in admin panel.

Requirements:
- Component: /components/admin/ResourceCard.tsx

Props:
{
  id: string;
  semester: number;
  subject: string;
  resource_type: string;
  unit?: number;
  title: string;
  file_url: string;
  storage_type: 'drive' | 'supabase';
  created_at: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

Card design:
┌─────────────────────────────┐
│ [Icon] FABS - Notes - Unit 1│
│ Title goes here              │
│ ───────────────────────────  │
│ 📅 Feb 13, 2024  💾 Drive   │
│ [View] [Edit] [Delete]       │
└─────────────────────────────┘

Features:
1. Color-coded by resource type
2. Storage type badge (Drive/Supabase icon)
3. Semester badge
4. Action buttons (if showActions=true)
5. Click to view file
6. Hover effects

Icons for resource types:
- Notes: 📝
- CIE1/2/3: 📋
- SEE: 📊
- Book: 📚

Use Tailwind CSS for styling.
Use TypeScript.
Add hover and active states.
```

---

## 🎯 PROMPT 9: FILE UPLOAD COMPONENT (SEM 3)

```
Create a drag-and-drop file upload component for PDF files.

Requirements:
- Component: /components/admin/FileUpload.tsx

Props:
{
  onFileSelect: (file: File) => void;
  onUploadComplete?: (url: string) => void;
  maxSize?: number; // in MB, default 10
}

Features:
1. Drag and drop area
2. Click to browse
3. File type validation (PDF only)
4. File size validation
5. Preview selected file name and size
6. Upload progress bar
7. Remove selected file button
8. Error messages

Upload flow:
1. User selects/drops file
2. Validate file type and size
3. Call onFileSelect callback
4. Show file preview
5. When parent triggers upload:
   - Show progress bar
   - Upload to /api/admin/upload-file
   - On complete: call onUploadComplete with URL

Use Tailwind CSS for styling.
Use TypeScript.
Add accessibility attributes.
Show visual feedback (green border on success, red on error).
```

---

## 🎯 PROMPT 10: ADMIN PANEL UTILITIES

```
Create utility functions and hooks for the admin panel.

Requirements:
Create /lib/admin-utils.ts with:

1. API helper functions:
   - addResource(data: ResourceInput): Promise<Response>
   - updateResource(id: string, data: Partial<ResourceInput>): Promise<Response>
   - deleteResource(id: string): Promise<Response>
   - uploadFile(file: File, metadata: object): Promise<string>

2. Validation functions:
   - isValidDriveLink(url: string): boolean
   - isValidPDF(file: File): boolean
   - validateResourceForm(data: ResourceInput): ValidationResult

3. Formatting functions:
   - formatDate(date: string): string
   - truncateUrl(url: string, maxLength: number): string
   - getResourceTypeColor(type: string): string
   - getStorageIcon(type: 'drive' | 'supabase'): ReactNode

4. Custom hooks:
   - useResources(filters?: object): { data, loading, error, refetch }
   - useAdminAuth(): { isAuthenticated, logout }

All functions should:
- Include the admin_secret in requests automatically (from cookie/localStorage)
- Have proper TypeScript types
- Handle errors gracefully
- Return consistent response formats

Also create TypeScript types file:
/types/admin.ts with all necessary interfaces.
```

---

## 🎯 PROMPT 11: SUBJECT CONFIGURATION

```
Create a configuration file for subjects by semester.

Requirements:
- File: /config/subjects.ts

Structure:
export const SUBJECTS_BY_SEMESTER = {
  3: [
    { code: 'OOPS', name: 'Object Oriented Programming with C++' },
    { code: 'DSA', name: 'Data Structures and Algorithms' },
    { code: 'MATHS3', name: 'Mathematics III' },
    { code: 'DE', name: 'Digital Electronics' },
    { code: 'UNIX', name: 'Unix Programming' }
  ],
  4: [
    { code: 'FABS', name: 'Foundations of Algorithms and Basic Sciences' },
    { code: 'DBMS', name: 'Database Management Systems' },
    { code: 'COA', name: 'Computer Organization and Architecture' },
    { code: 'OS', name: 'Operating Systems' },
    { code: 'MATHS4', name: 'Mathematics IV' }
  ],
  5: [...],
  6: [...],
  7: [...],
  8: [...]
};

export const RESOURCE_TYPES = [
  'Notes',
  'CIE1',
  'CIE2',
  'CIE3',
  'SEE',
  'Book'
] as const;

export const UNITS = [1, 2, 3, 4, 5] as const;

Also export:
- Helper function: getSubjectsForSemester(semester: number)
- Helper function: getSubjectName(code: string, semester: number)
- TypeScript types for all exports

Make it easy to update when new subjects are added.
```

---

## 🎯 PROMPT 12: TOAST NOTIFICATION SYSTEM

```
Create a toast notification system for the admin panel.

Requirements:
- Use sonner or react-hot-toast library
- Create wrapper component: /components/admin/Toaster.tsx
- Create utility functions: /lib/toast.ts

Utility functions:
- toast.success(message: string)
- toast.error(message: string)
- toast.loading(message: string)
- toast.promise(promise: Promise, messages: object)

Usage examples:
toast.success('Resource added successfully!');
toast.error('Failed to delete resource');
toast.loading('Uploading file...');

toast.promise(
  addResource(data),
  {
    loading: 'Adding resource...',
    success: 'Resource added!',
    error: 'Failed to add resource'
  }
);

Setup:
1. Add Toaster component to admin layout
2. Style to match admin panel theme
3. Position: bottom-right
4. Auto-dismiss after 5 seconds

Use TypeScript.
Make it easy to use across all admin pages.
```

---

## USAGE INSTRUCTIONS

Use these prompts in order to build the complete admin panel:

**Phase 1: Foundation**
1. Prompt 11 (Subject Configuration)
2. Prompt 10 (Utilities)
3. Prompt 12 (Toast System)

**Phase 2: Authentication**
4. Prompt 1 (Login Page)
5. Prompt 2 (Dashboard Layout)

**Phase 3: Core Features**
6. Prompt 9 (File Upload Component)
7. Prompt 3 (Add Resource Form)
8. Prompt 8 (Resource Card Component)
9. Prompt 4 (Manage Resources Page)

**Phase 4: Actions**
10. Prompt 5 (Edit Modal)
11. Prompt 6 (Delete Dialog)

**Phase 5: Optional**
12. Prompt 7 (Analytics Dashboard)

Each prompt is self-contained but they work together as a complete system.
