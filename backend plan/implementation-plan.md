# CSBS Notes Web App - Backend & Admin Panel Implementation Plan

## 🎯 PROJECT SCOPE

### What We're Building
- **Admin Panel**: Web interface to add/edit/delete resources with Drive links
- **Backend APIs**: Handle CRUD operations for resources
- **Database**: Store all metadata (Sem 3-8) in Supabase
- **Frontend Integration**: Display resources and redirect to Drive/Supabase links

### Key Requirement
- **Sem 3**: Files stored in Supabase Storage
- **Sem 4-8**: Google Drive links only (no file upload)

---

## 📋 PHASE 1: DATABASE SETUP

### Step 1.1: Create Supabase Table

```sql
-- Create resources table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  semester INTEGER NOT NULL CHECK (semester >= 3 AND semester <= 8),
  subject TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('Notes', 'CIE1', 'CIE2', 'CIE3', 'SEE', 'Book')),
  unit INTEGER CHECK (unit >= 1 AND unit <= 5),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  storage_type TEXT NOT NULL CHECK (storage_type IN ('drive', 'supabase')),
  year INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_semester ON resources(semester);
CREATE INDEX idx_subject ON resources(subject);
CREATE INDEX idx_resource_type ON resources(resource_type);

-- Enable Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can SELECT (read)
CREATE POLICY "Public read access" ON resources
  FOR SELECT USING (true);

-- Policy: Only authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "Authenticated full access" ON resources
  FOR ALL USING (auth.role() = 'authenticated');
```

### Step 1.2: Subject Master Data

```sql
-- Create subjects table (optional but recommended)
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  semester INTEGER NOT NULL,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_name TEXT
);

-- Insert Sem 4-8 subjects
INSERT INTO subjects (semester, code, name, short_name) VALUES
  (4, 'FABS', 'Foundations of Algorithms and Basic Sciences', 'FABS'),
  (4, 'DBMS', 'Database Management Systems', 'DBMS'),
  (4, 'COA', 'Computer Organization and Architecture', 'COA');
  -- Add more subjects...
```

---

## 📋 PHASE 2: BACKEND API DEVELOPMENT

### API Routes Structure

```
app/
└── api/
    ├── admin/
    │   ├── add-resource/route.ts
    │   ├── update-resource/route.ts
    │   ├── delete-resource/route.ts
    │   └── auth/route.ts
    ├── resources/
    │   ├── route.ts (GET all)
    │   ├── [semester]/route.ts (GET by semester)
    │   └── analytics/route.ts
    └── middleware.ts
```

### API Endpoint Specifications

#### 1. POST /api/admin/add-resource
**Request Body:**
```json
{
  "semester": 4,
  "subject": "FABS",
  "resource_type": "Book",
  "unit": 1,
  "title": "FABS Unit 1 Book",
  "file_url": "https://drive.google.com/file/d/xxx",
  "storage_type": "drive",
  "year": 2024,
  "admin_secret": "your-secret-key"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "FABS Unit 1 Book"
  }
}
```

#### 2. PUT /api/admin/update-resource
**Request Body:**
```json
{
  "id": "resource-uuid",
  "title": "Updated title",
  "file_url": "new-link",
  "admin_secret": "your-secret-key"
}
```

#### 3. DELETE /api/admin/delete-resource
**Request Body:**
```json
{
  "id": "resource-uuid",
  "admin_secret": "your-secret-key"
}
```

#### 4. GET /api/resources?semester=4&subject=FABS&type=Book
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "semester": 4,
      "subject": "FABS",
      "resource_type": "Book",
      "unit": 1,
      "title": "FABS Unit 1 Book",
      "file_url": "https://drive.google.com/...",
      "storage_type": "drive",
      "created_at": "2024-02-13"
    }
  ]
}
```

---

## 📋 PHASE 3: ADMIN PANEL UI

### Admin Panel Pages

```
app/
└── admin/
    ├── page.tsx (Dashboard)
    ├── add/page.tsx (Add Resource Form)
    ├── manage/page.tsx (View/Edit/Delete)
    └── layout.tsx (Auth wrapper)
```

### Admin Panel Features

#### Page 1: Login (/admin)
- Simple password input
- Stores session in localStorage or cookie
- Redirects to dashboard

#### Page 2: Dashboard (/admin/add)
**Form Fields:**
1. Semester (Dropdown: 3-8)
2. Subject (Dropdown - loads based on semester)
3. Resource Type (Tabs or Dropdown)
4. Unit (Dropdown: 1-5, optional)
5. Title (Text input)
6. **File Source Toggle:**
   - If Sem 3: Show file upload
   - If Sem 4-8: Show Drive link input
7. Year (Optional)
8. Submit Button

**Form Behavior:**
```typescript
const handleSubmit = async (formData) => {
  const storage_type = semester === 3 ? 'supabase' : 'drive';
  
  let file_url;
  if (semester === 3) {
    // Upload to Supabase Storage
    file_url = await uploadToSupabase(file);
  } else {
    // Use Drive link directly
    file_url = driveLink;
  }
  
  await fetch('/api/admin/add-resource', {
    method: 'POST',
    body: JSON.stringify({
      ...formData,
      file_url,
      storage_type
    })
  });
};
```

#### Page 3: Manage Resources (/admin/manage)
**Features:**
- Table view of all resources
- Filters: Semester, Subject, Type
- Actions: Edit, Delete
- Search bar
- Pagination

**Table Columns:**
| Semester | Subject | Type | Unit | Title | Link | Actions |
|----------|---------|------|------|-------|------|---------|
| 4 | FABS | Book | 1 | Title | 🔗 | ✏️ 🗑️ |

---

## 📋 PHASE 4: FRONTEND INTEGRATION

### Frontend Page Structure

```
app/
├── page.tsx (Home - Semester Grid)
├── semester/
│   └── [id]/page.tsx (Subject Grid)
└── resources/
    └── [semester]/[subject]/page.tsx (Resource Cards)
```

### Frontend Data Flow

#### 1. Semester Page (`/semester/4`)
```typescript
// Fetch subjects for semester 4
const subjects = await supabase
  .from('resources')
  .select('subject')
  .eq('semester', 4)
  .distinct();

// Display as cards
```

#### 2. Subject Resource Page (`/semester/4/FABS`)
```typescript
// Fetch all resources for FABS in Sem 4
const { data } = await supabase
  .from('resources')
  .select('*')
  .eq('semester', 4)
  .eq('subject', 'FABS')
  .order('resource_type', 'unit');

// Group by type and unit
const grouped = {
  Notes: { unit1: [...], unit2: [...] },
  Books: [...],
  CIE1: [...],
  SEE: [...]
};
```

#### 3. Resource Card Component
```tsx
<ResourceCard 
  title="FABS Unit 1 Book"
  type="Book"
  url="https://drive.google.com/..."
  onClick={() => window.open(url, '_blank')}
/>
```

---

## 🔐 PHASE 5: SECURITY IMPLEMENTATION

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
ADMIN_SECRET=your-strong-password
```

### Admin Authentication Middleware
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const secret = request.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
}
```

---

## 📊 PHASE 6: TESTING CHECKLIST

### Backend Tests
- ✅ Add resource with Drive link (Sem 4-8)
- ✅ Add resource with file upload (Sem 3)
- ✅ Update resource
- ✅ Delete resource
- ✅ Fetch by semester
- ✅ Fetch by subject
- ✅ Unauthorized access denied

### Frontend Tests
- ✅ Display semesters
- ✅ Display subjects per semester
- ✅ Display resources by type and unit
- ✅ Click resource → Opens correct link
- ✅ Drive links open in new tab
- ✅ Supabase files download/view correctly

### Admin Panel Tests
- ✅ Login works
- ✅ Form validation works
- ✅ Drive link saved correctly
- ✅ Resources appear in manage page
- ✅ Edit functionality works
- ✅ Delete functionality works

---

## 🚀 DEPLOYMENT CHECKLIST

1. **Supabase Setup**
   - ✅ Table created
   - ✅ RLS enabled
   - ✅ Policies configured
   - ✅ Storage bucket created (Sem 3)

2. **Vercel Deployment**
   - ✅ Environment variables added
   - ✅ Build successful
   - ✅ API routes working

3. **Post-Deploy**
   - ✅ Test admin panel
   - ✅ Test resource addition
   - ✅ Test frontend display
   - ✅ Test Drive link redirects

---

## 📈 FUTURE ENHANCEMENTS

### V2 Features
- Search functionality
- Resource ratings
- Download count tracking
- Contributor system
- Broken link reporting
- Auto Drive link validation

### V3 Features
- AI-powered recommendations
- Study group chat
- Scheduled resource updates
- Analytics dashboard
- Mobile app

---

## 🛠 DEVELOPMENT TIMELINE

| Phase | Task | Time |
|-------|------|------|
| 1 | Database Setup | 1 hour |
| 2 | Backend API | 3-4 hours |
| 3 | Admin Panel UI | 4-5 hours |
| 4 | Frontend Integration | 3-4 hours |
| 5 | Security | 2 hours |
| 6 | Testing | 2-3 hours |
| **Total** | | **15-19 hours** |

---

## 📞 SUPPORT & MAINTENANCE

### Regular Tasks
- Monitor database size
- Check broken Drive links
- Update subject list for new semesters
- Backup database monthly

### Emergency Response
- Drive link dead → Admin updates link
- Database issue → Check Supabase logs
- API failing → Check Vercel logs
