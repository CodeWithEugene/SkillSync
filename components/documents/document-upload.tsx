"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DocumentUploadProps {
  onUploadComplete: (documentId: string) => void
}

export function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filename', file.name)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()
      setUploadProgress(100)
      
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
        onUploadComplete(result.document.id)
      }, 500)
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.message || 'Upload failed. Please try again.')
      setUploading(false)
      setUploadProgress(0)
    }
  }, [onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled: uploading,
  })

  return (
    <Card className="border-2 border-dashed border-white/20 hover:border-white/40 transition-colors">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`cursor-pointer text-center space-y-4 ${
            isDragActive ? 'opacity-50' : ''
          } ${uploading ? 'pointer-events-none' : ''}`}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-2">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
              <p className="text-white/70">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
                </p>
                <p className="text-white/60 text-sm mt-2">or click to browse</p>
                <p className="text-white/40 text-xs mt-2">
                  Supports: PDF, TXT, DOC, DOCX
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
