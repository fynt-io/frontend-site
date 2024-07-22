import { deleteFile } from "@/app/api/callers/files";
import { SendPlatformMessage } from "@/app/Utils/Utils";
import { Modal } from "../Modals/Modal";
import Button from "../Buttons/Button";

export const DeleteFileModal = ({ onClose, setIsLoading, reloadFilesListFunction, fileId, }: { onClose: () => void, setIsLoading?: (value: boolean) => void, reloadFilesListFunction:()=> void, fileId: string }) => {
  async function DeleteFileMethod(id: string) {
    if(setIsLoading) {setIsLoading(true);}
    deleteFile(id).then((res) => {
    if (res?.status === 200) {
      SendPlatformMessage("Arquivo excluído com sucesso!");
      onClose();
      reloadFilesListFunction();
    } else {
      SendPlatformMessage("Erro ao excluir arquivo.");
      if(setIsLoading) {setIsLoading(false);}
    }
  }).catch((err) => {
    SendPlatformMessage("Erro ao excluir arquivo.");
    if(setIsLoading) {setIsLoading(false);}
  }
  );}


  return <Modal  title="Excluir Arquivo" closeFunction={onClose} containerAreaClassName="!z-[20] [&>*>*>*>*>*]:!bg-transparent" >
    <div className="flex flex-col items-center justify-center">
      Tem certeza que deseja excluir este arquivo? Atenção: Esta ação não pode ser desfeita.
      <div className="flex justify-between gap-3 mt-5 w-full">
        <Button buttonStyle="tertiary-button" text="Cancelar" icon="times" onClick={onClose} />
        <Button buttonStyle="remove-button" icon="bin" text="Excluir" onClick={() => fileId && DeleteFileMethod(fileId)} />
      </div>
    </div>
  </Modal>
}