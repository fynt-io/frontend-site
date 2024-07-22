import React, { useEffect } from "react";

export const BlackBackgroundOverlay = ({
  children,
  closeFunction,
  className,
}: {
  children: any;
  closeFunction: any;
  className?: string;
}) => {
  useEffect(() => {
    // Set the body to overflow hidden to prevent scrolling
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      mainContent.style.overflow = "hidden";
      mainContent.scrollTop = 0;
    }

    //display hidden the menuMobile on /html/body/main/div/div/div[1]
    const menuMobile = document.querySelector(
      "body > main > div > div > div.z-\\[10\\].lg\\:hidden.absolute.rounded-r-xl.shadow-\\[0px\\].pl-\\[20px\\].pr-\\[10px\\].py-\\[10px\\].cursor-pointer.top-\\[9px\\].drop-shadow-sm.bg-white.dark\\:bg-dark-grey",
    );
    if (menuMobile) {
      menuMobile.classList.add("hidden");
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

      //display hidden the menuMobile on /html/body/main/div/div/div[1]
      const menuMobile = document.querySelector(
        "body > main > div > div > div.z-\\[10\\].lg\\:hidden.absolute.rounded-r-xl.shadow-\\[0px\\].pl-\\[20px\\].pr-\\[10px\\].py-\\[10px\\].cursor-pointer.top-\\[9px\\].drop-shadow-sm.bg-white.dark\\:bg-dark-grey",
      );
      if (menuMobile) {
        menuMobile.classList.remove("hidden");
      }

      // Remove the event listener to avoid memory leaks
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeFunction]);

  const closeModal = () => {
    const mainContent = document.getElementById("mainContent");
    const menuMobile = document.querySelector(
      "body > main > div > div > div.z-\\[10\\].lg\\:hidden.absolute.rounded-r-xl.shadow-\\[0px\\].pl-\\[20px\\].pr-\\[10px\\].py-\\[10px\\].cursor-pointer.top-\\[9px\\].drop-shadow-sm.bg-white.dark\\:bg-dark-grey",
    );

    if (mainContent) {
      mainContent.style.overflow = "auto";
    }
    if (menuMobile) {
      menuMobile.classList.remove("hidden");
    }
  };

  return (
    <div
      className={`w-full h-full fixed z-[999] bg-black/90 backdrop-blur-sm top-0 left-0 bottom-0 flex items-center justify-center loadComponent ${className}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {React.cloneElement(children, { closeFunction })}
    </div>
  );
};
