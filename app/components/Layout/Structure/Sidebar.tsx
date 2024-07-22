"use client";
import { useState, useEffect } from "react";
import { switchThemeDuration } from "../../../constants";
import Link from "next/link";
import BrenIcon from "./../Icons/BrenIcon";
import Logo from "../Logos/Logo";
import {
  CollaboratorInterface,
  MenuLink,
} from "@/app/constants/types";
import {
  isLoggedIn,
  IsSuperUser,
  GetEditingProgress,
  RecordEditingProgress,
} from "@/app/Utils/Utils";

import { MENU_LINKS } from "@/app/constants/PlatformLinks";
import { Modal } from "./../Modals/Modal";
import Button from "./../Buttons/Button";
import { useRouter } from "next/navigation";
import { UserAreaSectionMenu } from "./UserAreaSectionMenu";
import { useGeneralContext } from "./generalContext";

export const Sidebar = ({ forceSidebarContracted = true }: { forceSidebarContracted?: boolean }) => {
  const {seller} = useGeneralContext();

  const [activeLink, setActiveLink] = useState("");
  const [forceHideSidebar, setForceHideSidebar] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const [sidebarIsContracted, setSidebarIsContracted] = useState<boolean>(forceSidebarContracted);
  const [editingInProgress, setEditingInProgress] = useState<any>(null);
  const router = useRouter();
  const [sidebarIsLocked, setSidebarIsLocked] = useState(false);

  useEffect(() => {
    //if there's no sidebarIsContracted on localstorage, create one
    let ls = localStorage.getItem("sidebarIsLocked");
    if (ls) {
      setSidebarIsLocked(ls === "true" ? true : false);
      setSidebarIsContracted(ls === "true" ? false : true);
    } else {
      localStorage.setItem("sidebarIsLocked", "false");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    // Function to handle DOM changes
    const handleDomChanges = () => {
      setForceHideSidebar(false);
    };

    // Initial check
    handleDomChanges();

    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(handleDomChanges);

    // Start observing the entire document for changes
    observer.observe(document, { childList: true, subtree: true });

    isLoggedIn();

    setActiveLink(window.location.pathname);

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    mounted && (
      <>
        {/* Mobile Background Overlay */}
        {sidebarIsOpen && (
          <div
            className="backdrop-blur-md fixed w-screen h-screen bg-[#000000]/50 loadcomponent left-[0] top-0 z-[3] "
            onClick={() => setSidebarIsOpen(false)}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`z-[10] lg:hidden absolute rounded-r-xl shadow-[0px] pl-[20px] pr-[10px] py-[10px] cursor-pointer top-[9px] 
          ${sidebarIsOpen ? `text-[#ffffff] left-[260px] ` : `drop-shadow-sm bg-white  dark:bg-dark-grey`}
            
          `}
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        >
          <BrenIcon
            icon={sidebarIsOpen ? "times" : "three-bars-horizontal"}
            size={"40px"}
          />
        </div>

        {/* Spacer */}
        {!sidebarIsOpen && <div className={`${sidebarIsLocked ? `lg:ml-[270px]` : `lg:ml-[85px]`} hidden lg:block`} />}

        <div
          onMouseOver={() => setSidebarIsContracted(false)}
          onMouseLeave={() => !sidebarIsLocked && setSidebarIsContracted(true)}
          id="sidebar"
          // onMouseEnter={()=>setCustomSideBarShow(true)} onMouseLeave={()=>setCustomSideBarShow(false)}
          className={`
          ${forceHideSidebar ? "relative left-[-280px]  w-[0px]" :
              `lg:!min-w-[270px]  ${sidebarIsOpen ? `absolute lg:sticky left-[0px] ` : `absolute left-[-280px] lg:left-[0px] w-[0px] `}`} 

          ${!sidebarIsOpen && sidebarIsContracted ? `lg:!min-w-[86px]` : ``}
          ${sidebarIsLocked ? `lg:!min-w-[270px]` : ``}
          bg-white dark:bg-[#222] h-screen top-0 dark:drop-shadow-none drop-shadow-lg ${sidebarIsContracted ? `duration-0` : switchThemeDuration} !z-[10]`}
        >

          {/* Custom Sidebar */}
          <div className="h-full flex flex-col justify-between">

            {/* Nav */}
            <nav>
              {/* Logo */}
              <div className="w-full flex items-center justify-center pt-3">
                <Logo forceResponsive={!sidebarIsOpen && sidebarIsContracted ? true : false} style={1} height={35} className=" my-10 w-full p-4 lg:p-0" />
              </div>

              <div
                className={`hidden lg:flex justify-center cursor-pointer mb-5 h-[30px]`}
                onClick={() => {
                  setSidebarIsLocked(!sidebarIsLocked);
                  localStorage.setItem("sidebarIsLocked", (!sidebarIsLocked).toString());
                  if (sidebarIsLocked) {
                    setSidebarIsContracted(true);
                  }
                }}>
                <div className={`bg-bren-blue-100 text-[12px] truncate dark:bg-black/20 h-[30px] rounded-full w-auto flex items-center hover:bg-bren-blue-100 dark:hover:bg-[#34363A] p-[6px] ${!sidebarIsContracted ? `pr-5` : ``} `}>
                  <BrenIcon
                    className="!text-[17px]"
                    stroke={0.75}
                    icon={`${sidebarIsLocked ? "chevron-left" : "chevron-right"}`}
                  />
                  {
                    sidebarIsContracted ?
                      null
                      :
                      !sidebarIsLocked ? "Manter aberto" : "Fechar"
                  }
                </div>
              </div>
                
              {/* Menu */}
              <ul className={`w-auto relative lg:flex lg:items-center lg:flex-col overflow-y-auto max-h-[calc(100vh-250px)]  
                [@media_((max-height:740px))]:border-b border-bren-blue-300/25 `}>
                {MENU_LINKS.map(
                  (m: MenuLink, i: number) =>
                    IsSuperUser(m.superuser, seller?.collaborator) && (
                      <li
                        key={i}
                        onClick={() =>
                          GetEditingProgress() && setEditingInProgress(m.link)
                        }
                        className={`"flex w-full justify-center`}
                      >
                        <Link

                          id={m.name.replace(" ", "-").toLowerCase()}
                          className={`cursor-pointer h-10 w-full flex items-center py-[33px] truncate justify-start relative px-[40px] lg:px-[33px] ${activeLink === m.link ? `bg-bren-blue-100 dark:bg-gravel/50 text-black dark:text-white ` : `hover:bg-white-smoke/50 hover:dark:bg-gravel/25 font-light text-medium-grey dark:text-light-grey`} focus:dark:bg-[#2A2B2C]`}
                          href={GetEditingProgress() ? "" : m.link}
                        >
                          <BrenIcon
                            size="27px"
                            icon={activeLink === m.link ? m.iconActive : m.icon}
                            color=""
                            className={` !mr-4 ${activeLink === m.link ? " text-black dark:text-white" : `text-cloudy-blue dark:text-grey`}`}
                          />
                          <span
                            className={`${!sidebarIsOpen && sidebarIsContracted ? `flex lg:hidden` : `flex`} text-inherit  !mr-4 ${activeLink === m.link ? " text-black dark:text-white" : `text-medium-grey dark:text-light-grey`} text-[15px] tracking-[0.02rem]`}
                          >
                            {m.name}
                          </span>
                          {activeLink === m.link && (
                            <span className="absolute h-[25%] left-1 top-[37.5%] w-[4px] rounded-xl bg-gradient-primary-vertical" />
                          )}
                        </Link>
                      </li>
                    ),
                )}
              </ul>
            </nav>

            {/* User Area */}
            {seller && <UserAreaSectionMenu
              user={seller.collaborator}
              empresa={seller}
              sidebarIsContracted={sidebarIsContracted}
              sidebarIsOpen={sidebarIsOpen}
            />}
          </div>


          {/* MENSAGEM DE CONFIRMAÇÃO DE FECHAMENTO  */}
          {editingInProgress && (
            <Modal
              title="Atenção"
              className="!max-w-[450px] "
              closeFunction={() => setEditingInProgress(null)}
            >
              <p className="mt-[10px]">
                Você fez edições que ainda não foram salvas e serão perdidas.
                Deseja continuar?
              </p>
              <div className="w-full flex justify-between mt-10">
                <Button
                  text="Cancelar"
                  onClick={() => setEditingInProgress(null)}
                  buttonStyle="tertiary-button"
                  icon={"times"}
                />
                <Button
                  text="Confirmar"
                  onClick={() => {
                    setEditingInProgress(null);
                    RecordEditingProgress(false), router.push(editingInProgress);
                  }}
                  icon={"checkmark"}
                />
              </div>
            </Modal>
          )}
        </div>
      </>
    )
  );
};
