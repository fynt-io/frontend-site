import React from "react";
import BrenIcon from "./../Icons/BrenIcon";

interface MoreOptionsOption {
  name: string;
  icon: string;
  onClick: any;
  bgColor?: string;
  textColor?: string;
  isRemoveButton?: boolean;
  permission?: string;
}

export default function MoreOptionsButton({
  options = [],
  onClick,
  icon = "three-dots-vertical",
  marginTop = "",
  className = "",
}: {
  options: MoreOptionsOption[];
  onClick?: any;
  icon?: string;
  marginTop?: string;
  className?: string;
}) {
  //the options are the options that will be displayed in the dropdown
  //the onClick is the function that will be called when the user clicks on an option
  //the options model should be an array of objects like this: {name: 'option name', icon: 'ícon name', onClick: () => {do something}, bgColor:"color"}
  //open state
  const [open, setOpen] = React.useState(false);
  const [opOptions, setOpOptions] = React.useState(0);

  function openOptions() {
    setOpen(!open);
  }

  return (
    <div
      className={`pl-[10px] h-full flex items-start md:items-center justify-center group !z-100 relative`}
      onClick={() => openOptions()}
      onMouseLeave={() => setOpen(false)}
    >
      <button className={`z-4 w-10 h-10 cursor-pointer flex items-center justify-center bg-white dark:bg-dark-grey/25 group-hover:bg-white/75 group-hover:dark:bg-medium-grey/75  backdrop-filter backdrop-blur-lg rounded-full  p-3 text-base  outline-none ${className}`}>
        <BrenIcon icon={icon} color="" />
      </button>
      {open && (
        <div
          className={`${marginTop} loadComponent  right-0 !z-[200] h-full w-full flex items-start md:items-center relative`}
          onClick={() => openOptions()}
        >
          <div
            className={` overflow-hidden z-[200] moreOptionWindow  absolute w-[220px]  !right-[45px] bg-[rgba(255,255,255,0.4)] dark:bg-[#1b1b1c]   rounded-2xl shadow-lg `}
            style={{ backdropFilter: "blur(5px)", animationDuration: "0.2s" }}
          >
            {options.map((option: MoreOptionsOption, index: number) =>
              !option.isRemoveButton ? (
                <div
                  key={index}
                  onClick={() => {
                    option.onClick();
                    openOptions();
                  }}
                  className={`${"bg-white hover:bg-white-smoke dark:bg-transparent dark:hover:bg-black "} ${"text-[" + option.textColor + "]"} flex items-center justify-start cursor-pointer py-3 px-6 `}
                >
                  <BrenIcon icon={option.icon} color="inherit" />
                  <p className="ml-2 text-[13px]">{option.name}</p>
                </div>
              ) : (
                <div
                  key={index}
                  onClick={() => {
                    option.onClick();
                    openOptions();
                  }}
                  className={`${"bg-[#ab4141]"} text-[#ffffff] flex items-center justify-start cursor-pointer py-3 px-6`}
                >
                  <BrenIcon icon={option.icon} color="inherit" />
                  <p className="ml-2 text-[13px]">{option.name}</p>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
