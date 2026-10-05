'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import TopBar from '@/components/shared/TopBar';
import { FileText, UploadCloud, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function UploadCvPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.cv.upload(file);
      router.push(`/analysis?id=${res.id}`);
    } catch (err) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <TopBar title="Upload Your Profile" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        
        {/* Upload Area */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Resume/CV Document</h3>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-blue-300 bg-white hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FileText size={32} />
              </div>
              <p className="text-gray-900 font-medium mb-1">Drag and drop your PDF here</p>
              <p className="text-gray-500 text-sm mb-6">or click to browse your local files</p>
              <button type="button" className="btn-primary text-sm px-8">Browse Files</button>
            </div>
          </div>

          <div className="bg-[#F5F3FF] rounded-xl p-6 border border-blue-100">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
              <span className="w-5 h-5 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center text-xs">i</span>
              Upload Requirements
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Maximum file size: 5.0 MB</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Format: Only PDF files (.pdf) are supported</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Content: Ensure your contact info and experience are legible</li>
            </ul>
          </div>
        </div>

        {/* Preview Area */}
        <div className="card flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase">DOCUMENT PREVIEW</h3>
          </div>
          <div className="flex-1 bg-[#E2E7FF]/30 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
            {file ? (
              <div className="bg-white p-6 shadow-sm rounded border border-gray-200">
                <FileText size={48} className="text-blue-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="opacity-50">
                <div className="w-32 h-40 bg-white shadow-sm rounded-sm mx-auto mb-4 border border-gray-200 flex flex-col gap-2 p-4">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                </div>
                <p className="text-sm text-gray-500">Select a file to see preview</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={handleUpload} 
              disabled={!file || uploading} 
              className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                file ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {uploading ? 'Analyzing...' : 'Analyze CV'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">Please upload your CV to start the AI analysis</p>
          </div>
        </div>

      </div>
    </div>
  );
}
