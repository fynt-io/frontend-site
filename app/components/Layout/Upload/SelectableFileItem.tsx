import { BrenFile } from "@/app/api/callers/files";
import { IconButton } from "../Buttons/IconButton";
import PDFViewer from "../Thumbnails/PDFViewer";

export const SelectableFileItem = ({ file, selected, setSelected, deleteFunction, isSelectable }: { file: BrenFile, selected?: boolean, setSelected?: (value: boolean) => void, deleteFunction?:any, isSelectable?:boolean }) => {

        function extractFileName(url:string){
            const urlParts = url.split('/');
            return urlParts[urlParts.length-1];
        }

        function extractFileExtension(url:string){
            const urlParts = url.split('.');
            return urlParts[urlParts.length-1];
        }
    
    return <div className={`flex items-center justify-between border py-4 px-2 rounded-xl mb-2  ${selected ? 'dark:bg-grey/50 bg-bren-blue-200  dark:border-grey border-bren-blue-300' : 'dark:bg-grey/25 bg-bren-blue-100/50 dark:border-grey border-bren-blue-300 '}`}>
        {isSelectable && <div className="mr-4 ml-2">
            <input type="checkbox" checked={selected} onChange={() => setSelected !== undefined && setSelected(!selected)} className="w-[20px] h-[20px] dark:!bg-dark-grey" />
        </div>}
        <div className="mr-5 [&>*]:rounded-xl">
            {file.public_url && extractFileExtension(file.public_url) === "pdf" && <PDFViewer pdfUrl={file.public_url} thumbWidth={20} width="w-[50px]" height="h-[50px]" />}
            {file.public_url && extractFileExtension(file.public_url) === ("jpg" || "jpeg" || "png" ) &&  <img src={ file.public_url } className="w-[50px] min-w-[50px] h-[50px] rounded-xl aspect-square" />}
        </div>
        <div className="text-[14px] flex flex-col items-start justify-start w-full  ">
            <span className="text-[15px] cursor-pointer" onClick={() => window.open(file.public_url, '_blank')}>{file.public_url && extractFileName(file.public_url)}</span>
            <span className="font-light opacity-50 text-[13px]">{file.category}</span>
        </div>
        <div className="flex gap-2">
            <IconButton tooltip="Fazer Download" icon="download" onClick={() => window.open(file.public_url, '_blank')} />
            {deleteFunction && <IconButton tooltip="Excluir Arquivo" icon="bin" onClick={deleteFunction} />  }
        </div>
    </div>
}