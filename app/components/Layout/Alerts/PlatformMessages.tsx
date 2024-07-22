import React from "react";
import BrenIcon from "../Icons/BrenIcon";

export default function PlatformMessages({
  text = "",
  id = "",
  isError = false,
  closeFunction = null,
  zIndex = 50,
  top = "auto",
  position = "bottomToTop",
}) {
  function createMessage() {
    const a = setTimeout(() => {
      //delete the element
      if (typeof document !== "undefined") {
        const element = document.getElementById(id);
        if (element !== null) {
          killThisElement();
        }
      }
    }, 4 * 1000);

    const b = setTimeout(() => {
      //delete the element
      if (typeof document !== "undefined") {
        const element = document.getElementById(id);
        if (element !== null) {
          clearTimeout(b);
          if (element) {
            element.classList.add("fadeOutAnimation");
          }
        }
      }
    }, 3.5 * 1000);

    function killThisElement() {
      const element = document.getElementById(id);
      clearTimeout(b);
      clearTimeout(a);
      if (element) {
        element.remove();
      }
    }

    return (
      <div
        id={id}
        className={`${position}Animation flex items-center absolute top-4 justify-center fixed z-${zIndex} backdrop-blur-lg overflow-hidden `}
        style={{
          backgroundColor: "rgba(255,255,255,  0.3)",
          border: `2px solid #fff`,
          boxShadow: `0px 1px 2px #666`,
          padding: "20px 30px",
          borderRadius: "15px",
        }}
      >
        <div className={`flex w-full justify-between`}>
          <div className={`mr-10 font-semibold`}>{text}</div>
          <div style={{ cursor: "pointer" }} onClick={() => killThisElement()}>
            <BrenIcon icon={"times"} color="inherit" />
          </div>
        </div>
        <div className="LoadingBarHorizontalOverTime"></div>
      </div>
    );
  }

  return createMessage();
}
