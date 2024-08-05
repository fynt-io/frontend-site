import React, { useEffect, useState } from "react";
import moment from "moment";
import Logo from "../Logos/Logo";
import BrenIcon from "./../Icons/BrenIcon";
import Link from "next/link";
import { ThemeSwitcher } from "../Inputs/ThemeSwitcher";
import { BREN_CONSTANTS } from "@/app/constants/constants";
import {formatToPhone } from "brazilian-values";
import { GetEnvValue } from "@/app/api/env";

export const Footer = ({
  showDarkModeSwitch = true,
}: {
  showDarkModeSwitch?: boolean;
}) => {
  const [theme, setTheme] = useState("");
  const [platformLink, setPlatformLink] = useState("");
  

  useEffect(() => {
    GetEnvValue("NEXT_PUBLIC_FRONTEND_PLATFORM").then((res) => {
      if (res) setPlatformLink(res);
    });
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") ?? "");
    }
  }, []);

  return (
    <>
      <div className="bg-gradient-primary-vertical !relative  !h-[5px] z-[1]"></div>
      <footer
        className={`h-auto lg:h-[400px] flex  flex-col  p-20 pb-10  !relative bg-tall-grey overflow-hidden`}
      >
        <div className="container mx-auto flex-col lg:flex-row flex justify-between items-start w-full h-auto lg:h-[300px]">
          <div
            className="w-full lg:w-4/12 flex  justify-start items-start"
            style={{ filter: "brightness(4)" }}
          >
            <div className="w-full lg:w-auto">
              <Logo responsiveMode={false} width={100} height={100} />
            </div>
          </div>

          <div className="w-full lg:w-8/12 flex flex-col lg:flex-row justify-center lg:justify-end">
            <ul className="mb-10 lg:mb-0ml-0 lg:ml-[50px] text-[#ffffff] text-center lg:text-left">
              <li className="font-semibold mb-2">Plataforma</li>
              {/* <li>
                <Link href="/signup">Cadastre-se</Link>
              </li> */}
              <li>
                <a href={`${platformLink}/login`} target="_blank">Entrar</a>
              </li>
            </ul>
            <ul className="mb-10 lg:mb-0  ml-0 lg:ml-[50px] text-[#ffffff] text-center lg:text-left">
              <li className="font-semibold mb-2">Contato</li>
              <li className="inline-flex lg:flex items-center  text-center lg:text-left">
                <Link
                  target="_blank"
                  className="inline-flex items-center"
                  href={`https://wa.me/${BREN_CONSTANTS.COMERCIAL_NUMBER}/?text=Estou%20pronto%20para%20alavancar%20minhas%20vendas%20e%20quero%20contratar%20a%20Bren%20para%20isso%21`}
                >
                  <BrenIcon icon="whatsapp" color="inherit" /> {formatToPhone(BREN_CONSTANTS.COMERCIAL_NUMBER.replace("55", ""))}
                </Link>
              </li>
              <li className="inline-flex lg:flex items-center  text-center lg:text-left">
                <Link
                  target="_blank"
                  className="inline-flex items-center"
                  href={`mailto:${BREN_CONSTANTS.EMAIL}`}
                >
                  <BrenIcon icon="envelope" color="inherit" />{" "}
                   {BREN_CONSTANTS.EMAIL}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full flex-col lg:flex-row mt-10 lg:mt-0 justify-between container mx-auto">
          <div className="text-[#ffffff] flex items-center flex-col lg:flex-row justify-center lg:justify-end mb-5 lg:mb-0">
            <Link className="lg:mr-5" href="/terms-of-use">
              Termos de Uso
            </Link>
            <Link className="lg:mr-5 mb-10 lg:mb-0" href="/privacy-policy">
              Política de Privacidade
            </Link>
            <div className="inline-flex">
              <Link
                target="_blank"
                href={BREN_CONSTANTS.LINKEDIN_LINK}
              >
                <BrenIcon icon={"linkedin"} color="inherit" />
              </Link>
              <Link target="_blank" href={BREN_CONSTANTS.INSTAGRAM_LINK}>
                <BrenIcon icon={"instagram"} color="inherit" />
              </Link>
            </div>
          </div>
          <div className="text-[#666] flex items-center flex-col lg:flex-row justify-center lg:justify-end text-center lg:text-right">
            ©{moment().format("YYYY")} Bren LTDA. Todos os direitos reservados.
            CNPJ: 47.352.698/0001-78. <div className="mr-2"></div>
            {showDarkModeSwitch && <ThemeSwitcher />}
          </div>
        </div>
      </footer>
    </>
  );
};
