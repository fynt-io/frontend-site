"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import TabSections from "../Tabs/TabSections";
import { CollaboratorInterface } from "@/app/constants/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MENU_LINKS } from "@/app/constants/PlatformLinks";
import {
  IsSuperUser,
  RecordEditingProgress,
  LoggedOut,
  isLoggedIn,
} from "@/app/Utils/Utils";
import { TabSectionInterface } from "@/app/constants/types";
import { FooterCredits } from "./../Structure/FooterCredits";
import { RenderMainInfoBox } from "../InfoBox/RenderMainInfoBox";

export const PlatfotmStructure = ({
  title = "",
  children,
  paddingChildren = true,
  sections = [],
  setSection = () => { },
  currentSection,
  showCredits = true,
  showNotifications = true,
  sectionInfo = "",
  sectionInfoPosition = "normal",
}: {
  title?: string;
  children?: any;
  paddingChildren?: boolean;
  sections: TabSectionInterface[];
  setSection?: any;
  currentSection: string;
  showCredits?: boolean;
  showNotifications?: boolean;
  sectionInfo?: string;
  sectionInfoPosition?: "top" | "normal";
}) => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<CollaboratorInterface | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const ls = localStorage.getItem("bren_user");
    const isEditingLs = localStorage.getItem("bren_is_editing");

    if (isEditingLs) {
      RecordEditingProgress(false);
    }
    if (ls) {
      const user = JSON.parse(ls);
      if (user) {
        setUser(user);

        //check the current page and send to 404 if the is_super_user is false and the page is not allowed in MENU_LINKS
        if (MENU_LINKS.filter((link) => link.link === pathname).length > 0) {
          if (
            !IsSuperUser(
              MENU_LINKS.filter((link) => link.link === pathname)[0].superuser,
              user,
            )
          ) {
            router.replace("/404");
          }
        }
      }
    }

    const empresaConfig = localStorage.getItem("bren_empresa_config");
    if (empresaConfig) {
      const config = JSON.parse(empresaConfig);
      if (config.numero_whatsapp === "" || config.numero_whatsapp === null) {
        if (window.location.href !== `/platform/initial-settings`) {
          window.location.href = `/platform/initial-settings`;
        }
      }
    }

    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //if hasn't jwt, redirect to login
    if (isLoggedIn() === false) {
      LoggedOut();
    }
  }, []);

  useEffect(() => {
    if (searchParams.has("section")) {
      //check if the section has a counter and remove it
      let section: string = searchParams.get("section") as string;

      //check if the section exists in the sections array
      if (section) {
        const sectionExists = sections.filter(
          (s: TabSectionInterface) => s.slug === section,
        );
        if (sectionExists.length > 0) {
          setSection(section);
        } else {
          setSection(sections[0].slug);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);



  return (
    isMounted && <div className="flex relative overflow-hidden h-screen ">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`${sectionInfo && sectionInfoPosition === "top" ? `pt-5 lg:pt-0` : `pt-5 lg:pt-10`}  b-0 w-full z-[1] loadComponent overflow-y-scroll`}
        id="mainContent"
      >
        {/* General Box Info (Top) */}
        {sectionInfoPosition === "top" && <RenderMainInfoBox text={sectionInfo} position={sectionInfoPosition} />}

        {/* Top Bar on Mobile */}
        <div className="lg:hidden z-[0] absolute top-0 left-0 w-screen h-[80px] bg-white dark:bg-dark-grey"></div>

        {/* Header */}
        <header className={`${showNotifications ? `w-full` : `w-full lg:w-fit`}  px-5 lg:px-10 flex flex-col lg:flex-row justify-between items-center mb-5`}>
          <h1
            className={`responsive z-[1] flex lg:hidden text-center items-center justify-center ${sections.length < 2 ? `mb-0` : `mb-3`} font-light`}
          >
            {currentSection === "assistente-ia" ? "Assistente IA" : currentSection === "fluxo-de-conversa" ? "Fluxo de Conversa" : title}
          </h1>

          {/* Tab Sections */}
          <div className={`w-full lg:mr-10 mt-10 lg:mt-0`}>
            <TabSections
              tabs={sections}
              changeSection={(e: string) => {
                setSection(e);
              }}
              selectedTab={currentSection}
            />
          </div>

          {/* Theme Switcher and Notification Button */}
          {showNotifications &&
            <>
              <div className="absolute lg:static top-6 right-5 lg:block ml-2">
              </div>
            </>}
        </header>

        {/* Main Content */}
        <div className={`${paddingChildren && `px-5 lg:px-10`} w-full`}>
          {/* Default Info */}
          {sectionInfoPosition === "normal" && <div >
            <RenderMainInfoBox text={sectionInfo} position={sectionInfoPosition} />
          </div>}
          {/* Content */}
          {children}
        </div>

        {/* Footer Credits */}
        {showCredits && <FooterCredits />}
      </main>

      {/* Intercom */}
    </div>
  );
};