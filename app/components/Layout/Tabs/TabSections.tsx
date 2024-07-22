import React from "react";
import InputField from "../Inputs/InputField";
import { useRouter } from "next/navigation";
import { TabSectionInterface } from "@/app/constants/types";
import {
  GetEditingProgress,
  IsSuperUser,
  RecordEditingProgress,
} from "../../../Utils/Utils";
import Button from "../Buttons/Button";
import { Modal } from "../Modals/Modal";
import BrenIcon from "../Icons/BrenIcon";
import { Tooltip } from "react-tooltip";

export default function TabSections({
  tabs = [],
  selectedTab = "",
  changeSection = (e: string) => {},
  pill = false,
  pillColor = "bg-cloudy-blue/25 dark:bg-grey/50",
  pillColorSelected = "",
  setUrlSection = true,
  classname = "",
  responsiveContract = true,
}: {
  tabs: TabSectionInterface[];
  selectedTab: string;
  changeSection: (e: string) => void;
  pill?: boolean;
  pillColor?: string;
  pillColorSelected?: string;
  setUrlSection?: boolean;
  classname?: string;
  responsiveContract?: boolean;
}) {
  const router = useRouter();
  const [editingInProgress, setEditingInProgress] = React.useState<any | null>(
    null,
  );

  return (
    <>
      {!pill ? (
        <div
          className={`md:w-auto md:inline-flex relative w-auto h-min ${classname}`}
        >
          <div className={`md:flex w-full h-min ${!responsiveContract?"flex flex-row justify-center":"hidden"}`}>
            {tabs
              .filter((t: TabSectionInterface) => t.slug !== "")
              .map((tab: TabSectionInterface, index) =>
                tab.superuser && !IsSuperUser(tab.superuser) ? null : (
                  <div
                    onClick={() => {
                      if (GetEditingProgress()) {
                        setEditingInProgress(tab);
                      } else {
                        changeSection(tab.slug);
                        if (setUrlSection) {
                          router.replace("?section=" + tab.slug);
                        }
                      }
                    }}
                    key={index}
                    id={tab.slug}
                    className={`flex-col md:flex-row cursor-pointer pb-3 z-[1]  text-light-grey flex items-center justify-center ${!responsiveContract?"w-auto":"w-full"} md:w-auto text-center px-10 relative overflow-hidden text-light ${selectedTab === tab.slug ? ' border-none !text-black dark:!text-white font-medium text-normal after:content-[" "] after:h-[4px] after:rounded-full after:bottom-[0px] after:w-full after:absolute after:bg-gradient-to-r after:from-[rgb(var(--gradient3-rgb-start))] after:to-[rgb(var(--gradient3-rgb-end))] ' : " border-none "}`}
                  >
                    {tab.name}
                    
                    {tab.counter !== undefined && tab.counter !== null && (
                      <div
                        className={`${selectedTab !== tab.slug && `opacity-50`} loadComponent font-semibold mb-[2px] dark:text-white text-black bg-white shadow-md dark:bg-dark-grey ml-2 px-2 py-[9px] text-[10px] rounded-full  h-4 flex items-center justify-center`}
                      >
                        {tab.counter}
                      </div>
                    )}
                    {tab.discount !== null && tab.discount !== undefined && tab.discount > 0 && (
                      <span className="md:order-last order-first ml-0 md:ml-[8px] text-[12px] bg-gradient-primary-horizontal p-[4px] h-[25px] font-semibold lg:flex items-center justify-center text-white dark:text-black rounded-2xl ">{`${tab.discount}% OFF`}</span>
                    )}
                    {tab.discount !== null && tab.discount !== undefined && tab.discount > 0 && <div className="lg:mt-3"></div>}
                  </div>
                ),
              )}
            <div className="h-[4px] bg-cloudy-blue/50 dark:bg-tall-grey w-full absolute bottom-0 rounded-full "></div>
          </div>

          {tabs.length > 1 && (
            <div className={`block md:hidden ${!responsiveContract?"hidden":""}`}>
              <InputField
                type="select"
                onChange={(e) => changeSection(e.target.value)}
                value={selectedTab}
              >
                {tabs
                  .filter((t: TabSectionInterface) => t.slug !== "")
                  .map((tab: TabSectionInterface, index) => (
                    <option key={index} value={tab.slug}>
                      {tab.name}
                    </option>
                  ))}
              </InputField>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={` w-full ${classname}`}>
            {tabs
              .filter((t: TabSectionInterface) => t.slug !== "")
              .map((tab: TabSectionInterface, index) =>
                tab.superuser && !IsSuperUser(tab.superuser) ? null : (
                  <div
                    onClick={() => {
                      if (GetEditingProgress()) {
                        setEditingInProgress(tab);
                      } else {
                        changeSection(tab.slug);
                        if (setUrlSection && tab.parentSlug) {
                          router.replace(
                            "?section=" +
                              tab.parentSlug +
                              "&subsection=" +
                              tab.slug,
                          );
                        }
                      }
                    }}
                    key={index}
                    id={tab.slug}
                    className={`mb-2 inline-flex items-center mr-2 cursor-pointer rounded-full  py-2 px-3 border-2 !text-[14px] ${selectedTab === tab.slug ? ` border-glacier font-semibold text-glacier dark:text-yellowgreenish dark:border-yellowgreenish ${pillColorSelected}` : `border-transparent ${pillColor}`}`}
                  >
                    {tab.name}{" "}
                    {tab.info && 
                      <div className="info">
                      <BrenIcon icon={"info"}/>
                      <Tooltip
                          anchorSelect=".info"
                          place="right"
                          className="z-[3]"
                      >
                          <span className="w-[200px] block">
                            {tab.info}
                          </span>
                      </Tooltip>
                    </div>
                    }
                    {tab.counter !== undefined && (
                      <span
                        className={`${selectedTab !== tab.slug && `opacity-50`} font-bold dark:!text-white !text-black   bg-white dark:bg-dark-grey ml-2 px-2 py-[9px] text-[10px] rounded-full  h-4 items-center flex justify-center`}
                      >
                        {tab.counter}
                      </span>
                    )}
                  </div>
                ),
              )}
          </div>
        </div>
      )}

      {/* MENSAGEM DE CONFIRMAÇÃO DE FECHAMENTO  */}
      {editingInProgress && (
        <Modal
          title="Atenção"
          className="!max-w-[450px] "
          closeFunction={() => setEditingInProgress(null)}
        >
          <p className="mt-[10px]">
            Você fez edições que ainda não foram salvas e serão perdidas. Deseja
            continuar?
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
                RecordEditingProgress(false);
                setEditingInProgress(null);
                changeSection(editingInProgress.slug);
                if (setUrlSection) {
                  if (editingInProgress.parentSlug) {
                    router.replace(
                      "?section=" +
                        editingInProgress.parentSlug +
                        "&subsection=" +
                        editingInProgress.slug,
                    );
                  } else {
                    router.replace("?section=" + editingInProgress.slug);
                  }
                }
              }}
              icon={"checkmark"}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
