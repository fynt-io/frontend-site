"use client";
import React, { useEffect } from "react";
import { Card } from "./../Cards/Card";
import BrenIcon from "./../Icons/BrenIcon";

export const Modal = ({
  children,
  title = "",
  closeFunction = () => {},
  fullWidth = false,
  className,
  containerAreaClassName,
  fullScreen = false,
  noScroll = true,
  removeSidebarOnOpen = true,
  footer = null,
  separatorLine = false,
  horizontalPosition,
  icon,
  iconSize,
}: {
  children: any;
  title?: string;
  horizontalPosition?: string;
  closeFunction: Function;
  fullWidth?: boolean;
  fullScreen?: boolean;
  className?: string;
  containerAreaClassName?: string;
  noScroll?: boolean;
  removeSidebarOnOpen?: boolean;
  footer?: any;
  separatorLine?: boolean;
  icon?: string;
  iconSize?: string;
}) => {
  useEffect(() => {

    // Set the body to overflow hidden to prevent scrolling
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      // mainContent.style.overflow = "hidden";
      mainContent.scrollTop = 0;
      mainContent.style.overflow = "hidden";
    }

    // If the user presses ESC, close the modal
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        closeModal();
        if (closeFunction !== null) {
          closeFunction();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Reset the body overflow when the component is unmounted
      const mainContent = document.getElementById("mainContent");
      if (mainContent) {
        mainContent.style.overflow = "auto";
      }

      // Remove the event listener to avoid memory leaks
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeFunction]);

  const closeModal = () => {
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      mainContent.style.overflow = "auto";
    }
  };

  return !fullScreen ? (
    <div
      className={`flex loadComponent items-${horizontalPosition? horizontalPosition:"center"} justify-center fixed z-[22] w-full h-full left-0 top-0 backdrop-blur-lg bg-black/70 ${containerAreaClassName}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative ${fullWidth ? "w-full " : "w-full md:w-[90%] md:max-w-2xl"} ${className} mx-auto rounded-2xl  p-10 `}
      >
        <Card className={`${separatorLine && `!p-0`}`}>
          <div
            className={`flex flex-col relative  w-full max-h-[calc(100vh-100px)] overflow-x-hidden ${noScroll ? `overflow-y-hidden` : `overflow-y-auto`} `}
          >
            <header
              className={`${separatorLine && `bg-white dark:bg-tall-grey border-b border-cloudy-blue/50 dark:border-cloudy-blue/10 px-8 py-7`} flex items-center justify-between w-full mb-3 sticky top-0  z-[2]`}
            >
              <div className="flex gap-2 items-center">
                {icon && <BrenIcon
                  icon={icon? icon:""}
                  size={iconSize ? iconSize : ""}
                  color={"dark:text-yellow-greenish text-glacier"}
                />}
                <h2 className="font-semibold w-full flex dark:!text-white opacity-100">
                  {title}
                </h2>
              </div>
              <div className="cursor-pointer">
                <BrenIcon
                  icon="times"
                  onClick={closeFunction}
                  color="inherit"
                />
              </div>
            </header>
            <div className={`${separatorLine && `pt-0 px-8 pb-8`}`}>
              {children}
            </div>
          </div>
          {footer && (
            <div>
              <hr />
              {footer}
            </div>
          )}
        </Card>
      </div>
    </div>
  ) : (
    <div className="loadComponent h-screen w-screen bg-white dark:bg-tall-grey  fixed z-[22] left-0 top-0 overflow-x-hidden  overflow-y-auto">
      <div className="flex flex-col relative w-full h-full  overflow-y-auto ">
        <header className="flex items-center justify-center w-full   fixed top-0 h-[60px] p-[30px] z-[2]">
          <h2 className="font-semibold w-full flex">
            <h2 className="text-[25px]">{title}</h2>
          </h2>
          <div className="cursor-pointer">
            <BrenIcon icon="times" onClick={closeFunction} color="inherit" />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};
