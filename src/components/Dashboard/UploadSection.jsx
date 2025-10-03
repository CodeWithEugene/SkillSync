import { useState, useCallback } from "react";
import { Upload, Target, FileText, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useUpload } from "@/utils/useUpload";

export function UploadSection({ onUploadComplete }) {
  const [dragActive, setDragActive] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  
  const [upload, { loading: uploadLoading }] = useUpload();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const targetCareer = watch("targetCareer");

  // Get career paths for autocomplete
  const { data: careerPaths } = useQuery({
    queryKey: ['career-paths'],
    queryFn: async () => {
      const response = await fetch('/api/career-paths');
      if (!response.ok) throw new Error('Failed to fetch career paths');
      const data = await response.json();
      return data.careerPaths;
    },
  });

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileInput = async (e) => {
    const files = [...e.target.files];
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      // Upload file
      const uploadResult = await upload({
        reactNativeAsset: {
          file: file,
          name: file.name,
          mimeType: file.type
        }
      });

      if (uploadResult.error) {
        throw new Error(uploadResult.error);
      }

      // Save document to database
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          fileUrl: uploadResult.url,
          fileType: file.type
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save document');
      }

      const data = await response.json();
      setUploadedDocument(data.document);

    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const onSubmit = async (formData) => {
    if (!uploadedDocument || !formData.targetCareer || !formData.documentContent) {
      return;
    }

    setAnalysisLoading(true);

    try {
      const response = await fetch('/api/skills/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: uploadedDocument.id,
          targetCareer: formData.targetCareer,
          documentContent: formData.documentContent
        })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      onUploadComplete?.();
      
      // Reset form
      setUploadedDocument(null);
      
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Upload & Analyze Your Coursework
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Document
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-[#2563EB] bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadLoading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin text-[#2563EB] mb-2" size={32} />
                <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
              </div>
            ) : uploadedDocument ? (
              <div className="flex flex-col items-center">
                <FileText className="text-[#10B981] mb-2" size={32} />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {uploadedDocument.filename}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Uploaded successfully
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop your syllabus or notes here, or{" "}
                  <button
                    type="button"
                    className="text-[#2563EB] hover:text-[#1D4ED8] font-medium"
                    onClick={() => document.getElementById("file-input").click()}
                  >
                    browse files
                  </button>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supports PDF, DOC, DOCX, TXT files up to 10MB
                </p>
              </div>
            )}
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
            />
          </div>
        </div>

        {/* Document Content Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Document Content
          </label>
          <textarea
            {...register("documentContent", { required: "Document content is required" })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
            placeholder="Paste your syllabus content, course description, or notes here..."
          />
          {errors.documentContent && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.documentContent.message}
            </p>
          )}
        </div>

        {/* Career Path Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Target Career Path
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              {...register("targetCareer", { required: "Career path is required" })}
              list="career-paths"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
              placeholder="e.g., Data Scientist, Software Engineer, Product Manager"
            />
            <datalist id="career-paths">
              {careerPaths?.map((career) => (
                <option key={career.id} value={career.name} />
              ))}
            </datalist>
          </div>
          {errors.targetCareer && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.targetCareer.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!uploadedDocument || analysisLoading || uploadLoading}
          className="w-full flex items-center justify-center px-6 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {analysisLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Analyzing Skills...
            </>
          ) : (
            "Analyze Skills"
          )}
        </button>
      </form>
    </div>
  );
}