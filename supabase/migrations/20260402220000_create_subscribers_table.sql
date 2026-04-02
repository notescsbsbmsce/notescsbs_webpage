-- Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (Insert)
CREATE POLICY "Anyone can subscribe" 
ON public.subscribers 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Only admins can view subscribers (Select)
CREATE POLICY "Only admins can view subscribers" 
ON public.subscribers 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete subscribers (optional)
CREATE POLICY "Only admins can delete subscribers" 
ON public.subscribers 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
