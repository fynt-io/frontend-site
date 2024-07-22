import React from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";
import { BREN_CONSTANTS } from "@/app/constants/constants";

export const TalkToUsWhatsAppButton = () => {
  return (
    <div
      className="cursor-pointer bg-gradient-primary-horizontal group rounded-full hover:w-[190px] hover:pr-[20px]   duration-[0.2s] drop-shadow-lg h-[80px] w-[80px] fixed right-10 bottom-12 flex justify-center items-center z-[100] text-white dark:text-black"
      onClick={() =>
        window.open(
          `https://wa.me/${BREN_CONSTANTS.COMERCIAL_NUMBER}/?text=Estou%20pronto%20para%20alavancar%20minhas%20vendas%20e%20quero%20contratar%20a%20Bren%20para%20isso%21`,
        )
      }
    >
      <BrenIcon size="50px" icon={"whatsapp"} color="#128C7E" className="" />
      <span className="ml-2 hidden group-hover:inline loadComponent font-semibold">
        Dúvidas? <br />
        Fale Conosco!
      </span>
    </div>
  );
};
