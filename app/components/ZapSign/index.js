import { useEffect, useState } from "react";
import { CreateZapSignDocToAssign } from "../../Utils/Utils";
import SpinnerLoading from "../Layout/Loading/SpinnerLoading";

export default function ZapSign({
  seller_id,
  email,
  cnpj,
  secret,
  height,
  signer_name,
  handleDocSigned,
  handleDocAlreadyExists,
  signer_phone,
  razao_social,
  confirmEmail,
  publicDataCompany,
}) {
  const [signerToken, setSignerToken] = useState(null);
  const [requestSended, setRequestSended] = useState(false);

  useEffect(() => {
    let full_address = "";
    if (publicDataCompany) {
      full_address = `${publicDataCompany.logradouro}, ${publicDataCompany.numero} - ${publicDataCompany.bairro}, ${publicDataCompany.cidade?.nome} - ${publicDataCompany.estado?.nome}`;
    }

    if (
      !requestSended &&
      email &&
      confirmEmail &&
      signer_name &&
      signer_phone &&
      razao_social &&
      cnpj &&
      seller_id
    ) {
      CreateZapSignDocToAssign({
        seller_id,
        cnpj,
        email,
        signer_name,
        razao_social,
        signer_phone,
        full_address,
        signer_email: email,
      })
        .then((response) => {
          const signerToken = response["signer_token"];
          const signed = response["signed"];

          if (signed) handleDocAlreadyExists();
          if (signerToken) setSignerToken(signerToken);
        })
        .catch((err) => console.log("Error in CreateZapSignDocToAssign", err));

      setRequestSended(true);
    }
                // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    signer_name,
    signer_phone,
    razao_social,
    email,
    confirmEmail,
    cnpj,
    seller_id,
    publicDataCompany,
    requestSended,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //add event listener to message
      window.addEventListener("message", function (e) {
        if (e.data === "zs-doc-signed") handleDocSigned();
        if (e.data === "zs-doc-loaded") console.log("Doc loaded in iframe");
        if (e.data === "zs-signed-file-ready")
          console.log("Signed file (final pdf) ready to download");
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("message", function (e) {
          if (e.data === "zs-doc-signed") handleDocSigned();
          if (e.data === "zs-doc-loaded") console.log("Doc loaded in iframe");
          if (e.data === "zs-signed-file-ready")
            console.log("Signed file (final pdf) ready to download");
        });
      }
    };
  }, [handleDocSigned]);

  return signerToken ? (
    <iframe
      src={`${process.env.NEXT_PUBLIC_ZAPSIGN_URL}/verificar/${signerToken}`}
      width="100%"
      className={`h-full w-full`}
      allow="camera"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <SpinnerLoading height="h-[100px]" width="w-[100px]" />
    </div>
  );
}
