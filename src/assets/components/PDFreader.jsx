import { useLocation } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { version as pdfjsVersion } from 'pdfjs-dist';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const PDFReader = () => {
  const location = useLocation();
  const { pdfUrl } = location.state || {};
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!pdfUrl) {
    return <div className="w-full flex justify-center items-center bg-gray-200 text-xl">No PDF file available.</div>;
  }

  // Correct the pdfUrl to include the full URL of your backend server
  const fullPdfUrl = pdfUrl.startsWith('http') ? pdfUrl : `http://localhost:5000${pdfUrl}`;

  console.log("Navigating to PDF:", fullPdfUrl); // Log the full URL to verify

  return (
    <div className="w-full  bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-gray-700 py-4">PDF Viewer</h2>
        <div className="pdf-container p-4">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
            <Viewer 
              fileUrl={fullPdfUrl} 
              plugins={[defaultLayoutPluginInstance]} 
              className="w-full h-[calc(100vh-200px)] overflow-auto" 
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PDFReader;





