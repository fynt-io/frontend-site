import { SendPlatformMessage } from "@/app/Utils/Utils";
import { useEffect, useState } from "react";
import { InfoBox } from "../InfoBox/InfoBox";
import { SkeletonLoading } from "../Loading/SkeletonLoading";
import Button from "../Buttons/Button";
import UploadArea from "./UploadArea";
import { SelectableFileItem } from "./SelectableFileItem";
import { BrenFile } from "@/app/api/callers/files";

export const SelectFilesSection = ({closeFunction, addFiles}:{closeFunction:any, addFiles : (files:string[]) => void}) => {
    const [files, setFiles] = useState<BrenFile[] | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [uploadSection, setUploadSection] = useState<boolean>(false);
    const [filesToSend, setFilesToSend] = useState<any[]>([]);

    async function GetFiles(){
        //get files from the server
        //TODO: Implementar chamada para a API para files
        // getAgents().then((response:ApiResponse<Agent[]>) => {
        //     setFiles(response.files_send || []);
        // })
    }

    useEffect(() => {
        GetFiles();
    }, []);

    return <>
    {uploadSection === false && <div>
           <InfoBox >
               Selecione os materiais abaixo que deseja incluir.
            </InfoBox>

            <p className="my-4 text-[16px] font-bold">Arquivos em sua base <span className="text-[10px] font-light opacity-50 dark:bg-black/50 rounded-xl px-2 py-1"
            >{files?.length}</span></p>
            {
            files ? <div className="flex flex-col gap-2 mb-2 max-h-[calc(100vh-430px)]  overflow-y-auto pr-[27px]">
                {files.map((file:BrenFile, i) => file.id &&  <SelectableFileItem key={i} file={file} selected={
                    selectedFiles.includes(file.id)} setSelected={() => file.id && selectedFiles.includes(file.id) ? setSelectedFiles(selectedFiles.filter((id) => id !== file.id)) : file.id && setSelectedFiles([...selectedFiles, file.id])} />)}

                    {files.length === 0 && <div className="text-[14px] font-light opacity-50 border rounded-2xl p-5 mb-10 dark:border-white/20 border-bren-blue-300">Nenhum arquivo encontrado.</div>}

            </div> : <div><SkeletonLoading type={2} number={3} /></div>}



        <div className="flex items-center justify-between pt-3">
            <div ><span className="hidden lg:flex"><Button buttonStyle="tertiary-button" icon="times" text="Cancelar" onClick={closeFunction} /></span></div>
            <div className="flex gap-2 items-center justify-between lg:justify-end w-full lg:w-auto ">
                <Button buttonStyle="accent-border-button"
                 icon="plus"
                    text={"Upload de Arquivo"}
                    onClick={() => setUploadSection(true)} />
           
                <Button buttonStyle="accent-button"
                responsive={false}
                    disabled={selectedFiles.length === 0}
                icon="checkmark" text={`
                Adicionar ${selectedFiles.length > 0 ? selectedFiles.length + " arquivos" : ""}
                `} onClick={() => addFiles(selectedFiles)} />
            </div>
        </div>
    </div>}

    {uploadSection === true && <div>
            <p className="my-4 text-[16px] font-bold">Subir Arquivos</p>

            <InfoBox >
    Arraste e solte ou clique para adicionar arquivos.
            </InfoBox>
            <div  className="max-h-[calc(100vh-430px)]  overflow-y-auto">
                <UploadArea multiple GetFile={(files:any) => setFilesToSend(files)} />
            </div>
            <div className="flex items-center justify-between pt-3">
            <div >
                <Button buttonStyle="tertiary-button" iconOnTheLeft icon="arrow-left" text="Voltar" onClick={() => setUploadSection(false)} /></div>
            <div className="flex gap-2 items-center justify-between lg:justify-end w-full lg:w-auto ">
                <Button buttonStyle="accent-button"
                responsive={false}
                    disabled={filesToSend.length === 0}
                icon="checkmark" text={`Subir Arquivos`} onClick={() => SendPlatformMessage("Função não implementada")} />
            </div>
        </div>
        </div>}
    </>
}

