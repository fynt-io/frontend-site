import React, { useEffect, useState } from "react";
import Button from "../Layout/Buttons/Button";

export const HomeStartScreen = ({
  scrollPosition,
  scrollToElement,
}: {
  scrollPosition: number;
  scrollToElement: (e: string) => void;
}) => {
  return (
    <>
      <div
        style={{ opacity: 50 / scrollPosition }}
        className=" max-w-[768px] w-full text-center flex items-center justify-center flex-col md:mt-[2vh]  mt-[3vh]  px-10 md:px-5"
      >
        <h1 className="loadComponent pb-[0.5vh] text-[4.5vh] leading-[5vh] !font-black bg-gradient-to-r from-glacier to-yellowgreenish inline-block text-transparent bg-clip-text">
          Transformamos <br />
          conversas em vendas!
        </h1>
        <div className="my-[0.5vh]" />
        <h2 className="loadComponent !font-light text-[2vh] text-white">
          Somos a Bren, a IA que se comunica com seus clientes, com a voz da sua
          marca, através do WhatsApp, 24 horas por dia.{" "}
        </h2>
        <div className="my-[1vh]" />
        <div className="loadComponent">
          <Button
            responsive={false}
            className=" !transition-[0.2s] !duration-400 !scale-[100%] hover:!scale-[103%]"
            buttonStyle="accent-button-yellow-greenish"
            onClick={() => scrollToElement("plans")}
            text="Impulsionar vendas!"
          />
        </div>
      </div>
      {/* video */}
      <div className="mt-[5vh] px-5">
        <video
          className="md:w-[100vh] border border-white/10 rounded-3xl object-cover"
          controls
        >
          <source src="/videos/bren-motion-720.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};
