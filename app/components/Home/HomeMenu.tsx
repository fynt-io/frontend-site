import React, { useEffect, useState } from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";
import Button from "../Layout/Buttons/Button";
import Logo from "../Layout/Logos/Logo";
import { BREN_CONSTANTS } from "@/app/constants/constants";
const platformLink = process.env.NEXT_PUBLIC_FRONTEND_PLATFORM;

export const HomeMenu = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  //press esc to close the mobile menu
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <div
        className={`${mobileMenuIsOpen ? `w-screen` : `w-0`} flex transition overflow-hidden fixed top-0 right-0 h-full bg-black/50 backdrop-blur-md z-50  items-start justify-center`}
      >
        <div
          className={`absolute mr-[-20px] ${!mobileMenuIsOpen ? ` top-[10px]  opacity-0` : `right-[0px] mr-[0px] top-[0px] opacity-100`} h-[calc(100%)]  !transition !duration-500 flex flex-col items-center justify-start bg-black/50 border-l border-white/25 w-[300px] p-[17px] `}
        >
          <BrenIcon
            icon="times"
            className="!text-white absolute right-[23px] top-[15px] cursor-pointer "
            size="50px"
            onClick={() => setMobileMenuIsOpen(false)}
          />
          <div className="flex flex-col gap-3 w-full ">
          {BREN_CONSTANTS.SHOW_SIGNUP && <div className="w-full pr-[50px] ">
            <Button
              url={`${platformLink}/signup`}
              responsive={false}
              buttonStyle="accent-button-yellow-greenish"
              text="Cadastrar"
              className="!h-[45px] !w-full "
            />
          </div>}
          {BREN_CONSTANTS.SHOW_LOGIN && <div className="w-full  pr-[50px]">
            <Button
              url={`${platformLink}/login`}
              responsive={false}
              buttonStyle="accent-border-button"
              text="Entrar"
              icon="arrow-right"
              className="!h-[45px] !w-full !border-grey !bg-transparent !text-yellowgreenish "
            /></div>}
          </div>
        </div>
      </div>

      <header className="w-full flex items-center p-10 fadeInAnimation h-[10vh]">
        <div className="container w-full flex items-center justify-between mx-auto">
          <div>
            <Logo
              style={1}
              className="!w-[80px] lg:!w-[110px] lg:!h-[50px] cursor-pointer"
            />
          </div>
          <div className="block md:hidden cursor-pointer">
            <BrenIcon
              icon="three-bars-horizontal"
              size="50px"
              onClick={() => setMobileMenuIsOpen(true)}
            />
          </div>
          <div className="hidden md:flex gap-3">
          {BREN_CONSTANTS.SHOW_LOGIN && <Button
              responsive={false}
              url={`${platformLink}/login`}
              buttonStyle="accent-border-button"
              text="Entrar"
              icon="arrow-right"
              className="!h-[45px] !border-grey !bg-transparent !text-yellowgreenish "
            />}
            {BREN_CONSTANTS.SHOW_SIGNUP && <Button
              responsive={false}
              url={`${platformLink}/signup`}
              buttonStyle="accent-button-yellow-greenish"
              text="Cadastrar"
              className="!h-[45px]  "
            />}
          </div>
        </div>
      </header>
    </>
  );
};
