import React from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";

export const ComparativeChartSection = () => {
  return (
    <div className=" !scale-75 lg:!scale-75 xl:!scale-100 text-white pt-[100px] pb-[200px] max-w-[1200px] w-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div>
          <h2 className="text-[40px] font-light text-center mb-4 leading-[40px]">
            Porque a{" "}
            <span className="text-[40px] font-bold text-yellowgreenish text-center xl:mb-0 mt-2 xl:inline-block  ">
              {" "}
              Bren
            </span>
            ?
          </h2>
          <p className="text-center font-light mb-10 text-[18px] opacity-75">
            Entenda o porque nos destacamos de soluções de chatbot
          </p>
        </div>
      </div>
      <div className="w-full ">
        <div className="grid grid-cols-3 gap-4 px-4 py-2 text-center [&>*]:!text-[20px]">
          <div />
          <div className="font-bold">Bren</div>
          <div className="font-bold">Chatbots</div>
        </div>
        <div className="grid grid-cols-3 gap-4  bg-[#1a1a1a] rounded-t-3xl [&>*]:!text-[17px] font-light">
          <div className="text-left font-semibold p-7">Respostas Naturais</div>
          <div className="w-full flex items-center justify-center bg-yellowgreenish/10 border-t border-l border-r border-yellowgreenish rounded-t-3xl">
            <BrenIcon
              icon="checkmark"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] text-yellowgreenish border border-yellowgreenish !aspect-square"
            />
          </div>
          <div className="w-full flex items-center p-7 justify-center">
            <BrenIcon
              icon="times"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] opacity-50  border !aspect-square"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4  bg-[#262626] [&>*]:!text-[17px] font-light">
          <div className="text-left font-semibold p-7  ">
            Assertividade nas respostas
          </div>
          <div className="text-center p-7  bg-yellowgreenish/10  border-l border-r border-yellowgreenish">
            Muito alta
          </div>
          <div className="text-center p-7">Limitada</div>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-[#1a1a1a] [&>*]:!text-[17px] font-light">
          <div className="text-left font-semibold p-7">Alta personalização</div>
          <div className="text-center p-7 bg-yellowgreenish/10 border-l border-r border-yellowgreenish">
            Com a cara do seu negócio
          </div>
          <div className="text-center p-7">Limitada</div>
        </div>
        <div className="grid grid-cols-3 gap-4  bg-[#262626] [&>*]:!text-[17px] font-light">
          <div className="text-left font-semibold p-7">
            Compreensão de texto
          </div>
          <div className="w-full flex items-center justify-center p-7 bg-yellowgreenish/10 border-l border-r border-yellowgreenish">
            <BrenIcon
              icon="checkmark"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] text-yellowgreenish border border-yellowgreenish !aspect-square"
            />
          </div>
          <div className="w-full flex items-center justify-center p-7">
            <BrenIcon
              icon="times"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] opacity-50  border !aspect-square"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-[#1a1a1a] [&>*]:!text-[17px] font-light">
          <div className="text-left font-semibold p-7">
            Aprendizado Contínuo
          </div>
          <div className="w-full flex items-center justify-center p-7 bg-yellowgreenish/10 border-l border-r border-yellowgreenish">
            <BrenIcon
              icon="checkmark"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] text-yellowgreenish border border-yellowgreenish !aspect-square"
            />
          </div>
          <div className="w-full flex items-center justify-center p-7">
            <BrenIcon
              icon="times"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] opacity-50  border !aspect-square"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-[#262626] rounded-b-3xl [&>*]:!text-[17px] font-light">
          <div className="text-left font-semibold p-7">
            Leitura de fotos e documentos
          </div>
          <div className="w-full flex items-center justify-center p-7 bg-yellowgreenish/10 border-l border-b border-r border-yellowgreenish rounded-b-3xl">
            <BrenIcon
              icon="checkmark"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] text-yellowgreenish border border-yellowgreenish !aspect-square"
            />
          </div>
          <div className="w-full flex items-center justify-center p-7">
            <BrenIcon
              icon="times"
              size="25px"
              className="rounded-full !h-[30px] !w-[30px] opacity-50  border !aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
