"use client";
import React from "react";
import BrenIcon from "../components/Layout/Icons/BrenIcon";
import { useRouter } from "next/navigation";
import { Footer } from "../components/Layout/Structure/Footer";

export default function TermsOfUse() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen  ">
      <div className="w-full max-w-[768px] mx-auto h-full">
        <div
          onClick={() => router.push("/")}
          className="flex items-center justify-center py-[20px] cursor-pointer"
        >
          <BrenIcon
            icon="arrow-left"
            size="22px"
            className="mr-2"
            color="iherit"
          />{" "}
          Voltar para a página inicial
        </div>
        <iframe
          className="outline-none shadow-xl bg-white p-0 flex items-center justify-center w-full h-[calc(100%-90px)] md:rounded-2xl"
          id="viewer"
          allowTransparency
          allowFullScreen
          src={`https://docs.google.com/document/d/e/2PACX-1vTTqT_E7xg066A1Gqb80lLbocaiQ3qGn5lxFleBLmOJeOOzsMEqqGxBFHiWnlbdHQ/pub?embedded=true`}
          sandbox="false"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}
