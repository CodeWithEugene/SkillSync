-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  filename TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PROCESSING', 'COMPLETED', 'FAILED')),
  "uploadDate" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create extracted_skills table
CREATE TABLE IF NOT EXISTS extracted_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "documentId" UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  "skillName" TEXT NOT NULL,
  category TEXT NOT NULL,
  "confidenceScore" DOUBLE PRECISION NOT NULL,
  "evidenceText" TEXT,
  "isVerified" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents("userId");
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_extracted_skills_user_id ON extracted_skills("userId");
CREATE INDEX IF NOT EXISTS idx_extracted_skills_document_id ON extracted_skills("documentId");

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracted_skills ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  USING (auth.uid()::text = "userId");

-- Create policies for extracted_skills
CREATE POLICY "Users can view own skills"
  ON extracted_skills FOR SELECT
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own skills"
  ON extracted_skills FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own skills"
  ON extracted_skills FOR UPDATE
  USING (auth.uid()::text = "userId");

-- Create storage bucket for coursework
INSERT INTO storage.buckets (id, name, public)
VALUES ('coursework', 'coursework', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for coursework bucket
CREATE POLICY "Users can upload own files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'coursework' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'coursework' AND auth.uid()::text = (storage.foldername(name))[1]);

