import React from "react";

export default function Loading({ useLogo = false }) {
  //go to the top scroll
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      // set the scroll to top
      if (document.querySelector("body")) {
        const bodyElement = document.querySelector("body");
        const mainContentElement = document.getElementById("mainContent");
        if (bodyElement) {
          bodyElement.scrollTop = 0;
        }
        if (mainContentElement) {
          mainContentElement.scrollTop = 0;
        }
      }
    }
  }, []);

  return (
    <div
      className={`flex loadComponent items-center justify-center fixed z-[99] w-full h-screen left-0 top-0 backdrop-blur-lg bg-black/70`}
    >
      <img
        className=" w-[125px] animate-pulse drop-shadow-[0px_0px_10px_#ffffff]"
        src="/loading/bren-loading.gif"
        alt="loading"
      />
    </div>
  );
}
