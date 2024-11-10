import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Bot, ChevronLeft, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from './LoadingSpinner';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface NoteViewerProps {
  fileUrl: string;
  fileType: 'pdf' | 'markdown';
  isDark: boolean;
}

function NoteViewer({ fileUrl, fileType, isDark }: NoteViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [error, setError] = useState<string>('');
  const [pdfError, setPdfError] = useState<string>('');

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError('');
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setPdfError('PDF yüklenirken bir hata oluştu. Bu PDF dosyası şu anda erişilebilir olmayabilir.');
  };

  const requestAIExplanation = async () => {
    setIsLoadingAI(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockExplanation = `# Sayfa ${pageNumber} Açıklaması

Bu sayfada önemli noktalar:

1. Temel kavramlar açıklanmış
2. Örneklerle desteklenmiş
3. Pratik uygulamalar gösterilmiş

> Not: Bu açıklama şu an için simüle edilmiştir. Gerçek API entegrasyonu yapıldığında, içerik dinamik olarak üretilecektir.`;
      
      setAiExplanation(mockExplanation);
    } catch (error) {
      setError('Açıklama alınırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('AI explanation error:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className={`flex-1 p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
        {fileType === 'pdf' ? (
          pdfError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-red-100/10 p-4 rounded-full mb-4">
                <AlertCircle size={48} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Görüntülenemiyor</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{pdfError}</p>
              <div className="flex items-center gap-2 text-sm">
                <FileText size={16} />
                <span>Alternatif olarak dosyayı indirebilirsiniz</span>
              </div>
            </div>
          ) : (
            <>
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<LoadingSpinner size={32} className="my-8" />}
                className="flex justify-center"
              >
                <Page 
                  pageNumber={pageNumber} 
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="max-w-full"
                  loading={<LoadingSpinner size={32} className="my-8" />}
                />
              </Document>
              
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => setPageNumber(page => Math.max(1, page - 1))}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <span>
                  Sayfa {pageNumber} / {numPages}
                </span>
                <button
                  onClick={() => setPageNumber(page => Math.min(numPages, page + 1))}
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{fileUrl}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className={`w-full lg:w-96 p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
        <div className="flex items-center gap-2 mb-4">
          <Bot size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold">AI Açıklama</h3>
        </div>

        <button
          onClick={requestAIExplanation}
          disabled={isLoadingAI || !!pdfError}
          className="w-full px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoadingAI ? (
            <>
              <LoadingSpinner size={20} />
              <span>Açıklama Hazırlanıyor...</span>
            </>
          ) : (
            'AI Açıklama İste'
          )}
        </button>

        {error && (
          <div className="p-4 mb-4 rounded-lg bg-red-100/10 border border-red-600 text-red-600">
            {error}
          </div>
        )}

        {aiExplanation && !error && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            <ReactMarkdown>{aiExplanation}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteViewer;