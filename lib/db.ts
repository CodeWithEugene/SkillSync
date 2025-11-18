import { createServerSupabaseClient } from './supabase-server'

// Database helper functions using Supabase
export async function createDocument(data: {
  userId: string
  filename: string
  fileUrl: string
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED'
}) {
  const supabase = await createServerSupabaseClient()
  const { data: result, error } = await supabase
    .from('documents')
    .insert({
      userId: data.userId,
      filename: data.filename,
      fileUrl: data.fileUrl,
      status: data.status,
    })
    .select()
    .single()
  
  if (error) throw error
  return result
}

export async function getDocuments(userId: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('userId', userId)
    .order('uploadDate', { ascending: false })
  
  if (error) {
    console.error('Error fetching documents:', error)
    return []
  }
  return data || []
}

export async function updateDocumentStatus(documentId: string, status: 'PROCESSING' | 'COMPLETED' | 'FAILED') {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('documents')
    .update({ status })
    .eq('id', documentId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function createExtractedSkill(data: {
  userId: string
  documentId: string
  skillName: string
  category: string
  confidenceScore: number
  evidenceText: string
}) {
  const supabase = await createServerSupabaseClient()
  const { data: result, error } = await supabase
    .from('extracted_skills')
    .insert({
      userId: data.userId,
      documentId: data.documentId,
      skillName: data.skillName,
      category: data.category,
      confidenceScore: data.confidenceScore,
      evidenceText: data.evidenceText,
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating skill:', error)
    throw error
  }
  return result
}

export async function getExtractedSkills(userId: string, documentId?: string) {
  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('extracted_skills')
    .select('*')
    .eq('userId', userId)
  
  if (documentId) {
    query = query.eq('documentId', documentId)
  }
  
  const { data, error } = await query.order('createdAt', { ascending: false })
  
  if (error) throw error
  return data || []
}

// For backward compatibility with Prisma-style usage
export const prisma = {
  document: {
    create: createDocument,
    findMany: (args: { where: { userId: string } }) => getDocuments(args.where.userId),
    update: (args: { where: { id: string }, data: { status: 'PROCESSING' | 'COMPLETED' | 'FAILED' } }) => 
      updateDocumentStatus(args.where.id, args.data.status),
  },
  extractedSkill: {
    create: createExtractedSkill,
    findMany: (args: { where: { userId: string; documentId?: string } }) => 
      getExtractedSkills(args.where.userId, args.where.documentId),
  },
}

