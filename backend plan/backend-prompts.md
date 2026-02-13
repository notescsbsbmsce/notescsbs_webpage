# AI PROMPTS FOR BACKEND DEVELOPMENT

## 🎯 PROMPT 1: DATABASE SETUP

```
Create a Supabase database schema for a college notes sharing app with the following requirements:

1. Create a 'resources' table with these columns:
   - id: UUID primary key with auto-generation
   - semester: Integer (3-8) with check constraint
   - subject: Text (e.g., "FABS", "DBMS", "COA")
   - resource_type: Text with enum constraint (Notes, CIE1, CIE2, CIE3, SEE, Book)
   - unit: Integer (1-5), nullable
   - title: Text (resource title)
   - file_url: Text (Google Drive link or Supabase URL)
   - storage_type: Text with enum constraint ("drive" or "supabase")
   - year: Integer, nullable
   - created_at: Timestamp with default NOW()
   - created_by: Text, nullable
   - updated_at: Timestamp with default NOW()

2. Add indexes on semester, subject, and resource_type for performance

3. Enable Row Level Security (RLS):
   - Allow public SELECT (read) access
   - Allow INSERT/UPDATE/DELETE only for authenticated users

4. Create a 'subjects' table (optional):
   - id: UUID primary key
   - semester: Integer
   - code: Text (unique)
   - name: Text (full subject name)
   - short_name: Text

Provide the complete SQL schema.
```

---

## 🎯 PROMPT 2: ADD RESOURCE API

```
Create a Next.js API route handler for adding resources to a Supabase database.

Requirements:
- Route: POST /app/api/admin/add-resource/route.ts
- Use Next.js 14+ App Router
- Use @supabase/supabase-js library

Request body structure:
{
  "semester": 4,
  "subject": "FABS",
  "resource_type": "Book",
  "unit": 1,
  "title": "FABS Unit 1 Book",
  "file_url": "https://drive.google.com/file/d/xxx",
  "storage_type": "drive",
  "year": 2024,
  "admin_secret": "secret-key"
}

Implementation requirements:
1. Verify admin_secret against process.env.ADMIN_SECRET
2. Validate all required fields (semester, subject, resource_type, title, file_url, storage_type)
3. Validate semester is between 3-8
4. Validate resource_type is one of: Notes, CIE1, CIE2, CIE3, SEE, Book
5. Validate storage_type is "drive" or "supabase"
6. Insert into Supabase 'resources' table
7. Return success response with inserted data or error response

Error handling:
- Return 401 for invalid admin secret
- Return 400 for validation errors
- Return 500 for database errors

Use TypeScript with proper types.
```

---

## 🎯 PROMPT 3: GET RESOURCES API

```
Create a Next.js API route handler for fetching resources from Supabase.

Requirements:
- Route: GET /app/api/resources/route.ts
- Support query parameters for filtering

Query parameters:
- semester (optional): Filter by semester (3-8)
- subject (optional): Filter by subject code
- resource_type (optional): Filter by type (Notes, CIE1, etc.)
- unit (optional): Filter by unit (1-5)

Implementation:
1. Parse query parameters from request.url
2. Build dynamic Supabase query with filters
3. Order results by: semester ASC, subject ASC, resource_type ASC, unit ASC
4. Return array of resources

Response format:
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
      "created_at": "2024-02-13T..."
    }
  ],
  "count": 1
}

Use TypeScript. Handle errors gracefully.
```

---

## 🎯 PROMPT 4: UPDATE RESOURCE API

```
Create a Next.js API route handler for updating resources in Supabase.

Requirements:
- Route: PUT /app/api/admin/update-resource/route.ts

Request body:
{
  "id": "resource-uuid",
  "title": "Updated Title",
  "file_url": "https://new-link.com",
  "unit": 2,
  "admin_secret": "secret-key"
}

Implementation:
1. Verify admin_secret
2. Validate id is provided
3. Build update object with only provided fields
4. Update 'updated_at' timestamp automatically
5. Update resource in Supabase
6. Return updated resource

Only allow updating: title, file_url, unit, year, subject, resource_type
Do NOT allow updating: id, semester, storage_type, created_at, created_by

Error handling:
- 401 for invalid admin
- 404 if resource not found
- 400 for validation errors

Use TypeScript.
```

---

## 🎯 PROMPT 5: DELETE RESOURCE API

```
Create a Next.js API route handler for deleting resources from Supabase.

Requirements:
- Route: DELETE /app/api/admin/delete-resource/route.ts

Request body:
{
  "id": "resource-uuid",
  "admin_secret": "secret-key"
}

Implementation:
1. Verify admin_secret
2. Validate id is provided
3. Fetch resource to check storage_type
4. If storage_type === "supabase":
   - Extract file path from file_url
   - Delete file from Supabase Storage bucket 'resources'
5. Delete row from 'resources' table
6. Return success response

Response:
{
  "success": true,
  "message": "Resource deleted",
  "deleted_file": true/false
}

Error handling:
- 401 for invalid admin
- 404 if resource not found
- Handle storage deletion errors gracefully (still delete DB row)

Use TypeScript with proper error handling.
```

---

## 🎯 PROMPT 6: GET RESOURCES BY SEMESTER API

```
Create a Next.js API route handler for fetching resources by semester.

Requirements:
- Route: GET /app/api/resources/[semester]/route.ts
- Dynamic route parameter: semester

Implementation:
1. Extract semester from params
2. Validate semester is between 3-8
3. Fetch all resources for that semester from Supabase
4. Group results by subject and resource_type
5. Return structured data

Response format:
{
  "success": true,
  "semester": 4,
  "data": {
    "FABS": {
      "Notes": [
        { "unit": 1, "title": "...", "file_url": "...", "id": "..." },
        { "unit": 2, "title": "...", "file_url": "...", "id": "..." }
      ],
      "CIE1": [...],
      "Book": [...]
    },
    "DBMS": { ... }
  }
}

Use TypeScript. Handle edge cases.
```

---

## 🎯 PROMPT 7: SUPABASE CLIENT SETUP

```
Create a Supabase client configuration for a Next.js app.

Requirements:
1. Create /lib/supabase.ts
2. Export two clients:
   - supabaseClient: For client-side operations (uses anon key)
   - supabaseAdmin: For server-side operations (uses service role key)

Environment variables needed:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

Implementation:
- Use @supabase/supabase-js
- Use createClient function
- Add TypeScript types
- Add error handling for missing env variables
- Export typed database schema if possible

Also create a TypeScript type definition for the Resource model:
{
  id: string;
  semester: number;
  subject: string;
  resource_type: 'Notes' | 'CIE1' | 'CIE2' | 'CIE3' | 'SEE' | 'Book';
  unit?: number;
  title: string;
  file_url: string;
  storage_type: 'drive' | 'supabase';
  year?: number;
  created_at: string;
  created_by?: string;
  updated_at: string;
}
```

---

## 🎯 PROMPT 8: ADMIN AUTHENTICATION MIDDLEWARE

```
Create a Next.js middleware for protecting admin routes.

Requirements:
- File: /middleware.ts
- Protect all routes starting with /admin
- Protect all API routes starting with /api/admin

Implementation:
1. Check if request path starts with /admin or /api/admin
2. For API routes:
   - Check x-admin-secret header
   - Compare with process.env.ADMIN_SECRET
   - Return 401 if invalid
3. For admin pages:
   - Check for admin_session cookie
   - Redirect to /admin/login if not present

Use Next.js 14+ middleware syntax.
Add proper TypeScript types.
Handle edge cases.

Also create a login API route:
- POST /api/admin/auth/route.ts
- Accept { "password": "..." }
- Verify against ADMIN_SECRET
- Set httpOnly cookie if valid
- Return success/error
```

---

## 🎯 PROMPT 9: FILE UPLOAD HANDLER (SEM 3 ONLY)

```
Create a file upload handler for Supabase Storage (only for Semester 3).

Requirements:
- Route: POST /app/api/admin/upload-file/route.ts
- Accept multipart/form-data with PDF file
- Upload to Supabase Storage bucket 'resources'
- Return public URL

Request:
- FormData with 'file' field
- Additional fields: semester, subject, unit
- admin_secret for auth

Implementation:
1. Verify admin_secret
2. Validate file is PDF
3. Validate file size < 10MB
4. Generate unique filename: `sem3/${subject}/unit${unit}/${timestamp}-${originalName}`
5. Upload to Supabase Storage bucket 'resources'
6. Get public URL
7. Return URL

Response:
{
  "success": true,
  "file_url": "https://...",
  "storage_type": "supabase"
}

Error handling:
- Invalid file type
- File too large
- Upload failed

Use TypeScript. Handle edge cases properly.
```

---

## 🎯 PROMPT 10: API ERROR HANDLER UTILITY

```
Create a centralized error handling utility for Next.js API routes.

Requirements:
Create /lib/api-error.ts with:

1. Custom error classes:
   - AuthError (401)
   - ValidationError (400)
   - NotFoundError (404)
   - ServerError (500)

2. Error handler function:
   - Takes error and returns NextResponse
   - Logs errors to console
   - Returns proper status codes
   - Returns consistent error format

Error response format:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User-friendly message",
    "details": {} // Optional
  }
}

3. Validation helper functions:
   - validateAdminSecret(secret: string)
   - validateSemester(semester: number)
   - validateResourceType(type: string)
   - validateRequired(fields: object, required: string[])

Use TypeScript with proper types.
Make it reusable across all API routes.
```

---

## USAGE INSTRUCTIONS

Copy each prompt above and paste it into Claude or ChatGPT to generate the code.

**Recommended Order:**
1. Start with Prompt 7 (Supabase Client Setup)
2. Then Prompt 10 (Error Handler)
3. Then Prompt 1 (Database Setup)
4. Then Prompts 2-6 (API Routes)
5. Then Prompt 8 (Middleware)
6. Finally Prompt 9 (File Upload)

Each prompt is self-contained and includes all context needed.
