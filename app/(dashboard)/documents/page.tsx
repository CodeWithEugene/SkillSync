"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DocumentUpload } from "@/components/documents/document-upload"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

interface Document {
  id: string
  filename: string
  fileUrl: string
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED'
  uploadDate: string
}

const sampleDocuments: Document[] = [
  {
    id: 'sample-1',
    filename: 'JKUAT_Math_CS_Syllabus.pdf',
    fileUrl: '#',
    status: 'COMPLETED',
    uploadDate: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    filename: 'Adamur_UI_Prototype.fig',
    fileUrl: '#',
    status: 'PROCESSING',
    uploadDate: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    filename: 'Loan_Guarantee_System_Spec.pdf',
    fileUrl: '#',
    status: 'FAILED',
    uploadDate: new Date().toISOString(),
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments)
  const [loading, setLoading] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; documentId: string; filename: string }>({
    isOpen: false,
    documentId: '',
    filename: '',
  })

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/documents')
      if (response.ok) {
        const data = await response.json()
        setDocuments((data.documents && data.documents.length > 0) ? data.documents : sampleDocuments)
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error)
      setDocuments(sampleDocuments)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
    // Poll for status updates
    const interval = setInterval(fetchDocuments, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleUploadComplete = (documentId: string) => {
    setShowUpload(false)
    fetchDocuments()
  }

  const handleDeleteClick = (documentId: string, filename: string) => {
    setDeleteDialog({ isOpen: true, documentId, filename })
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch('/api/documents/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: deleteDialog.documentId }),
      })

      if (response.ok) {
        fetchDocuments()
      } else {
        const data = await response.json()
        console.error('Failed to delete:', data.error)
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-400'
      case 'PROCESSING':
        return 'text-yellow-400'
      case 'FAILED':
        return 'text-red-400'
      default:
        return 'text-white/60'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'PROCESSING':
        return (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )
      case 'FAILED':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              My Coursework
            </h1>
            <p className="text-white/60 text-base sm:text-lg mt-2">
              Manage your uploaded documents
            </p>
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setShowUpload(!showUpload)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {showUpload ? 'Cancel Upload' : 'Upload Document'}
          </Button>
        </div>

        {showUpload && (
          <DocumentUpload onUploadComplete={handleUploadComplete} />
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Your Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && documents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
                <p className="text-white/60 mt-4">Loading documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12 sm:py-16 space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-white/60 text-sm sm:text-base px-4">
                  No documents uploaded yet. Upload your first coursework to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/60 text-sm">{`Showing ${documents.length} documents (demo data). Upload to replace.`}</p>
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-white/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{doc.filename}</p>
                        <p className="text-white/60 text-sm">
                          Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        <span className="text-sm font-medium capitalize">{doc.status.toLowerCase()}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(doc.id, doc.filename)}
                      className="ml-4 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, documentId: '', filename: '' })}
          onConfirm={handleDeleteConfirm}
          title="Delete Document"
          message={`Are you sure you want to delete "${deleteDialog.filename}"? This action cannot be undone.`}
        />
      </div>
    </div>
  )
}
