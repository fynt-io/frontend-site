"use client";
import React from "react";
import BrenIcon from "./../Icons/BrenIcon";
import { Tooltip } from "react-tooltip";

export const InfoBox = ({
  children,
  className,
  icon = "info",
  info = "",
  snackBarMode = true,
}: {
  children: any;
  className?: string;
  icon?: string;
  info?: string;
  snackBarMode?: boolean;
}) => {
  React.useEffect(() => {}, []);

  return (
    <div
      className={` bg-cloudy-blue/25 dark:bg-cloudy-blue/5 p-4 mb-3 flex items-center !w-full text-[14px] ${className} ${snackBarMode ? `rounded-2xl ` : ``}`}
    >
      <BrenIcon icon={icon} color="inherit" className="!mr-3 info" />
      {info!=="" && 
        <Tooltip
        anchorSelect=".info"
        place="right"
        className="z-[3]"
      >
        <span className="w-[200px] block">
          {info}
        </span>
      </Tooltip>
    }
      <span className="text-[13px] lg:text-[14px]">{children}</span>
    </div>
  );
};
