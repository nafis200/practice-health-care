import React from 'react';

const AutoDownloadPDF = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/pdf/download', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div>
      <h2>Click below to download PDF</h2>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default AutoDownloadPDF;
