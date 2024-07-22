"use client";
import React from "react";
import { Document, Thumbnail, pdfjs } from "react-pdf";
import BrenIcon from "./../Icons/BrenIcon";
import SpinnerLoading from "./../Loading/SpinnerLoading";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  pdfUrl: string;
  height?: string;
  width?: string;
  thumbWidth?: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  height = "h-[220px]",
  width = "w-[350px]",
  thumbWidth = 350,
}) => {
  const [onError, setOnError] = React.useState<boolean>(false);
  const [onLoading, setOnLoading] = React.useState<boolean>(true);

  const handleLoadError = (error: any) => {
    setOnError(true);
    setOnLoading(false);
    // Aqui você pode lidar com o erro como desejar
  };

  const handleLoadProgress = (loading: any) => {
    if (loading.loaded >= loading.total) {
      setOnLoading(false);
    } else {
      setOnLoading(true);
    }
  };

  //useeffect
  React.useEffect(() => {
    setOnError(false);
  }, [pdfUrl]);

  return (
    <>
      {!onError && (
        <div className={`${onLoading ? "hidden" : "block"}`}>
          <Document
            file={pdfUrl}
            onLoadProgress={handleLoadProgress}
            onLoadError={handleLoadError} // Adicione o prop onLoadError aqui
            className={` ${height} ${width} overflow-hidden dark:bg-grey bg-white border dark:border-transparent border-bren-blue-200  items-start justify-center h-auto max-h-[220px]`}
          >
            <Thumbnail
              pageNumber={1}
              width={thumbWidth}
              className={`!h-auto mx-auto flex items-start justify-center`}
            />
          </Document>
        </div>
      )}

      {onError && (
        <div
          className={`${height} ${width} overflow-hidden dark:bg-grey bg-white border dark:border-transparent border-bren-blue-200 flex items-center justify-center`}
        >
          <div className="flex flex-col items-center justify-center">
            <BrenIcon icon="warning" color="inherit" size="50px" />
            <p className="text-[13px] mt-0">Erro ao carregar o PDF</p>
          </div>
        </div>
      )}

      {onLoading && (
        <div
          className={`${height} ${width} overflow-hidden bg-grey flex items-center justify-center`}
        >
          <div className="flex flex-col items-center justify-center">
            <SpinnerLoading />
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewer;
