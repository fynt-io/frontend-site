import PDFViewer from "./PDFViewer";

export const FileThumbnail = ({ media_url, file_type, height = 'h-[50px]', width = 'w-[50px]' }: { media_url: string; file_type: string, height?:string, width?:string }) => {
    return (
        <div className={`fileThumbnail ${height} ${width} rounded-xl dark:bg-dark-grey bg-white border dark:border-transparent border-bren-blue-200 overflow-hidden`}>  
        {(file_type === "image" || file_type === "image/png" || file_type === "image/jpeg")  && <img src={media_url} alt="thumbnail" className={`object-cover ${height} ${width} rounded-xl`} />}
        {file_type === "video" && <video src={media_url} controls />}
        {file_type === "audio" && <audio src={media_url} controls />}
        {file_type === "document" && <PDFViewer pdfUrl={media_url} height={height} width={width}/>}
        {file_type === "application/pdf" && <PDFViewer pdfUrl={media_url} />}
        </div>
    );
    };