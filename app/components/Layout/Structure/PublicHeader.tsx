"use client";
import React from "react";
import Button from "./../Buttons/Button";
import Logo from "../Logos/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicHeader({
  section,
  logoWidth = "w-[140px]",
}: {
  section?: string;
  logoWidth?: string;
}) {
  const router = useRouter();

  const RenderSectionTitle = () => {
    return (
      <span className="text-[30px] font-light flex ml-5 pl-5 border-l h-[20px] items-center absolute right-[-90px] lg:right-[-100px] ">
        {section}
      </span>
    );
  };

  return (
    <div className=" flex  justify-between items-center w-full  flex-row container  mx-auto h-[100px]  ">
      <div
        className={`hidden lg:flex ml-10 ${logoWidth}  flex items-center relative cursor-pointe`}
        onClick={() => router.push("/")}
      >
        <Logo style={1} responsiveMode />
        {section && <RenderSectionTitle />}
      </div>
      <div
        className="flex lg:hidden ml-10 w-[30px] flex items-center relative cursor-pointer "
        onClick={() => router.push("/")}
      >
        <Logo style={1} responsiveMode />
        {section && <RenderSectionTitle />}
      </div>
      <div className="flex items-center scale-75 lg:scale-100 z-[1]">
        <Button
          responsive={false}
          className="mr-2 !py-0 !h-[40px] backdrop-blur-lg"
          buttonStyle="tertiary-button"
          text="Entrar"
          onClick={() => (window.location.href = "/login")}
          icon={"enter"}
        />
        <Button
          responsive={false}
          className="!py-0 !h-[40px]"
          buttonStyle="accent-button"
          text="Cadastre-se"
          onClick={() => (window.location.href = "/signup")}
        />
      </div>
    </div>
  );
}
