import React, { useEffect } from "react";
import Button from "../Buttons/Button";
import { SendPlatformMessage } from "../../../Utils/Utils";
import { Modal } from "../Modals/Modal";
import { InfoBox } from "../InfoBox/InfoBox";
import { BrenFile, createFile, deleteFile, getFiles } from "@/app/api/callers/files";
import { SelectableFileItem } from "./SelectableFileItem";
import { Badge } from "../Badge/Badge";
import { SkeletonLoading, SkeletonLoadingTextBlocks } from "../Loading/SkeletonLoading";
import UploadArea from "./UploadArea";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { ApiResponse } from "@/app/api/apiRequester";
import InputField from "../Inputs/InputField";
import { DeleteFileModal } from "./DeleteFileModal";

export default function FilesCenter({ onClose, selectableFiles = false, onSelectedFiles }: { onClose: () => void, selectableFiles?:any, onSelectedFiles?:any }) {
  const [files, setFiles] = React.useState<BrenFile[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
  const [section, setSection] = React.useState<"files" | "upload">("files");
  const [newFile, setNewFile] = React.useState<File | null>(null);
  const [deleteThisFileId, setDeleteThisFileId] = React.useState<string | null>(null);

  useEffect(() => {
    GetFilesMethod();
  }, []);

  async function GetFilesMethod() {
    setIsLoading(true);
    const files : ApiResponse<BrenFile[]> = await getFiles() as ApiResponse<BrenFile[]>;
    setIsLoading(false);
    setFiles(files.data);
  }

  async function GetFileFromUpload(e: FormData) {
      setNewFile(e.get("file") as File);
  }

  async function CreateFileMethod() {
    if (newFile) {
      setIsLoading(true);
      const formData =  new FormData();
      formData.append("category", "file");
      formData.append("file_name", newFile.name);
      formData.append("input_file", newFile);
      createFile(formData).then((res) => {
        SendPlatformMessage("Arquivo enviado com sucesso!");
        setSection("files");
        GetFilesMethod();
      } ).catch((err) => {
        SendPlatformMessage("Erro ao enviar arquivo.");
        setNewFile(null);
        setIsLoading(false);
      });

    }
  }




  return <><Modal icon={section === "files" ? "files" : "upload"} separatorLine title={section === "files" ? "Central de Arquivos" : "Upload de Arquivo"} closeFunction={onClose} fullWidth containerAreaClassName="!z-[10]" className="!w-[992px]  ">
    <>

      {/* FILE LIST */}
      {section === "files" && <div className="!min-h-[300px] max-h-[calc(100vh-300px)] overflow-auto pr-8">
        <InfoBox className="mt-5 " >
          Central de Arquivos é um local para armazenar e selecionar todos os arquivos enviados para a plataforma.
        </InfoBox>
        {!isLoading ? <h2 className="text-left w-full mb-3 opacity-100">Arquivos <Badge content={files.length} /></h2> : <SkeletonLoadingTextBlocks height="!py-3" number={1} />}

        {/* Loading */}
        {isLoading && <div className="flex"><SkeletonLoading number={4} type={2} /></div>}

        {/* Loading is done */}
        {!isLoading && <div className="flex flex-wrap flex-col justify-center loadComponent">

          {files.map((file: BrenFile, i: number) => {
            return <SelectableFileItem
            isSelectable
            deleteFunction={() => file.id && setDeleteThisFileId(file.id)}
            key={i} file={file} selected={
              selectedFiles.includes(file.id ? file.id : "")} setSelected={() => selectedFiles.includes(file.id ? file.id : "") ? setSelectedFiles(selectedFiles.filter((id) => id !== file.id)) : setSelectedFiles([...selectedFiles, file.id ? file.id : ""])} />
          })}
          {files.length === 0 && <div className="text-[14px] w-full font-light opacity-50 border rounded-2xl p-5 mb-10 dark:border-white/20 border-bren-blue-300">Nenhum arquivo encontrado.</div>}
        </div>}
      </div>}



      {/* UPLOAD SECTION */}
      {section === "upload" && <div className="!min-h-[300px] loadComponent">
        <InfoBox className="mt-5" >
          Arquivos suportados: JPEG, JPG, PNG e PDF (20MB no máximo)
        </InfoBox>

        {!isLoading && <UploadArea iconButton="search" GetFile={(e:any) => GetFileFromUpload(e)  } />}
          {newFile && <div className="mt-5 w-full"><InputField correct={newFile.name.length > 1} className="!w-full" selectInlineLabel label="Nome do arquivo:" value={newFile.name}  onChange={(e) => setNewFile(new File([newFile], e.target.value))}/></div>}
        {isLoading && <div className="w-full h-[200px] flex items-center justify-center"><SpinnerLoading /></div>}
        </div>}



      <div className="flex justify-between items-center mt-5">
        <div>
          
          {section === "files" && <Button iconOnTheLeft buttonStyle="tertiary-button" icon={"times"} text={"Cancelar"} onClick={() => onClose()} className="!py-2 hidden lg:flex" />}

          {section === "upload" && <Button iconOnTheLeft buttonStyle="tertiary-button" icon={"arrow-left"} text={"Voltar"} onClick={() => setSection("files")} className="!py-2" />}
        </div>
        <div className="flex gap-2">
        {section === "files" && <Button buttonStyle="accent-button" icon="plus" text="Upload de Arquivo" onClick={() => setSection("upload")} className="!py-2" />}
        {selectableFiles && section === "files" && <Button disabled={selectedFiles.length === 0} buttonStyle="accent-border-button" icon="checkmark" text={selectedFiles.length > 0 ? `Incluir ${selectedFiles.length} Arquivo${selectedFiles.length > 1 ? "s" : ""}` : "Nenhum Arquivo Selecionado"} onClick={() => onSelectedFiles(selectedFiles)} className="!py-2" />}

        {section === "upload" && <Button disabled={newFile === null} buttonStyle="accent-border-button" icon="upload" text="Fazer Upload" onClick={() => CreateFileMethod()}  className="!py-2" />}
        </div>
      </div>
    </>
    
  </Modal>
  
        {/* Modal Delete file*/}
        {deleteThisFileId && <DeleteFileModal 
        fileId={deleteThisFileId} 
        onClose={() => setDeleteThisFileId(null)}
        setIsLoading={setIsLoading}
        reloadFilesListFunction={GetFilesMethod} 
        />}
  </>

}

