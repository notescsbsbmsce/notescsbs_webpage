# QUICK START GUIDE - CSBS Notes Backend & Admin Panel

## 🚀 STEP-BY-STEP IMPLEMENTATION

### Prerequisites
- Node.js 18+ installed
- Supabase account created
- Next.js 14+ project initialized
- Vercel account (for deployment)

---

## PHASE 1: SUPABASE SETUP (30 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project: "csbs-notes"
3. Save these credentials:
   - Project URL
   - Anon/Public Key
   - Service Role Key

### Step 2: Run Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy-paste this schema:

```sql
-- Create resources table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Create indexes
CREATE INDEX idx_semester ON resources(semester);
CREATE INDEX idx_subject ON resources(subject);
CREATE INDEX idx_resource_type ON resources(resource_type);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Public read access" ON resources
  FOR SELECT USING (true);

-- Authenticated can do everything (we'll use admin secret instead)
CREATE POLICY "Admin full access" ON resources
  FOR ALL USING (true);
```

3. Click "Run"

### Step 3: Create Storage Bucket (for Sem 3)
1. Go to Storage → Create bucket
2. Bucket name: `resources`
3. Public: ✅ Yes
4. Save

---

## PHASE 2: NEXT.JS PROJECT SETUP (15 minutes)

### Step 1: Install Dependencies
```bash
npm install @supabase/supabase-js
npm install -D @types/node
```

### Step 2: Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_SECRET=your-strong-password-here
```

⚠️ **IMPORTANT**: Add `.env.local` to `.gitignore`

### Step 3: Create Folder Structure
```bash
mkdir -p app/api/admin/{add-resource,update-resource,delete-resource,upload-file,auth}
mkdir -p app/api/resources/{[semester]}
mkdir -p app/admin/{add,manage,analytics}
mkdir -p components/admin
mkdir -p lib
mkdir -p config
mkdir -p types
```

---

## PHASE 3: BACKEND IMPLEMENTATION (3-4 hours)

### Files to Create (use prompts from backend-prompts.md):

#### 1. `/lib/supabase.ts`
Use **Backend Prompt 7** to create this file.

#### 2. `/lib/api-error.ts`
Use **Backend Prompt 10** to create error handlers.

#### 3. `/types/resource.ts`
```typescript
export type ResourceType = 'Notes' | 'CIE1' | 'CIE2' | 'CIE3' | 'SEE' | 'Book';
export type StorageType = 'drive' | 'supabase';

export interface Resource {
  id: string;
  semester: number;
  subject: string;
  resource_type: ResourceType;
  unit?: number;
  title: string;
  file_url: string;
  storage_type: StorageType;
  year?: number;
  created_at: string;
  created_by?: string;
  updated_at: string;
}

export interface AddResourceInput {
  semester: number;
  subject: string;
  resource_type: ResourceType;
  unit?: number;
  title: string;
  file_url: string;
  storage_type: StorageType;
  year?: number;
  admin_secret: string;
}
```

#### 4. API Routes (use Backend Prompts 2-6, 8, 9)
- `/app/api/admin/add-resource/route.ts` → **Prompt 2**
- `/app/api/resources/route.ts` → **Prompt 3**
- `/app/api/admin/update-resource/route.ts` → **Prompt 4**
- `/app/api/admin/delete-resource/route.ts` → **Prompt 5**
- `/app/api/resources/[semester]/route.ts` → **Prompt 6**
- `/app/api/admin/auth/route.ts` → **Prompt 8**
- `/app/api/admin/upload-file/route.ts` → **Prompt 9**

#### 5. Test Backend
Use this test script:
```bash
# Test add resource (Sem 4 - Drive link)
curl -X POST http://localhost:3000/api/admin/add-resource \
  -H "Content-Type: application/json" \
  -d '{
    "semester": 4,
    "subject": "FABS",
    "resource_type": "Book",
    "unit": 1,
    "title": "Test Book",
    "file_url": "https://drive.google.com/file/d/test",
    "storage_type": "drive",
    "admin_secret": "your-admin-secret"
  }'

# Test get resources
curl http://localhost:3000/api/resources?semester=4
```

---

## PHASE 4: ADMIN PANEL UI (4-5 hours)

### Install UI Dependencies
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input select table dialog alert-dialog form
npm install react-hook-form @hookform/resolvers zod
npm install sonner  # for toast notifications
```

### Files to Create (use prompts from admin-panel-prompts.md):

#### 1. Configuration
- `/config/subjects.ts` → **Admin Prompt 11**

#### 2. Utilities
- `/lib/admin-utils.ts` → **Admin Prompt 10**
- `/lib/toast.ts` → **Admin Prompt 12**

#### 3. Components
- `/components/admin/Toaster.tsx` → **Admin Prompt 12**
- `/components/admin/FileUpload.tsx` → **Admin Prompt 9**
- `/components/admin/ResourceCard.tsx` → **Admin Prompt 8**
- `/components/admin/EditResourceModal.tsx` → **Admin Prompt 5**
- `/components/admin/DeleteConfirmDialog.tsx` → **Admin Prompt 6**

#### 4. Admin Pages
- `/app/admin/page.tsx` → **Admin Prompt 1** (Login)
- `/app/admin/layout.tsx` → **Admin Prompt 2** (Layout)
- `/app/admin/add/page.tsx` → **Admin Prompt 3** (Add Form)
- `/app/admin/manage/page.tsx` → **Admin Prompt 4** (Manage)
- `/app/admin/analytics/page.tsx` → **Admin Prompt 7** (Optional)

---

## PHASE 5: TESTING (2 hours)

### Backend Testing Checklist
```bash
✅ Add resource with Drive link (Sem 4-8)
✅ Add resource with file upload (Sem 3)
✅ Update resource
✅ Delete resource
✅ Fetch by semester
✅ Fetch by subject
✅ Unauthorized access returns 401
```

### Frontend Testing Checklist
```bash
✅ Login to admin panel
✅ Add resource form validation
✅ Submit form successfully
✅ View resources in manage page
✅ Edit resource
✅ Delete resource with confirmation
✅ File upload works (Sem 3)
✅ Drive link input works (Sem 4-8)
```

### Manual Testing Flow
1. **Login**: Go to `/admin`, enter password
2. **Add Resource**:
   - Select Sem 4, FABS, Book, Unit 1
   - Enter Drive link
   - Submit
3. **Verify**: Go to `/admin/manage`, see the resource
4. **Frontend Test**: Go to `/semester/4`, click FABS → Book → Unit 1
5. **Verify Redirect**: Should open Drive link in new tab

---

## PHASE 6: DEPLOYMENT (1 hour)

### Deploy to Vercel

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

#### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_SECRET`

#### 3. Deploy
- Click "Deploy"
- Wait for build to complete
- Test live URL

### Post-Deployment Testing
1. Test admin login at `your-domain.vercel.app/admin`
2. Add a test resource
3. Verify it appears on frontend

---

## PHASE 7: POPULATE DATA (Ongoing)

### Batch Upload Script (Optional)
Create `/scripts/bulk-upload.ts`:
```typescript
// Read CSV with resources
// Loop and call API for each
// Useful for migrating existing data
```

### Manual Entry Process
1. Admin logs in
2. For each subject and unit:
   - Upload file to Google Drive
   - Get shareable link
   - Add via admin panel

---

## 🔧 TROUBLESHOOTING

### Common Issues

#### Issue: "Failed to fetch"
**Solution**: Check CORS settings, verify API routes are running

#### Issue: "Unauthorized"
**Solution**: Verify ADMIN_SECRET matches in .env and requests

#### Issue: "File upload fails"
**Solution**: 
- Check Supabase storage bucket exists
- Verify bucket is public
- Check file size < 10MB

#### Issue: "Drive link doesn't redirect"
**Solution**: 
- Ensure link is shareable (not private)
- Use direct file link, not folder link
- Format: `https://drive.google.com/file/d/FILE_ID/view`

---

## 📊 MONITORING & MAINTENANCE

### Weekly Tasks
- Check Supabase database size
- Verify Drive links are working
- Review error logs in Vercel

### Monthly Tasks
- Backup database (Supabase has auto-backup)
- Update subjects for new semester
- Clean up broken links

---

## 🎯 SUCCESS METRICS

After implementation, you should have:
- ✅ Working admin panel at `/admin`
- ✅ API endpoints for CRUD operations
- ✅ Database with RLS enabled
- ✅ File upload for Sem 3
- ✅ Drive link integration for Sem 4-8
- ✅ Responsive UI
- ✅ Secure authentication
- ✅ Deployed to Vercel

---

## 📚 NEXT STEPS

### Immediate Improvements
1. Add search functionality
2. Add resource tags
3. Add download counter
4. Add user feedback system

### Future Features
1. Contributor system
2. Resource rating
3. AI-powered recommendations
4. Mobile app
5. Study group chat

---

## 🆘 SUPPORT

If you get stuck:
1. Check error logs in Vercel dashboard
2. Check Supabase logs
3. Review API responses in browser Network tab
4. Verify environment variables are set correctly

For prompt-specific help, refer to:
- `backend-prompts.md` for API issues
- `admin-panel-prompts.md` for UI issues
- `implementation-plan.md` for architecture questions
