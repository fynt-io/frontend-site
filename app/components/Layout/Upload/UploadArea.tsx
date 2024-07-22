import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import Button from "./../Buttons/Button";
import BrenIcon from "./../Icons/BrenIcon";
import { SendPlatformMessage } from "../../../Utils/Utils";

export default function UploadArea({
  GetFile,
  legend,
  subLegend,
  attribute,
  type,
  media_type,
  sendFileData,
  multiple,
  allowedExtensions,
  noText,
  buttonText,
  buttonStyle,
  iconButton,
  height,
  width,
  oldImage,
  className,
  maxSize = 20,
}: {
  GetFile: any;
  legend?: string;
  subLegend?: string;
  attribute?: string;
  type?: string;
  media_type?: string;
  sendFileData?: boolean;
  multiple?: boolean;
  allowedExtensions?: string[];
  noText?: boolean;
  buttonText?: string;
  buttonStyle?: string;
  iconButton?: string;
  height?: string;
  width?: string;
  oldImage?: any;
  className?: string;
  maxSize?: number | null | undefined;
}) {
  const [fileUploaded, setFileUploaded] = React.useState<
    { name?: string | null; path?: string | null } | any
  >({});
  const [filesUploaded, setFilesUploaded] = React.useState([]);
  const [imageData, setImageData] = React.useState("");
  const [onDrag, setOnDrag] = React.useState(false);
  const [oldImageState, setOldImageState] = React.useState<string>("");

  //server delay
  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    delay(1000).then(() => {
      if (oldImage) {
        setOldImageState(oldImage);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //single file
  const GetFileData = async (file: any) => {
    //check if the extensions are allowed in the props
    if (allowedExtensions) {
      let allowed = false;
      // console.log(
      //   allowedExtensions.includes(
      //     file.path.split(".")[file.path.split(".").length - 1],
      //   ),
      // );
      if (
        allowedExtensions.includes(
          file.path.split(".")[file.path.split(".").length - 1],
        )
      ) {
        allowed = true;
      } else {
        allowed = false;
      }
      // console.log(allowed);

      if (!allowed) {
        SendPlatformMessage("Tipo de arquivo não suportado", true);
        setFileUploaded({});
        setFilesUploaded([]);
        setImageData("");
        setOnDrag(false);
        setOldImageState("");
        return;
      }

      // Verificar o tamanho do arquivo
      if(maxSize!==null){
        const maxFileSizeBytes = maxSize * 1024 * 1024;
        if (file.size > maxFileSizeBytes) {
          SendPlatformMessage(`Arquivo muito grande (limite de ${maxSize} MB)`, true);
          setFileUploaded({});
          setFilesUploaded([]);
          setImageData("");
          setOnDrag(false);
          setOldImageState("");
          return;
        }
      }
    }

    const reader = new FileReader();
    reader.onload = function (e: any) {
      // console.log(e.target.result);
      setImageData(e.target.result);
      const formData = new FormData();
      formData.append(attribute ? attribute : "file", file);
      if (type !== undefined) {
        formData.append("type", type);
      }
      if (media_type !== undefined) {
        formData.append("media_type", media_type);
      }
      if (sendFileData) {
        if (type !== undefined) {
          GetFile(formData, e.target.result, file, type);
        } else {
          GetFile(formData, e.target.result, file);
        }
      } else {
        GetFile(formData, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const GetFilesData = async (files: any) => {
    let filesData: any = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      //check if the extensions are allowed in the props
      if (allowedExtensions) {
        let allowed = false;
        if (
          allowedExtensions.includes(
            file.path.split(".")[file.path.split(".").length - 1],
          )
        ) {
          allowed = true;
        } else {
          allowed = false;
        }

        if (!allowed) {
          SendPlatformMessage("Tipo de arquivo não suportado", true);
          setFileUploaded({});
          setFilesUploaded([]);
          setImageData("");
          setOnDrag(false);
          setOldImageState("");
          return;
        }
      }

      // Verificar o tamanho do arquivo
      if(maxSize!==null){
        const maxFileSizeBytes = maxSize * 1024 * 1024;
        if (file.size > maxFileSizeBytes) {
          SendPlatformMessage(`Arquivo muito grande (limite de ${maxSize} MB)`, true);
          setFileUploaded({});
          setFilesUploaded([]);
          setImageData("");
          setOnDrag(false);
          setOldImageState("");
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImageData(e.target.result);
        const formData = new FormData();
        formData.append(attribute ? attribute : "files", file);
        if (type !== undefined) {
          formData.append("type", type);
        }
        if (media_type !== undefined) {
          formData.append("media_type", media_type);
        }
        if (sendFileData) {
          if (type !== undefined) {
            GetFile(formData, e.target.result, file, type);
          } else {
            GetFile(formData, e.target.result, file);
          }
        } else {
          GetFile(formData, e.target.result);
        }
      };
      reader.readAsDataURL(file);
      filesData.push(file);
    }
    setFilesUploaded(filesData);
  };

  const isImage = (url: string) => {
    const isImageUrl = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    // console.log(isImageUrl);
    if (isImageUrl) {
      setFileUploaded({ name: url });
      setImageData(url);
      GetFile(url);
    } else {
      setFileUploaded({});
      setImageData("");
      GetFile(null);
    }
  };

  const removeAttach = () => {
    setFileUploaded({});
    setImageData("");
    GetFile(null);
  };

  const removeAttachMultiple = (index: any) => {
    let files = filesUploaded;
    files.splice(index, 1);
    setFilesUploaded(files);
    GetFile(null);
  };

  return multiple ? (
    <Dropzone
      multiple={true}
      noClick={true}
      onDragEnter={(acceptedFiles) => setOnDrag(true)}
      onDragLeave={(acceptedFiles) => setOnDrag(false)}
      onDrop={(acceptedFiles) => {
        setFileUploaded(acceptedFiles);
        setOnDrag(false);
        GetFilesData(acceptedFiles);
      }}
    >
      {({ getRootProps, getInputProps, open }) => (
        <section
          className={`transition rounded-3xl flex h-full w-full items-center justify-center text-center p-2 relative  ${className}`}
          {...(imageData === "" && getRootProps())}
        >
          {/* ARQUIVOS MULTIPLOS */}
          <div
            className={`${onDrag ? "bg-cloudy-blue/50 dark:bg-medium-grey/50 border-2 border-cloudy-blue dark:border-medium-grey" : "bg-cloudy-blue/25 dark:bg-tall-grey border-2 border-dashed border-cloudy-blue dark:border-medium-grey"} transition rounded-3xl relative  flex h-full w-full items-center justify-center text-center flex-col p-10  `}
            style={{
              transition: "0.1s",
              border: onDrag
                ? "15px solid cloudy-blue "
                : "3px solid cloudy-blue ",
            }}
          >
            <input {...getInputProps()} />

            {filesUploaded.length === 0 && !noText && (
              <p>
                {legend ? (
                  legend
                ) : (
                  <>
                    <span className="bold-text">Arraste e solte</span> <br />{" "}
                    seus arquivos aqui
                  </>
                )}
              </p>
            )}
            {fileUploaded.name == null && subLegend && (
              <p className="opacity-50 mt-1">{subLegend}</p>
            )}

            {filesUploaded.length > 0 && (
              <div>
                {filesUploaded.map((file: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="w-full p-2 pl-5 m-2 bg-[cloudy-blue ] rounded-2xl flex justify-between items-center"
                    >
                      <div>{file.name}</div>{" "}
                      <button onClick={() => removeAttachMultiple(i)}>
                        <BrenIcon icon={"times"} color="inherit" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {oldImage == null && (
              <div className={!noText ? `mt-5` : ``}>
                {fileUploaded.name == null && (
                  <Button
                    className="scale-75"
                    buttonStyle={
                      buttonStyle === undefined ? "primary-button" : buttonStyle
                    }
                    text={
                      buttonText === undefined
                        ? `Procurar arquivo...`
                        : buttonText
                    }
                    onClick={open}
                    icon={iconButton === undefined ? "upload" : iconButton}
                  />
                )}
                {fileUploaded.name != null && (
                  <Button
                    buttonStyle="tertiary-button"
                    responsive={false}
                    text={`Remover`}
                    onClick={() => removeAttach()}
                    icon={"times"}
                  />
                )}
              </div>
            )}

            <div className={`mt-5`}>
              {fileUploaded.name === null && (
                <Button
                  buttonStyle={
                    buttonStyle === undefined ? "primary-button" : buttonStyle
                  }
                  text={
                    buttonText === undefined
                      ? `Procurar arquivos...`
                      : buttonText
                  }
                  onClick={open}
                  icon={iconButton === undefined ? "upload" : iconButton}
                />
              )}
              {fileUploaded.name != null && (
                <Button
                  text={`Remover`}
                  onClick={() => removeAttach()}
                  icon={"times"}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  ) : (
    <Dropzone
      noClick={true}
      onDragEnter={(acceptedFiles) => setOnDrag(true)}
      onDragLeave={(acceptedFiles) => setOnDrag(false)}
      onDrop={(acceptedFiles) => {
        setFileUploaded(acceptedFiles[0]);
        setOnDrag(false);
        GetFileData(acceptedFiles[0]);
      }}
    >
      {({ getRootProps, getInputProps, open }) => (
        <section
          className={`transition ${height ? height : "h-full]"} ${width ? width : "w-full"} rounded-3xl flex  items-center justify-center text-center p-2 relative ${className}`}
          {...(imageData === "" && getRootProps())}
        >
          {/* ARQUIVO ÚNICO */}
          <div
            className={`${onDrag ? "bg-cloudy-blue/50 dark:bg-medium-grey/50 border-2 border-cloudy-blue dark:border-medium-grey" : "bg-cloudy-blue/25 dark:bg-tall-grey border-2 border-dashed border-cloudy-blue dark:border-medium-grey"} transition rounded-3xl relative  flex h-full w-full items-center justify-center text-center flex-col p-10  `}
            style={{
              transition: "0.1s",
              border: onDrag
                ? "15px solid cloudy-blue "
                : "3px solid cloudy-blue ",
            }}
          >
            <input {...getInputProps()} />

            {oldImageState != "" && fileUploaded.name == null && !onDrag ? (
              <>
                <div
                  style={{ backgroundImage: "url(" + oldImage + ")" }}
                  className={`bg-white absolute transition rounded-3xl flex h-full w-full items-center justify-center text-center flex-col p-10 bg-cover bg-center `}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-full bg-black/10 opacity-50 rounded-3xl`}
                  ></div>
                  <div
                    onClick={open}
                    className={`mt-5 absolute bottom-5 right-50 text-white cursor-pointer px-5 py-2 flex justify-center items-center rounded-full scale-75`}
                    style={{ background: "#000" }}
                  >
                    Trocar Arquivo<span className={`mr-2`}></span>{" "}
                    <BrenIcon icon={"times"} color="inherit" />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {fileUploaded.name == null && !noText && (
              <p>
                {legend ? (
                  legend
                ) : (
                  <>
                    <span className="bold-text">Arraste e solte</span> <br /> o
                    arquivo aqui
                  </>
                )}
              </p>
            )}
            {fileUploaded.name == null && subLegend && (
              <p className="opacity-50 mt-1">{subLegend}</p>
            )}

            {fileUploaded.name != null && (
              <div className="p-3 m-2 bg-cloudy-blue dark:bg-medium-grey rounded-2xl flex-col justify-center items-center text-center">
                {["png", "jpg", "svg"].includes(
                  fileUploaded.path
                    .substring(fileUploaded.path.lastIndexOf(".") + 1)
                    .toLowerCase(),
                ) && (
                  <img
                    src={imageData}
                    alt="Imagem"
                    className={`rounded-lg mb-5`}
                    width="100px"
                  />
                )}
                <div>
                  {fileUploaded.name.length < 20
                    ? fileUploaded.name
                    : fileUploaded.name.substring(0, 5) +
                      " ... " +
                      fileUploaded.name.substr(fileUploaded.name.length - 7)}
                </div>
              </div>
            )}

            {oldImage == null && (
              <div className={!noText ? `mt-5` : ``}>
                {fileUploaded.name == null && (
                  <Button
                    className="scale-75"
                    buttonStyle={
                      buttonStyle === undefined ? "primary-button" : buttonStyle
                    }
                    text={
                      buttonText === undefined
                        ? `Procurar arquivo...`
                        : buttonText
                    }
                    onClick={open}
                    icon={iconButton === undefined ? "upload" : iconButton}
                  />
                )}
                {fileUploaded.name != null && (
                  <Button
                    buttonStyle="tertiary-button"
                    responsive={false}
                    text={`Remover`}
                    onClick={() => removeAttach()}
                    icon={"times"}
                  />
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
