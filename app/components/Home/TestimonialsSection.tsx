import React from "react";
import { Card } from "../Layout/Cards/Card";

export const TestimonialsSection = () => {
  return (
    <>
      <h2 className="text-[40px] font-light text-center mb-10 mt-20 leading-[40px]">
        Aprovada por{" "}
        <span className="text-[40px] font-bold text-center mb-10 xl:mb-0 mt-2 xl:inline-block  text-yellowgreenish  ">
          {" "}
          líderes
        </span>{" "}
        de setores
      </h2>
      <div className="px-10 flex items-center justify-center w-full">
        <Card className="w-full  !max-w-[768px] !p-14 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="min-w-[100px] w-[100px] mb-3 md:mb-0 md:mr-5">
              <img src="/home/elisana.webp" alt="Testemunho 1" />
            </div>
            <div className="flex flex-col justify p-2">
              <p className="font-light text-[18px] text-center md:text-left">
                “A Bren fez com que cada vendedor pudesse atender mais de 700
                clientes ao mesmo tempo. Essa eficiência mudou completamente
                nosso modo de operar.”
              </p>
              <span className="font-light text-[16px] opacity-50 mt-2">
                — Elisana, Kidstar
              </span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
